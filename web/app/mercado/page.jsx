// Cifras del estudio de mercado (docs/estudio-de-mercado.md), auditadas contra su fuente el 2026-11-13.
// V = verificado en fuente primaria o dos fuentes; F = fuente única; E = estimación propia.
export const metadata = { title: 'Mercado · Cateo' }

const SP = 'https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/03/world-exploration-trends-2026-what-the-latest-data-says-about-budgets-risk-appetite-and-the-project-pipeline'
const CRUX = 'https://www.cruxinvestor.com/posts/shrinking-discovery-budgets-raise-the-value-of-funded-explorers'
const SECMIN = 'https://www.argentina.gob.ar/sites/default/files/presupuestos_exploratorios_2025.pdf'
const SKYWATCH = 'https://skywatch.com/geospatial-data-providers/wyvern/'

const BLOQUES = [
  {
    titulo: 'Exploración en el mundo',
    nota: 'El capital para la etapa temprana es el cuello de botella.',
    filas: [
      ['USD 12.400 M', 'Presupuesto global de exploración no ferrosa. Tercera baja anual seguida (−0,6%).', '2025', 'S&P Global', SP, 'V'],
      ['USD 6.150 M', 'De ese total, oro.', '2025', 'S&P Global', SP, 'V'],
      ['USD 3.300 M', 'Cobre.', '2025', 'S&P Global', SP, 'V'],
      ['USD 595 M', 'Litio.', '2025', 'S&P Global', SP, 'V'],
      ['21%', 'Parte del presupuesto que va a exploración temprana. Mínimo histórico.', '2025', 'Crux Investor', CRUX, 'F'],
      ['22% · USD 2.790 M', 'El mismo dato un año antes.', '2024', 'Mining.com con datos de S&P', 'https://www.mining.com/budget-allocated-to-grassroots-exploration-at-all-time-low-sp/', 'F'],
      ['USD 4.390 M', 'Presupuesto de las junior, 13% menos que en 2024.', '2025', 'Crux Investor', CRUX, 'F'],
      ['USD 21.430 M', 'Capital levantado por junior e intermedias, 109% más que en 2024.', '2025', 'Crux Investor', CRUX, 'F'],
      ['12%', 'De lo levantado en TSX y TSXV, lo que llegó a exploradoras tempranas. En 2020 era 31%.', '2025', 'Fastmarkets', 'https://www.fastmarkets.com/insights/critical-minerals-boom-boosts-growth-stage-juniors-hotter-commodities/', 'F'],
      ['AUD 5.630 M', 'Levantado por exploradoras en ASX en un solo trimestre (4T).', '2025', 'BDO', 'https://www.bdo.com.au/en-au/news/media-releases/asx-explorers-hit-record-$12bn-reserves-as-sector-roars-back', 'F'],
    ],
  },
  {
    titulo: 'Argentina',
    nota: 'Sexto país del mundo en inversión exploratoria en 2024.',
    filas: [
      ['USD 493,4 M', 'Presupuesto de exploración. El más alto desde el récord de 2012.', '2024', 'Secretaría de Minería', 'https://eleconomista.com.ar/energia/argentina-alcanza-cifras-record-exploracion-minera-2024-esta-provincia-capto-mas-n80358/amp', 'V'],
      ['+251%', 'Crecimiento de la inversión exploratoria contra 2014.', '2024', 'Bolsa de Comercio de Rosario', 'https://www.bcr.com.ar/es/print/pdf/node/110402', 'F'],
      ['USD 200,2 M', 'Exploración de cobre.', '2024', 'Secretaría de Minería', SECMIN, 'V'],
      ['USD 135,8 M', 'Exploración de oro.', '2024', 'Secretaría de Minería', SECMIN, 'V'],
      ['USD 127 M', 'Exploración de litio.', '2024', 'Secretaría de Minería', SECMIN, 'V'],
      ['USD 18 M → 66 M', 'Exploración temprana de cobre: se triplicó en un año.', '2024 a 2025', 'S&P Global', 'https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/06/copper-exploration-budgets-hit-12-year-high-but-a-thinning-pipeline-signals-supply-risk', 'F'],
    ],
  },
  {
    titulo: 'NOA y permisos',
    nota: 'Dónde está el primer cliente.',
    filas: [
      ['57', 'Proyectos de litio: Salta 33, Catamarca 18, Jujuy 6.', '4/12/2025', 'Chequeado, con datos de la Secretaría de Minería', 'https://chequeado.com/el-explicador/litio-en-jujuy-salta-y-catamarca-cuales-son-los-proyectos-mas-importantes-en-esta-region/', 'F'],
      ['12.973 km²', 'Superficie pedida en cateos en Salta. Minas: 25.396 km².', 'sin fecha', 'El Inversor Energético', 'https://elinversorenergetico.com/salta-recibira-inversiones-mineras-por-700-millones-en-el-ano', 'F'],
      ['500 ha', 'Una unidad de cateo. Un permiso admite hasta 20 unidades: 100 km².', 'Ley 24.498 (1995)', 'Código de Minería', 'https://www.argentina.gob.ar/normativa/nacional/norma-24287/texto', 'V'],
      ['3.000 UVA', 'Tope por emisión para un inversor minorista en financiamiento colectivo. Acumulado: 10.000 UVA.', 'RG 1125, abril 2026', 'CNV', 'https://www.marval.com/Publicacion/autorizacion-automatica-para-el-financiamiento-colectivo-17580?lang=es', 'V'],
      ['31/12/2027', 'Hasta cuándo rige el sandbox de tokenización de la CNV.', 'RG 1150, junio 2026', 'CNV', 'https://www.marval.com/Publicacion/la-cnv-amplia-el-regimen-de-tokenizacion-17602', 'V'],
    ],
  },
  {
    titulo: 'Cuánto cuesta el dato',
    nota: 'Precio de imagen por km² y costo para un cateo completo de 100 km².',
    filas: [
      ['USD 0', 'Sentinel-2, ASTER y EMIT: archivo abierto. Es lo que usa Cateo hoy.', '2026', 'Earth Search', 'https://earth-search.aws.element84.com/v1', 'V'],
      ['USD 7,50 / km²', 'Wyvern, hiperespectral de 5 m, imagen nueva. Cateo de 100 km²: USD 750.', 'junio 2026', 'SkyWatch', SKYWATCH, 'F'],
      ['USD 8 / km²', 'Satellogic, imagen nueva. Cateo de 100 km²: USD 800.', 'enero 2023', 'Satellogic', 'https://satellogic.com/?p=5304', 'F'],
      ['USD 8 / km²', 'Pixxel, hiperespectral, imagen nueva. Cateo de 100 km²: USD 800.', '2026', 'Pixxel', 'https://docs.pixxel.space/documentation/pricingandrefunds/tasking', 'F'],
      ['USD 34 / km²', 'WorldView-3 SWIR de 3,7 m, imagen nueva. Cateo de 100 km²: USD 3.400.', 'enero 2026', 'LandInfo (revendedor)', 'https://landinfo.com/wp-content/uploads/Imagery_LandInfo_202601-1.pdf', 'F'],
      ['USD 110 a 250 / m', 'Para comparar: perforación diamantina, tarifa base.', '2025', 'Farmonaut', 'https://farmonaut.com/?p=122587', 'F'],
    ],
  },
  {
    titulo: 'Quién más está',
    nota: 'Los mejor financiados se quedan con la tierra. Los intentos cripto cayeron por falta de procedencia.',
    filas: [
      ['USD 537 M', 'KoBold Metals, Serie C, a USD 2.960 M de valuación. Explora con IA y retiene los activos.', 'enero 2025', 'TechCrunch', 'https://techcrunch.com/2025/01/02/kobold-used-ai-to-find-copper-now-investors-are-piling-in-to-the-tune-of-537m', 'V'],
      ['AUD 150 M', 'Fleet Space, Serie D, sobre AUD 800 M de valuación. Satélites y sensores para mineras.', 'diciembre 2024', 'Via Satellite', 'https://www.satellitetoday.com/finance/2024/12/12/fleet-space-raises-95m-in-series-d-funding-round/', 'V'],
      ['USD 20 M', 'Terra AI, Serie A, con Khosla y BHP Ventures.', 'junio 2026', 'Canadian Mining Journal', 'https://www.canadianminingjournal.com/news/terra-ai-raises-20m-in-push-for-ai-driven-mineral-discovery/', 'V'],
      ['USD 20 M', 'Earth AI, Serie B. Descubre, perfora y vende el proyecto.', 'enero 2025', 'Mining.com', 'https://www.mining.com/?p=1170737', 'V'],
      ['GBP 3 M', 'Minestarters: financiamiento tokenizado de exploración. Prevé rechazar 90 a 95% de los proyectos.', '2025', 'Crux Investor', 'https://www.cruxinvestor.com/posts/power-metal-backs-blockchain-revolution-in-mining-finance-with-ps3m-minestarters-investment', 'F'],
      ['USD 11.000 M', 'AZX1 en Avalanche: token de un proyecto de cobre y oro. Es un solo token que no circula.', 'julio 2026', 'Crypto Briefing', 'https://cryptobriefing.com/bridgetower-tokenizes-11b-assets-avalanche/', 'F'],
      ['14/07/2025', 'La CNV suspende y denuncia a Atómico 3, token de litio con el permiso a nombre de un tercero.', '2025', 'El Cronista', 'https://www.cronista.com/finanzas-mercados/cnv-suspende-por-primera-vez-a-una-empresa-cripto-y-la-denuncia-en-la-justicia', 'V'],
    ],
  },
  {
    titulo: 'Tamaño de mercado',
    nota: 'Estimación propia. Supuesto sin fuente: 2% a 5% del gasto de exploración va a targeting y teledetección.',
    filas: [
      ['USD 250 a 600 M', 'Mundo, por año: USD 12.400 M × 2% a 5%.', '2025', 'Cálculo propio', null, 'E'],
      ['USD 10 a 25 M', 'Argentina, por año: USD 493 M × 2% a 5%.', '2024', 'Cálculo propio', null, 'E'],
      ['USD 300', 'Precio propuesto por estudio base. Sin validar con entrevistas.', '2026', 'Modelo de negocio', null, 'E'],
      ['USD 9.000 a 30.000', 'Ingreso anual alcanzable solo con estudios: 30 a 100 estudios.', 'a 3 años', 'Cálculo propio', null, 'E'],
      ['USD 22.500 a 52.500', 'Adicional por comisión de 3% a 7% sobre 5 colectas de USD 150.000, vía un socio registrado.', 'a 3 años', 'Cálculo propio', null, 'E'],
    ],
  },
]
const CONFIANZA = { V: 'Verificado', F: 'Fuente única', E: 'Estimación' }

