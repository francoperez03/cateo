import { parseAbi } from 'viem'

export const abi = parseAbi([
  'function token() view returns (address)',
  'function satelite() view returns (address)',
  'function precioEstudio() view returns (uint256)',
  'function totalEstudios() view returns (uint256)',
  'function totalColectas() view returns (uint256)',
  'function estudios(uint256) view returns (address solicitante, string geojson, string expediente, bool atestado, string sceneId, uint64 fechaEscena, uint16 pctOxidos, uint16 pctArcillas, bytes32 hashInforme, string versionAlgoritmo, uint64 bloquePedido, uint64 bloqueAtestado)',
  'function colectas(uint256) view returns (uint256 estudioId, address creador, uint256 meta, uint64 vence, uint256 recaudado, bool retirada)',
  'function aportes(uint256, address) view returns (uint256)',
  'function pedirEstudio(string geojson, string expediente) returns (uint256)',
  'function atestar(uint256 id, string sceneId, uint64 fechaEscena, uint16 pctOxidos, uint16 pctArcillas, bytes32 hashInforme, string versionAlgoritmo)',
  'function crearColecta(uint256 estudioId, uint256 meta, uint64 vence) returns (uint256)',
  'function aportar(uint256 colectaId, uint256 monto)',
  'function retirar(uint256 colectaId)',
  'function reembolsar(uint256 colectaId)',
  'event EstudioPedido(uint256 indexed id, address indexed solicitante, string geojson, string expediente)',
  'event EstudioAtestado(uint256 indexed id, string sceneId, uint64 fechaEscena, uint16 pctOxidos, uint16 pctArcillas, bytes32 hashInforme, string versionAlgoritmo)',
  'event ColectaCreada(uint256 indexed id, uint256 indexed estudioId, address indexed creador, uint256 meta, uint64 vence)',
])

export const abiToken = parseAbi([
  'function balanceOf(address) view returns (uint256)',
  'function allowance(address, address) view returns (uint256)',
  'function approve(address, uint256) returns (bool)',
  'function mint(address, uint256)',
])
