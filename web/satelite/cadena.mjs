// Conexion compartida por atestar.mjs y verificar.mjs. Variables: RPC_URL, CATEO, PRIVATE_KEY (solo para atestar).
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

const falta = (n) => {
  throw new Error(`Falta la variable de entorno ${n}`)
}
export const CATEO = process.env.CATEO ?? falta('CATEO')
const transport = http(process.env.RPC_URL ?? 'https://api.avax-test.network/ext/bc/C/rpc')
export const lector = createPublicClient({ transport })
export const firmante = () =>
  createWalletClient({ transport, account: privateKeyToAccount(process.env.PRIVATE_KEY ?? falta('PRIVATE_KEY')) })
