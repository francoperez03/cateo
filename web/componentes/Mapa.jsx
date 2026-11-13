'use client'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useRef } from 'react'

const ESTILO = {
  version: 8,
  sources: {
    fondo: {
      type: 'raster',
      tiles: ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg'],
      tileSize: 256,
      maxzoom: 14,
      attribution: 'Sentinel-2 cloudless por EOX · Contains modified Copernicus Sentinel data 2020',
    },
  },
  layers: [{ id: 'fondo', type: 'raster', source: 'fondo' }],
}
const TINTA = '#ffffff'

function figura(puntos) {
  const f = []
  if (puntos.length >= 3) f.push({ type: 'Feature', geometry: { type: 'Polygon', coordinates: [[...puntos, puntos[0]]] } })
  else if (puntos.length === 2) f.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: puntos } })
  for (const p of puntos) f.push({ type: 'Feature', geometry: { type: 'Point', coordinates: p } })
  return { type: 'FeatureCollection', features: f }
}

/** puntos: vertices [lon, lat] sin cerrar. onPunto: si viene, el mapa es editable. capas: { oxidos, arcillas, esquinas }. */
export default function Mapa({ puntos = [], onPunto, capas, visible = 'oxidos', etiqueta }) {
  const caja = useRef(null)
  const mapa = useRef(null)
  const alClic = useRef(onPunto)
  alClic.current = onPunto

  useEffect(() => {
    const m = new maplibregl.Map({ container: caja.current, style: ESTILO, center: [-66.88, -24.715], zoom: 9.5, attributionControl: { compact: true } })
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
    m.on('load', () => {
      m.addSource('area', { type: 'geojson', data: figura([]) })
      m.addLayer({ id: 'area-relleno', type: 'fill', source: 'area', filter: ['==', '$type', 'Polygon'], paint: { 'fill-color': TINTA, 'fill-opacity': 0.08 } })
      m.addLayer({ id: 'area-borde', type: 'line', source: 'area', filter: ['!=', '$type', 'Point'], paint: { 'line-color': TINTA, 'line-width': 2 } })
      m.addLayer({ id: 'area-vertices', type: 'circle', source: 'area', filter: ['==', '$type', 'Point'], paint: { 'circle-radius': 4, 'circle-color': TINTA, 'circle-stroke-color': '#10202e', 'circle-stroke-width': 1.5 } })
      m.fire('cateo-listo')
    })
    m.on('click', (e) => alClic.current?.([Number(e.lngLat.lng.toFixed(5)), Number(e.lngLat.lat.toFixed(5))]))
    mapa.current = m
    return () => m.remove()
  }, [])

  const cuandoListo = (fn) => {
    const m = mapa.current
    if (!m) return
    if (m.getSource('area')) fn(m)
    else m.once('cateo-listo', () => fn(m))
  }

  const clave = JSON.stringify(puntos)
  useEffect(() => {
    cuandoListo((m) => {
      m.getSource('area').setData(figura(puntos))
      m.setLayoutProperty('area-vertices', 'visibility', onPunto ? 'visible' : 'none')
      if (!onPunto && puntos.length >= 3) {
        const b = puntos.reduce((b, p) => b.extend(p), new maplibregl.LngLatBounds(puntos[0], puntos[0]))
        m.fitBounds(b, { padding: 48, duration: 0 })
      }
    })
  }, [clave, !!onPunto]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!capas) return
    cuandoListo((m) => {
      for (const nombre of ['oxidos', 'arcillas']) {
        if (m.getLayer(nombre)) m.removeLayer(nombre)
        if (m.getSource(nombre)) m.removeSource(nombre)
        m.addSource(nombre, { type: 'image', url: capas[nombre], coordinates: capas.esquinas })
        m.addLayer({ id: nombre, type: 'raster', source: nombre, paint: { 'raster-opacity': 0.9, 'raster-resampling': 'nearest' }, layout: { visibility: nombre === visible ? 'visible' : 'none' } }, 'area-relleno')
      }
    })
  }, [capas]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cuandoListo((m) => {
      for (const nombre of ['oxidos', 'arcillas']) if (m.getLayer(nombre)) m.setLayoutProperty(nombre, 'visibility', nombre === visible ? 'visible' : 'none')
    })
  }, [visible, capas]) // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={caja} className={`mapa${onPunto ? ' editable' : ''}`} role="application" aria-label={etiqueta || 'Mapa del área'} />
}
