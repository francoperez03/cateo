'use client'
import { getAccount, readContract, switchChain, waitForTransactionReceipt, writeContract } from 'wagmi/actions'
import { abiToken, cadena, CATEO, TOKEN } from './cadena'
import { config } from './wagmi'

export async function enviar(llamada) {
  if (getAccount(config).chainId !== cadena.id) await switchChain(config, { chainId: cadena.id })
  const hash = await writeContract(config, { chainId: cadena.id, ...llamada })
  const recibo = await waitForTransactionReceipt(config, { hash })
  if (recibo.status !== 'success') throw new Error('La transacción se revirtió.')
  return recibo
}

// Deja aprobado al contrato para mover `monto` del token de pago, solo si hace falta.
export async function asegurarPermiso(monto) {
  const { address } = getAccount(config)
  const actual = await readContract(config, { address: TOKEN, abi: abiToken, functionName: 'allowance', args: [address, CATEO] })
  if (actual < monto) await enviar({ address: TOKEN, abi: abiToken, functionName: 'approve', args: [CATEO, monto] })
}
