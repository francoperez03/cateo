// El estudio: indices espectrales de superficie sobre un poligono, con Sentinel-2 L2A (Earth Search, sin key).
// Determinista: mismo poligono + misma escena + misma VERSION => mismo JSON => mismo hash.
// Uso: node estudio.mjs <poligono.geojson> [sceneId] [carpetaSalida]
import { fromUrl } from 'geotiff'
import { deflateSync, crc32 } from 'node:zlib'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import proj4 from 'proj4'
import { keccak256, toHex } from 'viem'

export const VERSION = 'cateo-1'
const STAC = 'https://earth-search.aws.element84.com/v1'
const COLECCION = 'sentinel-2-c1-l2a'
const PIXEL = 20 // metros: la grilla de B11/B12; B02/B04 (10 m) se remuestrean a esta
export const AREA_MAX_KM2 = 100 // un cateo completo (20 unidades de 500 ha)

// Perillas de calibracion. Son umbrales de partida sobre reflectancia de superficie, no verdad geologica:
// se ajustan contra muestras de campo (espectrometro SWIR) antes de usarse para decidir nada.
export const UMBRALES = {
  oxidos: 2.0, // B04/B02, oxidos ferricos (van der Meer et al. 2014)
  arcillas: 1.25, // B11/B12, hidroxilos / arcillas
}
// Clases SCL que se descartan: sin dato, saturado, sombra, agua, nubes, cirrus, nieve.
const SCL_MALO = new Set([0, 1, 3, 6, 8, 9, 10, 11])

const r4 = (x) => Math.round(x * 1e4) / 1e4

function anillo(geojson) {
  const g = geojson.type === 'Feature' ? geojson.geometry : geojson
  if (g?.type !== 'Polygon' || !Array.isArray(g.coordinates?.[0]) || g.coordinates[0].length < 4) {
    throw new Error('Se espera un Polygon GeoJSON (lon, lat)')
  }
  for (const [lon, lat] of g.coordinates[0]) {
    if (!(Math.abs(lon) <= 180 && Math.abs(lat) <= 90)) throw new Error('Coordenada fuera de rango')
  }
  return g.coordinates[0]
}

async function buscarEscena(poligono, sceneId) {
  if (sceneId) {
    const r = await fetch(`${STAC}/collections/${COLECCION}/items/${encodeURIComponent(sceneId)}`)
    if (!r.ok) throw new Error(`Escena ${sceneId} no encontrada (${r.status})`)
    return r.json()
  }
  const hasta = new Date()
  const desde = new Date(hasta.getTime() - 365 * 864e5)
  const r = await fetch(`${STAC}/search`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      collections: [COLECCION],
      intersects: { type: 'Polygon', coordinates: [poligono] },
      datetime: `${desde.toISOString()}/${hasta.toISOString()}`,
      query: { 'eo:cloud_cover': { lt: 10 } },
      sortby: [{ field: 'properties.eo:cloud_cover', direction: 'asc' }],
      limit: 1,
    }),
  })
  if (!r.ok) throw new Error(`STAC respondio ${r.status}`)
  const { features } = await r.json()
  if (!features?.length) throw new Error('Sin escenas despejadas sobre el poligono en el ultimo ano')
  return features[0]
}

function dentro(x, y, pts) {
  let adentro = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i]
    const [xj, yj] = pts[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) adentro = !adentro
  }
  return adentro
}

function resumen(valores, umbral) {
  const v = Float64Array.from(valores).sort()
  const n = v.length
  const q = (p) => v[Math.min(n - 1, Math.floor(p * n))]
  let suma = 0
  let sobre = 0
  for (const x of v) {
    suma += x
    if (x > umbral) sobre++
  }
  return { media: r4(suma / n), p50: r4(q(0.5)), p90: r4(q(0.9)), pbSobreUmbral: Math.round((sobre / n) * 1e4) }
}

