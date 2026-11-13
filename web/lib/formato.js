import { formatUnits } from 'viem'

export const usd = (v) => Number(formatUnits(v ?? 0n, 6)).toLocaleString('es-AR', { maximumFractionDigits: 2 })
export const pct = (pb) => (Number(pb) / 100).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + '%'
export const fecha = (seg) =>
  new Date(Number(seg) * 1000).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
export const corta = (a) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '')

// Area aproximada de un anillo lon/lat en km2 (proyeccion equirectangular local). Solo para avisar antes de pagar:
// el valor que vale es el que calcula el estudio en UTM.
export function areaKm2(anillo) {
  if (!anillo || anillo.length < 4) return 0
  const lat0 = (anillo.reduce((s, p) => s + p[1], 0) / anillo.length) * (Math.PI / 180)
  const R = 6371.0088
  const xy = anillo.map(([lon, lat]) => [R * (lon * Math.PI) / 180 * Math.cos(lat0), (R * lat * Math.PI) / 180])
  let a = 0
  for (let i = 0; i < xy.length - 1; i++) a += xy[i][0] * xy[i + 1][1] - xy[i + 1][0] * xy[i][1]
  return Math.abs(a) / 2
}

export function leerPoligono(texto) {
  const g = JSON.parse(texto)
  const geo = g.type === 'FeatureCollection' ? g.features?.[0]?.geometry : g.type === 'Feature' ? g.geometry : g
  if (geo?.type !== 'Polygon' || !(geo.coordinates?.[0]?.length >= 4)) throw new Error('Se espera un polígono GeoJSON')
  return geo.coordinates[0].map(([lon, lat]) => [Number(lon.toFixed(5)), Number(lat.toFixed(5))])
}
export const aGeojson = (anillo) => JSON.stringify({ type: 'Polygon', coordinates: [anillo] })

export const mensajeError = (e) => {
  const m = e?.shortMessage || e?.message || String(e)
  if (/User rejected|denied/i.test(m)) return 'Rechazaste la transacción en la wallet.'
  if (/insufficient funds/i.test(m)) return 'No alcanza el AVAX para pagar el gas.'
  const r = m.match(/reverted with the following reason:\s*(.+)/)
  return r ? `El contrato rechazó la operación: ${r[1]}` : 'No se pudo completar la operación. Reintentá.'
}
