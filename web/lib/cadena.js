// Direcciones y red. En Vercel: NEXT_PUBLIC_CATEO y NEXT_PUBLIC_TOKEN (Fuji). En local: NEXT_PUBLIC_RED=local (anvil).
import { avalancheFuji, foundry } from 'viem/chains'
export { abi, abiToken } from '@/satelite/abi.mjs'

export const CATEO = process.env.NEXT_PUBLIC_CATEO || undefined
export const TOKEN = process.env.NEXT_PUBLIC_TOKEN || undefined
export const LOCAL = process.env.NEXT_PUBLIC_RED === 'local'
export const cadena = LOCAL ? foundry : avalancheFuji
// NEXT_PUBLIC_MONEDA=tUSD: el token de pago es TokenPrueba (acuñado libre desde la web). Sin definir: USDC de Fuji.
export const MONEDA = process.env.NEXT_PUBLIC_MONEDA || (LOCAL ? 'tUSD' : 'USDC')
export const ACUNABLE = MONEDA === 'tUSD'
export const AREA_MAX_KM2 = 100

const base = 'https://testnet.snowtrace.io'
export const enlaceTx = (tx) => (LOCAL || !tx ? null : `${base}/tx/${tx}`)
export const enlaceDireccion = (a) => (LOCAL || !a ? null : `${base}/address/${a}`)