export default function Mercado() {
  return (
    <div className="pagina">
      <section className="portada">
        <h1>El mercado, en números.</h1>
        <p className="bajada">Cada cifra con su año, su fuente y qué tan firme es. Relevado y auditado el 13 de noviembre de 2026.</p>
        <p className="claves">
          <span className="conf V">Verificado</span> fuente primaria o dos fuentes.
          <span className="conf F">Fuente única</span> prensa o revendedor.
          <span className="conf E">Estimación</span> cálculo propio.
        </p>
      </section>
      {BLOQUES.map((b) => (
        <section className="bloque" key={b.titulo}>
          <header>
            <h2>{b.titulo}</h2>
            <p className="secundario">{b.nota}</p>
          </header>
          <ul className="cifras">
            {b.filas.map(([cifra, que, cuando, fuente, url, conf], i) => (
              <li key={i}>
                <span className="cifra">{cifra}</span>
                <span className="que">{que}</span>
                <span className="origen">
                  {cuando} · {url ? <a href={url} target="_blank" rel="noreferrer">{fuente}</a> : fuente}
                  <span className={`conf ${conf}`}>{CONFIANZA[conf]}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="nota" style={{ marginTop: 'var(--e6)' }}>
        Estudio completo, con lo que falta confirmar, en el <a href="https://github.com/francoperez03/cateo/blob/main/docs/estudio-de-mercado.md" target="_blank" rel="noreferrer">repositorio</a>.
      </p>
    </div>
  )
}
