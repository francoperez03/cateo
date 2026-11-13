'use client'
import Link from 'next/link'
import { use, useState } from 'react'
import { parseUnits } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import Limite from '@/componentes/Limite'
import Recorrido from '@/componentes/Recorrido'
import { abi, abiToken, cadena, CATEO, enlaceDireccion, ACUNABLE, MONEDA, TOKEN } from '@/lib/cadena'
import { corta, fecha, mensajeError, pct, usd } from '@/lib/formato'
import { estadoColecta, useColecta, useEstudio } from '@/lib/lecturas'
import { asegurarPermiso, enviar } from '@/lib/tx'

export default function Colecta({ params }) {
  const { id } = use(params)
  const valido = /^\d+$/.test(id)
  const { address, isConnected } = useAccount()
  const { colecta: c, isLoading, error: errorLectura, refetch } = useColecta(valido ? id : 0)
  const { estudio: e } = useEstudio(c ? Number(c.estudioId) : 0)
  const lectura = { chainId: cadena.id, query: { enabled: !!address && !!CATEO, refetchInterval: 6000 } }
  const aporte = useReadContract({ address: CATEO, abi, functionName: 'aportes', args: [BigInt(valido ? id : 0), address], ...lectura })
  const saldo = useReadContract({ address: TOKEN, abi: abiToken, functionName: 'balanceOf', args: [address], ...lectura })
  const [monto, setMonto] = useState('100')
  const [accion, setAccion] = useState('')
  const [error, setError] = useState('')
  const [hecho, setHecho] = useState('')

  if (!valido) return <p className="aviso-pagina">Ese número de colecta no es válido. <Link href="/">Volver al inicio</Link></p>
  if (!CATEO) return <p className="aviso-pagina">El contrato todavía no está desplegado en Fuji.</p>
  if (isLoading) return <p className="aviso-pagina">Leyendo la cadena…</p>
  if (errorLectura || !c) return <p className="aviso-pagina" role="alert">La colecta N.º {id} no existe en este contrato. <Link href="/">Volver al inicio</Link></p>

  const estado = estadoColecta(c)
  const esCreador = address && address.toLowerCase() === c.creador.toLowerCase()
  const miAporte = aporte.data ?? 0n
  let valor = 0n
  try {
    valor = parseUnits(monto || '0', 6)
  } catch {}
  const sinSaldo = saldo.data !== undefined && valor > saldo.data

  async function correr(nombre, fn, mensaje) {
    setError('')
    setHecho('')
    setAccion(nombre)
    try {
      await fn()
      setHecho(mensaje)
      refetch()
      aporte.refetch()
      saldo.refetch()
    } catch (err) {
      setError(mensajeError(err))
    }
    setAccion('')
  }
  const llamada = (functionName, args) => enviar({ address: CATEO, abi, functionName, args })

  return (
    <div className="pagina angosta">
      <Recorrido paso={3} />
      <h1>Colecta N.º {id}</h1>
      <p className={`sello ${estado.clave}`}>{estado.texto}</p>

      <div className="avance">
        <p className="cifra">
          <span className="valor">{usd(c.recaudado)}</span> de {usd(c.meta)} {MONEDA}
        </p>
        <progress max={Number(c.meta)} value={Number(c.recaudado)} aria-label="Recaudado sobre la meta" />
        <dl className="medidas">
          <div>
            <dt>{estado.clave === 'abierta' ? 'Vence el' : 'Venció el'}</dt>
            <dd>{fecha(c.vence)}</dd>
          </div>
          <div>
            <dt>Abrió la colecta</dt>
            <dd className="dato">{enlaceDireccion(c.creador) ? <a href={enlaceDireccion(c.creador)} target="_blank" rel="noreferrer">{corta(c.creador)}</a> : corta(c.creador)}</dd>
          </div>
          {isConnected ? (
            <div>
              <dt>Tu aporte</dt>
              <dd className="dato">{usd(miAporte)} {MONEDA}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <section className="acciones-colecta">
        {!isConnected ? (
          <p className="nota">Conectá una wallet para aportar.</p>
        ) : estado.clave === 'abierta' || (estado.clave === 'alcanzada' && Date.now() / 1000 < Number(c.vence)) ? (
          <form className="formulario" onSubmit={(ev) => { ev.preventDefault(); correr('aportar', async () => { await asegurarPermiso(valor); await llamada('aportar', [BigInt(id), valor]) }, 'Aporte registrado.') }}>
            <h2>Aportar</h2>
            <label className="campo">
              <span>Monto en {MONEDA}</span>
              <input inputMode="decimal" value={monto} onChange={(ev) => setMonto(ev.target.value.replace(',', '.'))} />
            </label>
            {sinSaldo ? (
              <p className="nota">
                Saldo: {usd(saldo.data)} {MONEDA}.{' '}
                {ACUNABLE ? (
                  <button type="button" className="enlace" onClick={() => correr('acunar', () => enviar({ address: TOKEN, abi: abiToken, functionName: 'mint', args: [address, 1000_000000n] }), 'Se acuñaron 1.000 tUSD de prueba.')}>Acuñar 1.000 tUSD de prueba</button>
                ) : (
                  <a href="https://faucet.circle.com" target="_blank" rel="noreferrer">Pedir USDC de prueba</a>
                )}
              </p>
            ) : null}
            <button className="boton" disabled={valor <= 0n || sinSaldo || !!accion}>{accion === 'aportar' ? 'Enviando…' : `Aportar ${usd(valor)} ${MONEDA}`}</button>
            <p className="nota">Activos simulados. Si no llega a la meta, recuperás todo.</p>
          </form>
        ) : null}

        {isConnected && esCreador && estado.clave === 'alcanzada' ? (
          <div className="formulario">
            <h2>Retirar</h2>
            <p>Meta alcanzada: {usd(c.recaudado)} {MONEDA} disponibles.</p>
            <button className="boton" disabled={!!accion} onClick={() => correr('retirar', () => llamada('retirar', [BigInt(id)]), 'Fondos retirados.')}>{accion === 'retirar' ? 'Retirando…' : 'Retirar'}</button>
          </div>
        ) : null}

        {isConnected && estado.clave === 'vencida' ? (
          <div className="formulario">
            <h2>Reembolso</h2>
            {miAporte > 0n ? (
              <>
                <p>Venció sin llegar a la meta. Tenés {usd(miAporte)} {MONEDA} para recuperar.</p>
                <button className="boton" disabled={!!accion} onClick={() => correr('reembolsar', () => llamada('reembolsar', [BigInt(id)]), 'Reembolso recibido.')}>{accion === 'reembolsar' ? 'Reembolsando…' : 'Recuperar mi aporte'}</button>
              </>
            ) : (
              <p>Venció sin llegar a la meta. No tenés aportes en esta wallet.</p>
            )}
          </div>
        ) : null}
        {hecho ? <p className="nota-ok" role="status">{hecho}</p> : null}
        {error ? <p className="nota-error" role="alert">{error}</p> : null}
      </section>

      <section className="respaldo">
        <h2>Estudio que la respalda</h2>
        {e ? (
          <Link className="tarjeta-estudio" href={`/estudio/${Number(c.estudioId)}`}>
            <span className="dato id">Estudio N.º {Number(c.estudioId)}</span>
            <span className="indice ox">Óxidos férricos {pct(e.pctOxidos)}</span>
            <span className="indice ar">Arcillas {pct(e.pctArcillas)}</span>
            <span className="secundario">{fecha(e.fechaEscena)} · ver mapa y recomputar</span>
          </Link>
        ) : (
          <p className="vacio">Leyendo el estudio…</p>
        )}
        <Limite />
      </section>
    </div>
  )
}
