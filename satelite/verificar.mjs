// Recomputa un estudio desde lo que hay en la cadena (poligono + escena) y compara con el hash atestado.
// Cualquiera puede correrlo: no usa claves. Uso: node verificar.mjs <id>
import { abi } from './abi.mjs'
import { CATEO, lector } from './cadena.mjs'
import { VERSION, estudio } from './estudio.mjs'

const id = BigInt(process.argv[2] ?? (console.error('Uso: node verificar.mjs <id>'), process.exit(1)))
const [, geojson, , atestado, sceneId, , , , hashInforme, version] = await lector.readContract({
  address: CATEO,
  abi,
  functionName: 'estudios',
  args: [id],
})
if (!atestado) throw new Error(`El estudio ${id} todavia no esta atestado`)
if (version !== VERSION) throw new Error(`Atestado con ${version}; este codigo es ${VERSION}. Usar el commit de esa version.`)
const { hash } = await estudio(JSON.parse(geojson), sceneId)
console.log(`cadena    ${hashInforme}\nrecomputo ${hash}`)
console.log(hash === hashInforme ? 'COINCIDE' : 'NO COINCIDE')
process.exit(hash === hashInforme ? 0 : 1)
