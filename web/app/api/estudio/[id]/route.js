// Recomputa el estudio desde lo que hay en la cadena (poligono + escena) y lo compara con el hash atestado.
import { enlaceTx } from '@/lib/cadena'
import { leerEstudio, lector } from '@/lib/servidor'
import { abi, CATEO } from '@/lib/cadena'
import { estudio, VERSION } from '@/satelite/estudio.mjs'

export const maxDuration = 60

async function txDelBloque(evento, id, bloque) {
  if (!bloque) return null
  const logs = await lector.getContractEvents({ address: CATEO, abi, eventName: evento, args: { id: BigInt(id) }, fromBlock: BigInt(bloque), toBlock: BigInt(bloque) })
  return logs[0]?.transactionHash ?? null
}

export async function GET(_req, { params }) {
  const { id } = await params
  if (!/^\d+$/.test(id)) return Response.json({ error: 'id inválido' }, { status: 400 })
  try {
    const e = await leerEstudio(id)
    if (!e.atestado) return Response.json({ atestado: false })
    const [txPedido, txAtestacion] = await Promise.all([txDelBloque('EstudioPedido', id, e.bloquePedido), txDelBloque('EstudioAtestado', id, e.bloqueAtestado)])
    if (e.versionAlgoritmo !== VERSION) {
      return Response.json({ atestado: true, txPedido, txAtestacion, error: `Atestado con ${e.versionAlgoritmo}; este servidor corre ${VERSION}.` })
    }
    const r = await estudio(JSON.parse(e.geojson), e.sceneId)
    const png = (b) => `data:image/png;base64,${b.toString('base64')}`
    return Response.json({
      atestado: true,
      informe: r.informe,
      hashRecomputado: r.hash,
      coincide: r.hash === e.hashInforme,
      esquinas: r.esquinas,
      capas: { oxidos: png(r.capas.oxidos), arcillas: png(r.capas.arcillas) },
      txPedido,
      txAtestacion,
      enlaces: { pedido: enlaceTx(txPedido), atestacion: enlaceTx(txAtestacion) },
    })
  } catch (err) {
    return Response.json({ error: err.shortMessage || err.message }, { status: 502 })
  }
}
