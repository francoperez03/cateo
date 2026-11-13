'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { parseEventLogs } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import Recorrido from '@/componentes/Recorrido'
import { abi, abiToken, AREA_MAX_KM2, cadena, CATEO, ACUNABLE, MONEDA, TOKEN } from '@/lib/cadena'
import { aGeojson, areaKm2, leerPoligono, mensajeError, usd } from '@/lib/formato'
import { useTitulo } from '@/lib/lecturas'
import { asegurarPermiso, enviar } from '@/lib/tx'

const Mapa = dynamic(() => import('@/componentes/Mapa'), { ssr: false, loading: () => <div className="mapa cargando">Cargando el mapa…</div> })
// Borde oeste del Salar de Pozuelos, Salta. Unos 63 km2.
const EJEMPLO = [[-66.92, -24.75], [-66.84, -24.75], [-66.84, -24.68], [-66.92, -24.68]]

export default function PedirEstudio() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const [puntos, setPuntos] = useState([])
  const [expediente, setExpediente] = useState('')
  const [pegado, setPegado] = useState('')
  const [paso, setPaso] = useState('') // '', 'permiso', 'pago'
  const [error, setError] = useState('')
  useTitulo('Pedir un estudio · Cateo')

  const lectura = { chainId: cadena.id, query: { enabled: !!CATEO } }
  const precio = useReadContract({ address: CATEO, abi, functionName: 'precioEstudio', ...lectura }).data
  const saldo = useReadContract({ address: TOKEN, abi: abiToken, functionName: 'balanceOf', args: [address], chainId: cadena.id, query: { enabled: !!TOKEN && !!address, refetchInterval: 5000 } })

  const anillo = puntos.length >= 3 ? [...puntos, puntos[0]] : null
  const area = areaKm2(anillo)
  const areaMal = anillo && (area > AREA_MAX_KM2 ? `Supera el máximo de ${AREA_MAX_KM2} km².` : area < 0.01 ? 'Es demasiado chica: mínimo 1 hectárea.' : '')
  const sinSaldo = precio !== undefined && saldo.data !== undefined && saldo.data < precio
  const puede = CATEO && isConnected && anillo && !areaMal && precio !== undefined && !sinSaldo && !paso

  async function pagar() {
    setError('')
    try {
      setPaso('permiso')
      await asegurarPermiso(precio)
      setPaso('pago')
      const recibo = await enviar({ address: CATEO, abi, functionName: 'pedirEstudio', args: [aGeojson(anillo), expediente.trim()] })
      const [evento] = parseEventLogs({ abi, logs: recibo.logs, eventName: 'EstudioPedido' })
      router.push(`/estudio/${evento.args.id}`)
    } catch (e) {
      setError(mensajeError(e))
      setPaso('')
    }
  }

  async function acunar() {
    setError('')
    try {
      await enviar({ address: TOKEN, abi: abiToken, functionName: 'mint', args: [address, 1000_000000n] })
      saldo.refetch()
    } catch (e) {
      setError(mensajeError(e))
    }
  }

  function cargarPegado() {
    try {
      setPuntos(leerPoligono(pegado).slice(0, -1))
      setError('')
    } catch {
      setError('No se pudo leer el GeoJSON. Pegá un Polygon con coordenadas [longitud, latitud].')
    }
  }

  return (
    <div className="dos-columnas">
      <div className="lienzo">
        <Mapa puntos={puntos} onPunto={(p) => setPuntos((v) => [...v, p])} etiqueta="Mapa para marcar el área del estudio" />
      </div>
      <section className="ficha">
        <Recorrido paso={0} />
        <h1>Pedir un estudio</h1>
        <p>Marcá los vértices en el mapa o usá el ejemplo. Máximo {AREA_MAX_KM2} km².</p>

        <div className="acciones chicas">
          <button className="boton fantasma" onClick={() => setPuntos(EJEMPLO)}>Área de ejemplo</button>
          <button className="boton fantasma" onClick={() => setPuntos((v) => v.slice(0, -1))} disabled={!puntos.length}>Deshacer</button>
          <button className="boton fantasma" onClick={() => setPuntos([])} disabled={!puntos.length}>Borrar</button>
        </div>
        <details>
          <summary>Pegar un GeoJSON</summary>
          <label className="campo">
            <span>Polígono GeoJSON (longitud, latitud)</span>
            <textarea rows={4} value={pegado} onChange={(e) => setPegado(e.target.value)} spellCheck={false} />
          </label>
          <button className="boton fantasma" onClick={cargarPegado} disabled={!pegado.trim()}>Cargar</button>
        </details>

        <dl className="medidas">
          <div>
            <dt>Vértices</dt>
            <dd className="dato">{puntos.length}</dd>
          </div>
          <div>
            <dt>Área</dt>
            <dd className="dato">{anillo ? `${area.toLocaleString('es-AR', { maximumFractionDigits: 1 })} km²` : 'Faltan vértices'}</dd>
          </div>
          <div>
            <dt>Precio</dt>
            <dd className="dato">{precio !== undefined ? `${usd(precio)} ${MONEDA}` : '…'}</dd>
          </div>
        </dl>
        {areaMal ? <p className="nota-error" role="alert">{areaMal}</p> : null}

        <label className="campo">
          <span>Expediente minero <em>(declarado, no se verifica)</em></span>
          <input value={expediente} onChange={(e) => setExpediente(e.target.value)} maxLength={64} placeholder="Ejemplo: EXP-23.456/2025" autoComplete="off" />
        </label>

        {!CATEO ? (
          <p className="nota-error" role="alert">El contrato todavía no está desplegado en Fuji.</p>
        ) : !isConnected ? (
          <p className="nota">Conectá una wallet para pagar.</p>
        ) : sinSaldo ? (
          <p className="nota" role="status">
            Tu saldo es {usd(saldo.data)} {MONEDA}, no alcanza.{' '}
            {ACUNABLE ? (
              <button className="enlace" onClick={acunar}>Acuñar 1.000 tUSD de prueba</button>
            ) : (
              <a href="https://faucet.circle.com" target="_blank" rel="noreferrer">Pedir USDC de prueba</a>
            )}
          </p>
        ) : null}

        <button className="boton ancho" disabled={!puede} onClick={pagar}>
          {paso === 'permiso' ? 'Autorizando el pago…' : paso === 'pago' ? 'Enviando el pedido…' : precio !== undefined ? `Pagar ${usd(precio)} ${MONEDA} y pedir` : 'Pedir el estudio'}
        </button>
        {error ? <p className="nota-error" role="alert">{error}</p> : null}
        <p className="nota">Se atesta en menos de un minuto.</p>
      </section>
    </div>
  )
}
