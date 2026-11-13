'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { use, useCallback, useEffect, useRef, useState } from 'react'
import { parseEventLogs, parseUnits } from 'viem'
import { useRouter } from 'next/navigation'
import { useAccount, useReadContract } from 'wagmi'
import Limite from '@/componentes/Limite'
import Recorrido from '@/componentes/Recorrido'
import { abi, cadena, CATEO, enlaceDireccion, enlaceTx, MONEDA } from '@/lib/cadena'
import { corta, fecha, mensajeError, pct, usd } from '@/lib/formato'
import { estadoColecta, useColectas, useEstudio, useTitulo } from '@/lib/lecturas'
import { enviar } from '@/lib/tx'

const Mapa = dynamic(() => import('@/componentes/Mapa'), { ssr: false, loading: () => <div className="mapa cargando">Cargando el mapa…</div> })
const CAPAS = [
  ['oxidos', 'Óxidos férricos'],
  ['arcillas', 'Arcillas'],
  ['ninguna', 'Solo el área'],
]

export default function Estudio({ params }) {
  const { id } = use(params)
  const valido = /^\d+$/.test(id)
  const { address } = useAccount()
  const [esperando, setEsperando] = useState(true)
  const { estudio: e, isLoading, error: errorLectura, refetch } = useEstudio(valido ? id : 0, esperando ? 4000 : false)
  const satelite = useReadContract({ address: CATEO, abi, functionName: 'satelite', chainId: cadena.id, query: { enabled: !!CATEO } }).data
  const colectas = useColectas()
  const [recomputo, setRecomputo] = useState({ estado: 'inactivo' })
  const [capa, setCapa] = useState('oxidos')
  const [errorSatelite, setErrorSatelite] = useState('')
  const pedido = useRef(false)
  useTitulo(`Estudio N.º ${id} · Cateo`)

  useEffect(() => {
    if (e) setEsperando(!e.atestado)
  }, [e?.atestado]) // eslint-disable-line react-hooks/exhaustive-deps

  // Pedido pagado y sin atestar: se llama al satelite una vez. Si falla, queda el boton para reintentar.
  const llamarSatelite = useCallback(async () => {
    setErrorSatelite('')
    try {
      const r = await fetch(`/api/atestar/${id}`, { method: 'POST' })
      const j = await r.json()
      if (j.error) setErrorSatelite(j.error)
      refetch()
    } catch {
      setErrorSatelite('No se pudo contactar al servicio de atestación.')
    }
  }, [id, refetch])
  useEffect(() => {
    if (e && !e.atestado && !pedido.current) {
      pedido.current = true
      llamarSatelite()
    }
  }, [e, llamarSatelite])

  const recomputar = useCallback(async () => {
    setRecomputo((r) => ({ ...r, estado: 'corriendo' }))
    try {
      const r = await fetch(`/api/estudio/${id}`, { cache: 'no-store' })
      const j = await r.json()
      setRecomputo(j.informe ? { estado: 'listo', ...j } : { estado: 'error', ...j, mensaje: j.error || 'No se pudo recomputar.' })
    } catch {
      setRecomputo({ estado: 'error', mensaje: 'No se pudo recomputar: falló la conexión.' })
    }
  }, [id])
  useEffect(() => {
    if (e?.atestado) recomputar()
  }, [e?.atestado, recomputar])

  if (!valido) return <p className="aviso-pagina">Ese número de estudio no es válido. <Link href="/">Volver al inicio</Link></p>
  if (!CATEO) return <p className="aviso-pagina">El contrato todavía no está desplegado en Fuji.</p>
  if (isLoading) return <p className="aviso-pagina">Leyendo la cadena…</p>
  if (errorLectura || !e) return <p className="aviso-pagina" role="alert">El estudio N.º {id} no existe en este contrato. <Link href="/">Volver al inicio</Link></p>

  const puntos = JSON.parse(e.geojson).coordinates[0].slice(0, -1)
  const suyas = colectas.lista.filter((c) => Number(c.estudioId) === Number(id))
  const esDueno = address && address.toLowerCase() === e.solicitante.toLowerCase()
  const inf = recomputo.informe
  const capas = recomputo.capas ? { ...recomputo.capas, esquinas: recomputo.esquinas } : null

  return (
    <div className="dos-columnas">
      <div className="lienzo">
        <Mapa puntos={puntos} capas={capas} visible={capa} etiqueta={`Mapa del estudio número ${id}`} />
        {e.atestado ? (
          <div className="control-capas">
            <fieldset>
              <legend>Capa</legend>
              {CAPAS.map(([clave, nombre]) => (
                <label key={clave} className={capa === clave ? 'activa' : ''}>
                  <input type="radio" name="capa" checked={capa === clave} onChange={() => setCapa(clave)} />
                  {nombre}
                </label>
              ))}
            </fieldset>
            {capa !== 'ninguna' ? (
              <p className={`leyenda ${capa}`}>
                <span>bajo el umbral</span>
                <i aria-hidden="true" />
                <span>muy por encima</span>
              </p>
            ) : null}
            {recomputo.estado === 'corriendo' && !capas ? <p className="nota">Recomputando las capas…</p> : null}
          </div>
        ) : null}
      </div>

      <section className="ficha">
        <Recorrido paso={e.atestado ? 2 : 1} />
        <h1>Estudio N.º {id}</h1>

        {!e.atestado ? (
          <div className="estado-espera" role="status">
            <h2>Cateo está procesando la escena</h2>
            <p>Busca la escena más despejada, calcula y firma. Menos de un minuto.</p>
            {errorSatelite ? (
              <>
                <p className="nota-error" role="alert">{errorSatelite}</p>
                <button className="boton fantasma" onClick={llamarSatelite}>Reintentar</button>
              </>
            ) : (
              <Espera />
            )}
          </div>
        ) : (
          <>
            <div className="resultado">
              <div className="medida ox">
                <span className="valor">{pct(e.pctOxidos)}</span>
                <span className="que">del área sobre el umbral de <strong>óxidos férricos</strong></span>
                <span className="como dato">B04/B02 &gt; {inf ? inf.umbrales.oxidos.toLocaleString('es-AR') : '…'}{inf ? ` · media ${inf.oxidos.media.toLocaleString('es-AR')} · p90 ${inf.oxidos.p90.toLocaleString('es-AR')}` : ''}</span>
              </div>
              <div className="medida ar">
                <span className="valor">{pct(e.pctArcillas)}</span>
                <span className="que">del área sobre el umbral de <strong>arcillas</strong></span>
                <span className="como dato">B11/B12 &gt; {inf ? inf.umbrales.arcillas.toLocaleString('es-AR') : '…'}{inf ? ` · media ${inf.arcillas.media.toLocaleString('es-AR')} · p90 ${inf.arcillas.p90.toLocaleString('es-AR')}` : ''}</span>
              </div>
            </div>
            <Limite />

            <div className={`verificacion ${recomputo.estado === 'listo' ? (recomputo.coincide ? 'bien' : 'mal') : ''}`} role="status" aria-live="polite">
              <h2>Atestación y verificación</h2>
              {recomputo.estado === 'corriendo' ? (
                <p>Recomputando desde la cadena…</p>
              ) : recomputo.estado === 'listo' ? (
                <p>
                  <strong>{recomputo.coincide ? 'Coincide.' : 'No coincide.'}</strong>{' '}
                  {recomputo.coincide
                    ? 'Recalculado desde la cadena, da el mismo hash.'
                    : 'El recálculo da otro hash. No uses este estudio.'}
                </p>
              ) : recomputo.estado === 'error' ? (
                <p className="nota-error">{recomputo.mensaje}</p>
              ) : null}
              <button className="boton fantasma" onClick={recomputar} disabled={recomputo.estado === 'corriendo'}>
                {recomputo.estado === 'corriendo' ? 'Recomputando…' : 'Recomputar'}
              </button>
            </div>

            {suyas.length ? (
              <Link className="boton fantasma" href={`/colecta/${suyas[0].id}`}>Ver la colecta N.º {suyas[0].id}</Link>
            ) : esDueno ? (
              <a className="boton fantasma" href="#abrir-colecta">Abrir una colecta</a>
            ) : null}

            <h2>Procedencia</h2>
            <dl className="procedencia">
              {inf ? <Dato t="Satélite" v={`${inf.plataforma.replace('sentinel-', 'Sentinel-').toUpperCase().replace('SENTINEL', 'Sentinel')} (ESA, Copernicus)`} /> : null}
              <Dato t="Escena" v={e.sceneId} href={`https://earth-search.aws.element84.com/v1/collections/sentinel-2-c1-l2a/items/${e.sceneId}`} mono />
              <Dato t="Fecha de la escena" v={fecha(e.fechaEscena)} />
              {inf ? <Dato t="Área" v={`${inf.areaKm2.toLocaleString('es-AR', { maximumFractionDigits: 1 })} km²`} /> : null}
              {inf ? <Dato t="Píxeles válidos" v={`${inf.pixelesValidos.toLocaleString('es-AR')} de ${inf.pixelesEnPoligono.toLocaleString('es-AR')}`} /> : null}
              <Dato t="Algoritmo" v={e.versionAlgoritmo} mono />
              <Dato t="Firmante" v={satelite ? corta(satelite) : '…'} href={enlaceDireccion(satelite)} mono />
              <Dato t="Hash del informe" v={e.hashInforme} mono />
              <Dato t="Transacción del pedido" v={recomputo.txPedido ? corta(recomputo.txPedido) : `bloque ${e.bloquePedido}`} href={enlaceTx(recomputo.txPedido)} mono />
              <Dato t="Transacción de la atestación" v={recomputo.txAtestacion ? corta(recomputo.txAtestacion) : `bloque ${e.bloqueAtestado}`} href={enlaceTx(recomputo.txAtestacion)} mono />
              <Dato t="Solicitante" v={corta(e.solicitante)} href={enlaceDireccion(e.solicitante)} mono />
            </dl>
            <p className="declarado-bloque">
              <span>Declarado, sin verificar</span>
              Expediente: <strong>{e.expediente || 'no declarado'}</strong>. Cateo no comprueba la titularidad.
            </p>
            {inf ? <p className="nota">{inf.atribucion}</p> : null}

            <h2>Colectas de este estudio</h2>
            {suyas.length === 0 ? <p className="vacio">Ninguna todavía.</p> : (
              <ul className="filas compactas">
                {suyas.map((c) => (
                  <li key={c.id}>
                    <Link href={`/colecta/${c.id}`}>
                      <span className="dato id">N.º {c.id}</span>
                      <span className="principal">{usd(c.recaudado)} de {usd(c.meta)} {MONEDA}</span>
                      <span className="secundario">{estadoColecta(c).texto}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {esDueno ? <CrearColecta estudioId={id} /> : <p className="nota">Solo el solicitante puede abrir una colecta.</p>}
          </>
        )}
      </section>
    </div>
  )
}

function Espera() {
  const [s, setS] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setS((v) => v + 1), 1000)
    return () => clearInterval(t)
  }, [])
  return <p className="dato">{s < 4 ? 'Buscando la escena' : s < 9 ? 'Calculando índices' : 'Firmando la atestación'} · {s} s</p>
}

function Dato({ t, v, href, mono, titulo }) {
  return (
    <div>
      <dt>{t}</dt>
      <dd className={mono ? 'dato' : ''} title={titulo}>
        {href ? <a href={href} target="_blank" rel="noreferrer">{v}</a> : v}
      </dd>
    </div>
  )
}

function CrearColecta({ estudioId }) {
  const router = useRouter()
  const [meta, setMeta] = useState('500')
  const [dias, setDias] = useState('30')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const valido = Number(meta) > 0 && Number(dias) >= 1 && Number(dias) <= 365

  async function crear(ev) {
    ev.preventDefault()
    setError('')
    setEnviando(true)
    try {
      const vence = BigInt(Math.floor(Date.now() / 1000) + Math.round(Number(dias) * 86400))
      const recibo = await enviar({ address: CATEO, abi, functionName: 'crearColecta', args: [BigInt(estudioId), parseUnits(meta, 6), vence] })
      const [evento] = parseEventLogs({ abi, logs: recibo.logs, eventName: 'ColectaCreada' })
      router.push(`/colecta/${evento.args.id}`)
    } catch (e) {
      setError(mensajeError(e))
      setEnviando(false)
    }
  }

  return (
    <form className="formulario" id="abrir-colecta" onSubmit={crear}>
      <h3>Abrir una colecta</h3>
      <div className="par">
        <label className="campo">
          <span>Meta en {MONEDA}</span>
          <input inputMode="decimal" value={meta} onChange={(e) => setMeta(e.target.value.replace(',', '.'))} required />
        </label>
        <label className="campo">
          <span>Plazo en días</span>
          <input inputMode="numeric" value={dias} onChange={(e) => setDias(e.target.value)} required />
        </label>
      </div>
      <button className="boton" disabled={!valido || enviando}>{enviando ? 'Abriendo…' : 'Abrir la colecta'}</button>
      {error ? <p className="nota-error" role="alert">{error}</p> : null}
      <p className="nota">Aportes en custodia. Si no llega a la meta, se reembolsan.</p>
    </form>
  )
}
