'use client'
import { useEffect } from 'react'
import { useReadContract, useReadContracts } from 'wagmi'
import { abi, cadena, CATEO } from './cadena'

export const useTitulo = (t) => useEffect(() => { document.title = t }, [t])

const base = { address: CATEO, abi, chainId: cadena.id }
const E = ['solicitante', 'geojson', 'expediente', 'atestado', 'sceneId', 'fechaEscena', 'pctOxidos', 'pctArcillas', 'hashInforme', 'versionAlgoritmo', 'bloquePedido', 'bloqueAtestado']
const C = ['estudioId', 'creador', 'meta', 'vence', 'recaudado', 'retirada']
const objeto = (campos, t, id) => (t ? { id, ...Object.fromEntries(campos.map((k, i) => [k, t[i]])) } : undefined)

function useLista(total, funcion, campos) {
  const n = Number(total.data ?? 0n)
  const r = useReadContracts({
    contracts: Array.from({ length: n }, (_, i) => ({ ...base, functionName: funcion, args: [BigInt(i)] })),
    allowFailure: false,
    query: { enabled: n > 0, refetchInterval: 8000 },
  })
  return {
    lista: (r.data ?? []).map((t, i) => objeto(campos, t, i)).reverse(),
    cargando: !!CATEO && (total.isLoading || (n > 0 && r.isLoading)),
    error: total.error || r.error,
    refetch: () => total.refetch().then(() => r.refetch()),
  }
}

export const useEstudios = () =>
  useLista(useReadContract({ ...base, functionName: 'totalEstudios', query: { enabled: !!CATEO, refetchInterval: 8000 } }), 'estudios', E)
export const useColectas = () =>
  useLista(useReadContract({ ...base, functionName: 'totalColectas', query: { enabled: !!CATEO, refetchInterval: 8000 } }), 'colectas', C)

export function useEstudio(id, refetchInterval) {
  const r = useReadContract({ ...base, functionName: 'estudios', args: [BigInt(id)], query: { enabled: !!CATEO, refetchInterval } })
  return { ...r, estudio: objeto(E, r.data, Number(id)) }
}
export function useColecta(id) {
  const r = useReadContract({ ...base, functionName: 'colectas', args: [BigInt(id)], query: { enabled: !!CATEO, refetchInterval: 6000 } })
  return { ...r, colecta: objeto(C, r.data, Number(id)) }
}

export function estadoColecta(c, ahora = Date.now() / 1000) {
  if (c.retirada) return { clave: 'retirada', texto: 'Retirada por quien la abrió' }
  if (c.recaudado >= c.meta) return { clave: 'alcanzada', texto: 'Meta alcanzada' }
  if (ahora >= Number(c.vence)) return { clave: 'vencida', texto: 'Vencida' }
  return { clave: 'abierta', texto: 'Abierta' }
}
