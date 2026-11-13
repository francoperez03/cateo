import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from 'next/font/google'
import Cabecera from '@/componentes/Cabecera'
import Providers from './providers'
import './globals.css'

const titulo = Source_Serif_4({ subsets: ['latin'], variable: '--f-titulo', display: 'swap' })
const cuerpo = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-cuerpo', display: 'swap' })
const dato = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-dato', display: 'swap' })

export const metadata = {
  title: 'Cateo · estudios satelitales atestados en Avalanche',
  description:
    'Índices espectrales de superficie con Sentinel-2 sobre un área, firmados en Avalanche y recomputables por cualquiera. Respaldan colectas de exploración en escrow.',
}

export default function Layout({ children }) {
  return (
    <html lang="es" className={`${titulo.variable} ${cuerpo.variable} ${dato.variable}`}>
      <body>
        <a className="saltar" href="#contenido">Ir al contenido</a>
        <Providers>
          <Cabecera />
          <main id="contenido">{children}</main>
          <footer className="pie">
            <p>
              Cateo corre en Avalanche Fuji (red de prueba) con activos simulados. Nada de lo que se ve acá es una oferta de
              inversión ni una estimación de recursos minerales.
            </p>
            <p>Imágenes: Contains modified Copernicus Sentinel data, vía Earth Search (Element 84). Fondo: Sentinel-2 cloudless por EOX.</p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
