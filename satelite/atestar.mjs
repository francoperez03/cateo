// El satelite: toma los estudios pedidos y sin atestar, corre el estudio y firma la atestacion.
// Uso: node atestar.mjs [--watch]
import { abi } from './abi.mjs'
import { CATEO, firmante, lector } from './cadena.mjs'
import { estudio } from './estudio.mjs'

const wallet = firmante()
const fallidos = new Set() // poligonos invalidos: no reintentar en cada vuelta

async function vuelta() {
  const total = await lector.readContract({ address: CATEO, abi, functionName: 'totalEstudios' })
  for (let id = 0n; id < total; id++) {
    if (fallidos.has(id)) continue
    const [, geojson, , atestado] = await lector.readContract({ address: CATEO, abi, functionName: 'estudios', args: [id] })
    if (atestado) continue
    try {
      const { informe, hash } = await estudio(JSON.parse(geojson))
      const tx = await wallet.writeContract({
        address: CATEO,
        abi,
        chain: null,
        functionName: 'atestar',
        args: [id, informe.escena, BigInt(informe.fechaEscena), informe.oxidos.pbSobreUmbral, informe.arcillas.pbSobreUmbral, hash, informe.version],
      })
      await lector.waitForTransactionReceipt({ hash: tx })
      console.log(`estudio ${id} atestado: escena ${informe.escena}, informe ${hash}, tx ${tx}`)
    } catch (e) {
      fallidos.add(id)
      console.error(`estudio ${id} fallo: ${e.shortMessage ?? e.message}`)
    }
  }
}

await vuelta()
while (process.argv.includes('--watch')) {
  await new Promise((r) => setTimeout(r, 5000))
  await vuelta().catch((e) => console.error(e.shortMessage ?? e.message))
}
