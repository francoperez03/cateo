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
    'Estudios de superficie con Sentinel-2, atestados en Avalanche y recomputables. Respaldan colectas de exploración en custodia.',
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
              Red de prueba Avalanche Fuji, activos simulados. Sin oferta de inversión ni estimación de recursos minerales.
            </p>
            <p>Contains modified Copernicus Sentinel data, vía Earth Search. Fondo: Sentinel-2 cloudless por EOX.</p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
