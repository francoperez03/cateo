import { createPublicClient, http } from 'viem'
import { abi, cadena, CATEO } from './cadena'

export const lector = createPublicClient({ chain: cadena, transport: http(process.env.RPC_URL || undefined) })

const CAMPOS = ['solicitante', 'geojson', 'expediente', 'atestado', 'sceneId', 'fechaEscena', 'pctOxidos', 'pctArcillas', 'hashInforme', 'versionAlgoritmo', 'bloquePedido', 'bloqueAtestado']
export const aEstudio = (t) => Object.fromEntries(CAMPOS.map((k, i) => [k, typeof t[i] === 'bigint' ? Number(t[i]) : t[i]]))

export async function leerEstudio(id) {
  const t = await lector.readContract({ address: CATEO, abi, functionName: 'estudios', args: [BigInt(id)] })
  return aEstudio(t)
}