function png(ancho, alto, rgba) {
  const bloque = (tipo, datos) => {
    const cuerpo = Buffer.concat([Buffer.from(tipo), datos])
    const b = Buffer.alloc(cuerpo.length + 8)
    b.writeUInt32BE(datos.length, 0)
    cuerpo.copy(b, 4)
    b.writeUInt32BE(crc32(cuerpo), cuerpo.length + 4)
    return b
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(ancho, 0)
  ihdr.writeUInt32BE(alto, 4)
  ihdr.set([8, 6, 0, 0, 0], 8) // 8 bits, RGBA
  const filas = Buffer.alloc((ancho * 4 + 1) * alto)
  for (let y = 0; y < alto; y++) rgba.copy(filas, y * (ancho * 4 + 1) + 1, y * ancho * 4, (y + 1) * ancho * 4)
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    bloque('IHDR', ihdr),
    bloque('IDAT', deflateSync(filas)),
    bloque('IEND', Buffer.alloc(0)),
  ])
}

// Rampa: transparente bajo el 80% del umbral, opaca al 140%. Colores: de claro a intenso.
function capa(ancho, alto, indice, umbral, [c0, c1]) {
  const rgba = Buffer.alloc(ancho * alto * 4)
  for (let i = 0; i < indice.length; i++) {
    if (Number.isNaN(indice[i])) continue
    const t = Math.max(0, Math.min(1, (indice[i] - umbral * 0.8) / (umbral * 0.6)))
    for (let k = 0; k < 3; k++) rgba[i * 4 + k] = Math.round(c0[k] + (c1[k] - c0[k]) * t)
    rgba[i * 4 + 3] = Math.round(40 + 200 * t)
  }
  return png(ancho, alto, rgba)
}

