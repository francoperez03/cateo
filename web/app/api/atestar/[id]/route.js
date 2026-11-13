// El satelite como funcion: corre el estudio de un pedido ya pagado y firma la atestacion.
// Cualquiera puede llamarla; solo actua sobre estudios pagados y sin atestar, y el contrato rechaza el resto.
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { abi, cadena, CATEO } from '@/lib/cadena'
import { leerEstudio, lector } from '@/lib/servidor'
import { estudio } from '@/satelite/estudio.mjs'

export const maxDuration = 60

export async function POST(_req, { params }) {
  const { id } = await params
  if (!/^\d+$/.test(id)) return Response.json({ error: 'id inválido' }, { status: 400 })
  if (!process.env.PRIVATE_KEY) return Response.json({ error: 'El satélite no tiene clave configurada.' }, { status: 503 })
  try {
    const e = await leerEstudio(id)
    if (e.atestado) return Response.json({ ok: true, yaAtestado: true })
    const { informe, hash } = await estudio(JSON.parse(e.geojson))
    const wallet = createWalletClient({ chain: cadena, transport: http(process.env.RPC_URL || undefined), account: privateKeyToAccount(process.env.PRIVATE_KEY) })
    const tx = await wallet.writeContract({
      address: CATEO,
      abi,
      functionName: 'atestar',
      args: [BigInt(id), informe.escena, BigInt(informe.fechaEscena), informe.oxidos.pbSobreUmbral, informe.arcillas.pbSobreUmbral, hash, informe.version],
    })
    await lector.waitForTransactionReceipt({ hash: tx })
    return Response.json({ ok: true, tx })
  } catch (err) {
    const m = err.shortMessage || err.message
    return Response.json({ error: m }, { status: /ya atestado/.test(m) ? 200 : 502 })
  }
}
