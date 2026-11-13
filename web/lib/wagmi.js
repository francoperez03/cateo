import { createConfig, http } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { cadena } from './cadena'

export const config = createConfig({
  chains: [cadena],
  connectors: [injected()],
  transports: { [cadena.id]: http() },
  ssr: true,
})