/** @returns {{informe, json, hash, capas: {oxidos: Buffer, arcillas: Buffer}, esquinas: number[][]}} */
export async function estudio(geojson, sceneId) {
  const poligono = anillo(geojson)
  const escena = await buscarEscena(poligono, sceneId)
  const p = escena.properties
  const epsg = p['proj:epsg'] ?? Number(String(p['proj:code']).split(':')[1])
  const utm = `+proj=utm +zone=${epsg % 100} ${epsg >= 32700 ? '+south ' : ''}+datum=WGS84 +units=m +no_defs`
  const aUtm = proj4('WGS84', utm)
  const pts = poligono.map(([lon, lat]) => aUtm.forward([lon, lat]))

  let area = 0
  for (let i = 0; i < pts.length - 1; i++) area += pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1]
  const areaKm2 = Math.abs(area) / 2 / 1e6
  if (areaKm2 > AREA_MAX_KM2) throw new Error(`Area ${areaKm2.toFixed(1)} km2 supera el maximo de ${AREA_MAX_KM2} km2`)
  if (areaKm2 < 0.01) throw new Error('Area demasiado chica (minimo 1 ha)')

  // Ventana en la grilla de 20 m de la escena.
  const [, , ox, , , oy] = escena.assets.swir16['proj:transform']
  const [altoEsc, anchoEsc] = escena.assets.swir16['proj:shape']
  const xs = pts.map((q) => q[0])
  const ys = pts.map((q) => q[1])
  const c0 = Math.max(0, Math.floor((Math.min(...xs) - ox) / PIXEL))
  const c1 = Math.min(anchoEsc, Math.ceil((Math.max(...xs) - ox) / PIXEL))
  const f0 = Math.max(0, Math.floor((oy - Math.max(...ys)) / PIXEL))
  const f1 = Math.min(altoEsc, Math.ceil((oy - Math.min(...ys)) / PIXEL))
  const ancho = c1 - c0
  const alto = f1 - f0
  if (ancho <= 0 || alto <= 0) throw new Error('El poligono cae fuera de la escena')

  const leer = async (nombre) => {
    const a = escena.assets[nombre]
    const k = PIXEL / a['raster:bands'][0].spatial_resolution // 2 para las bandas de 10 m
    const img = await (await fromUrl(a.href)).getImage(0) // resolucion completa, sin overviews
    const [datos] = await img.readRasters({
      window: [c0 * k, f0 * k, c1 * k, f1 * k],
      width: ancho,
      height: alto,
      resampleMethod: 'nearest',
    })
    const { scale = 1, offset = 0 } = a['raster:bands'][0]
    return { datos, scale, offset }
  }
  const [b02, b04, b11, b12, scl] = await Promise.all(['blue', 'red', 'swir16', 'swir22', 'scl'].map(leer))

  const n = ancho * alto
  const oxidos = new Float32Array(n).fill(NaN)
  const arcillas = new Float32Array(n).fill(NaN)
  const vOx = []
  const vAr = []
  let enPoligono = 0
  const refl = (b, i) => b.datos[i] * b.scale + b.offset
  for (let f = 0; f < alto; f++) {
    const y = oy - (f0 + f + 0.5) * PIXEL
    for (let c = 0; c < ancho; c++) {
      if (!dentro(ox + (c0 + c + 0.5) * PIXEL, y, pts)) continue
      enPoligono++
      const i = f * ancho + c
      if (SCL_MALO.has(scl.datos[i]) || !b02.datos[i] || !b04.datos[i] || !b11.datos[i] || !b12.datos[i]) continue
      const azul = refl(b02, i)
      const swir2 = refl(b12, i)
      if (azul <= 0.001 || swir2 <= 0.001) continue
      oxidos[i] = refl(b04, i) / azul
      arcillas[i] = refl(b11, i) / swir2
      vOx.push(oxidos[i])
      vAr.push(arcillas[i])
    }
  }
  if (!vOx.length) throw new Error('Sin pixeles validos en el poligono (nubes, agua o sin dato)')

  // Orden de claves fijo: este objeto serializado es lo que se hashea.
  const informe = {
    version: VERSION,
    escena: escena.id,
    fechaEscena: Math.floor(Date.parse(p.datetime) / 1000),
    plataforma: p.platform,
    nubesEscenaPct: r4(p['eo:cloud_cover']),
    epsg,
    poligono,
    areaKm2: r4(areaKm2),
    pixelMetros: PIXEL,
    pixelesEnPoligono: enPoligono,
    pixelesValidos: vOx.length,
    umbrales: UMBRALES,
    oxidos: resumen(vOx, UMBRALES.oxidos),
    arcillas: resumen(vAr, UMBRALES.arcillas),
    alcance:
      'Indices espectrales de superficie. No estima ley, tonelaje, profundidad, valor ni contenido de litio en salmuera. No es un recurso ni una reserva mineral.',
    atribucion: `Contains modified Copernicus Sentinel data ${new Date(p.datetime).getUTCFullYear()}`,
  }
  const json = JSON.stringify(informe)

  const aLonLat = (x, y) => aUtm.inverse([x, y]).map((v) => Math.round(v * 1e6) / 1e6)
  const [x0, x1, y0, y1] = [ox + c0 * PIXEL, ox + c1 * PIXEL, oy - f0 * PIXEL, oy - f1 * PIXEL]
  return {
    informe,
    json,
    hash: keccak256(toHex(json)),
    capas: {
      oxidos: capa(ancho, alto, oxidos, UMBRALES.oxidos, [[255, 214, 102], [176, 32, 32]]),
      arcillas: capa(ancho, alto, arcillas, UMBRALES.arcillas, [[150, 220, 230], [24, 70, 160]]),
    },
    // arriba-izq, arriba-der, abajo-der, abajo-izq: el orden que pide una image source de MapLibre
    esquinas: [aLonLat(x0, y0), aLonLat(x1, y0), aLonLat(x1, y1), aLonLat(x0, y1)],
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [archivo, sceneId, salida = 'salida'] = process.argv.slice(2)
  if (!archivo) {
    console.error('Uso: node estudio.mjs <poligono.geojson> [sceneId] [carpetaSalida]')
    process.exit(1)
  }
  const r = await estudio(JSON.parse(readFileSync(archivo, 'utf8')), sceneId || undefined)
  mkdirSync(salida, { recursive: true })
  writeFileSync(`${salida}/informe.json`, r.json)
  writeFileSync(`${salida}/oxidos.png`, r.capas.oxidos)
  writeFileSync(`${salida}/arcillas.png`, r.capas.arcillas)
  console.log(JSON.stringify(r.informe, null, 2))
  console.log('hash', r.hash)
}
