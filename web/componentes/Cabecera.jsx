'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { cadena } from '@/lib/cadena'
import { corta } from '@/lib/formato'

export default function Cabecera() {
  const { address, chainId, isConnected } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const [listo, setListo] = useState(false)
  useEffect(() => setListo(true), [])
  const sinWallet = listo && typeof window !== 'undefined' && !window.ethereum

  return (
    <header className="cabecera">
      <Link href="/" className="marca" aria-label="Cateo, inicio">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <path d="M3 5.5 13 3l6 6.5-3.5 9L5 16.5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="11" cy="11" r="1.8" fill="currentColor" />
        </svg>
        Cateo
      </Link>
      <nav aria-label="Principal">
        <Link href="/#estudios">Estudios</Link>
        <Link href="/#colectas">Colectas</Link>
        <Link href="/estudio/nuevo">Pedir estudio</Link>
      </nav>
      <div className="wallet">
        {!listo ? null : isConnected && chainId !== cadena.id ? (
          <button className="boton aviso" onClick={() => switchChain({ chainId: cadena.id })}>Cambiar a {cadena.name}</button>
        ) : isConnected ? (
          <button className="boton fantasma dato" onClick={() => disconnect()} aria-label={`Desconectar ${corta(address)}`}>{corta(address)} · Salir</button>
        ) : sinWallet ? (
          <a className="boton fantasma" href="https://core.app" target="_blank" rel="noreferrer">Instalar Core Wallet</a>
        ) : (
          <button className="boton fantasma" disabled={isPending} onClick={() => connect({ connector: connectors[0], chainId: cadena.id })}>
            {isPending ? 'Conectando…' : 'Conectar wallet'}
          </button>
        )}
        {error && !isConnected ? <span className="nota-error" role="alert">No se pudo conectar. Abrí la wallet y aceptá.</span> : null}
      </div>
    </header>
  )
}
