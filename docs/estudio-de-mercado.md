# Estudio de mercado · Cateo

Relevado el 2026-11-13. Cubre qué puede vender un estudio satelital, cuánto cuesta producirlo, cómo se financia la exploración, quién compite y qué tamaño tiene el mercado. El modelo de negocio vive en [modelo-de-negocio.md](modelo-de-negocio.md) y el marco legal en [riesgos-y-legal.md](riesgos-y-legal.md).

Cada cifra lleva año, fuente y una marca de confianza:

- **[V]** verificado: fuente primaria u oficial, o dos fuentes independientes.
- **[F1]** fuente única secundaria (prensa, revendedor, agregador).
- **[E]** estimación propia, con el cálculo a la vista.
- **[INPUT]** falta el dato.

## Qué puede y qué no puede ver un satélite

### Lo que sí ve

Minerales de alteración en superficie, en terreno árido. La Puna es un caso casi ideal porque casi no tiene vegetación.

| Sensor | Resolución | Qué mapea | Evidencia | Estado |
|---|---|---|---|---|
| ASTER | 15 a 90 m | Alteración argílica avanzada (caolinita, alunita), fílica (cuarzo, illita), propilítica (epidoto, clorita, calcita) y silícica | Estudio de 2018 en San Juan, confirmado en campo con espectrómetro SWIR portátil: https://mdpi.com/2072-4292/10/2/203 | [V] |
| ASTER en el NOA | 15 a 90 m | Alteración tipo pórfido de cobre en El Pago, con un grupo similar hacia Agua Rica y Filo Colorado | Relevamiento JICA: https://openjicareport.jica.go.jp/pdf/11717550_01.pdf | [F1] |
| Sentinel-2 | 10 a 20 m | Hierro férrico, hierro ferroso, gossan, laterita, óxidos férricos, hidroxilos y arcillas | Van der Meer et al. 2014, validado contra ASTER en Rodalquilar: https://agris.fao.org/search/es/records/65df94b80f3e94b9e5da0de3 | [V] |
| EMIT (NASA, hiperespectral) | 60 m | 10 minerales: calcita, clorita, dolomita, goethita, yeso, hematita, illita+muscovita, caolinita, montmorillonita, vermiculita, con score de ajuste r² por píxel | Producto L2B: https://www.earthdata.nasa.gov/data/catalog/lpcloud-emitl2bmin-001 | [V] |
| WorldView-3 SWIR | 3,7 m, 8 bandas | Mapeo mineral fino; confunde minerales de rasgos espectrales parecidos | Cuprite: https://www.mdpi.com/2072-4292/5/6/2688 | [V] |
| SAR banda L (ALOS-2, SAOCOM) | variable | Salinidad de salmuera cerca de la superficie y profundidad de la napa en salares | Salar de Pozuelos, 2024: https://doaj.org/article/e219b22a312648efbcb7494dca101738 | [F1] |

### Índices que usa el estudio

| Índice | Fórmula | Qué indica | Fuente | Estado |
|---|---|---|---|---|
| Óxidos férricos (Sentinel-2) | B04 / B02 | Hematita, goethita, gossan | Uso corriente en la disciplina; fórmula exacta sin confirmar en un paper leído | [INPUT] confirmar contra Van der Meer 2014 |
| Hidroxilos y arcillas (Sentinel-2) | B11 / B12 | Arcillas, micas, alteración argílica y fílica | Ídem | [INPUT] confirmar contra Van der Meer 2014 |
| OHI (ASTER) | (b7/b6)·(b4/b6) | Minerales con OH | Ninomiya 2003, vía https://qgis-in-mineral-exploration.readthedocs.io/en/latest/source/remote_sensing/aster_data.html | [F1] |
| KLI (ASTER) | (b4/b5)·(b8/b6) | Caolinita | Ídem | [F1] |
| ALI (ASTER) | (b7/b5)·(b7/b8) | Alunita | Ídem | [F1] |
| CLI (ASTER) | (b6/b8)·(b9/b8) | Calcita | Ídem | [F1] |
| Alunita / caolinita (ASTER) | b4/b5 y b7/b6 | Cocientes simples | Rowan y Mars 2002: https://www.isprs.org/proceedings/XXXV/congress/comm7/papers/15.pdf | [F1] |

Condición de uso: los índices de Sentinel-2 cambian con el clima. Van der Werff et al. (2022) obtuvieron resultados repetibles con ventanas secas de al menos 45 días ([V], https://mdpi.com/2072-4292/14/24/6303). El estudio de Cateo tiene que elegir escena seca y declarar la fecha.

### Lo que no ve

- Solo la capa superior de la superficie (micrómetros a centímetros). Cobertura, vegetación, nieve y barniz del desierto tapan la señal.
- Ninguna ley, tonelaje, profundidad, continuidad ni concentración de litio en salmuera.
- La alteración indica un sistema hidrotermal, que puede ser estéril.
- Para litio en salmuera solo hay indicadores indirectos (paleosalares, estructura, hidrología). El marco BGS/Catapult lo dice textual: la teledetección "cannot penetrate deep into the surface" ([V], https://mdpi.com/2072-4292/14/6/1383).
- La propia NASA advierte que los minerales fuera de los 10 principales de EMIT "require further validation, especially for resource exploration" ([V], https://LPDAAC.USGS.GOV/documents/1659/EMITL2B_ATBD_v1.pdf).

Consecuencia para el producto: el estudio afirma "índices espectrales consistentes con alteración sobre X% del polígono, con esta escena, esta fecha y esta versión del algoritmo". Es un insumo de pre-exploración para elegir dónde muestrear.

## Datos gratuitos por polígono

| Servicio | Acceso | Cuota gratuita | Sirve para Cateo | Estado |
|---|---|---|---|---|
| Element84 Earth Search (COGs en AWS) | Sin clave para S3; búsqueda STAC abierta | Gratis | Sí, es la fuente del MVP. Colección `sentinel-2-c1-l2a`. https://earth-search.aws.element84.com/v1 | [V] para S3, [F1] para STAC |
| Copernicus Data Space (Sentinel Hub Process y Statistical API) | OAuth con cuenta gratuita | 10.000 PU y 10.000 pedidos por mes, 300 por minuto (2026) | Sí, como respaldo. https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Overview/RateLimiting.html | [F1] |
| NASA Earthdata (EMIT, ASTER) | Earthdata Login gratuito | Gratis | Sí, para una segunda capa mineral. EMIT L2B también en AppEEARS desde sept. 2024: https://www.earthdata.nasa.gov/data/alerts-outages/emit-mineral-identification-band-depth-uncertainty-now-available-appeears | [V] |
| Google Earth Engine | Proyecto de Google Cloud | Desde 2026-04-27: 150, 1.000 o 100.000 EECU-h por mes según nivel no comercial | Solo para prototipo. El uso no comercial prohíbe vender el resultado: https://developers.google.com/earth-engine/guides/noncommercial_tiers | [V] |
| Microsoft Planetary Computer | Hub retirado el 2024-06-06 | Sin dato | Descartado; el sucesor es pago. https://github.com/microsoft/PlanetaryComputer/discussions/347 | [V] el retiro, [INPUT] estado del STAC público en 2026 |

Latencia [E]: leer ventanas COG para un polígono de 5 a 100 km² lleva segundos. Sentinel-2 revisita cada 5 días. EMIT cubre de forma oportunista, así que muchos polígonos no tienen escena limpia.

Licencia: los datos Copernicus admiten uso comercial con la atribución "Contains modified Copernicus Sentinel data [año]".

## Tasking comercial y precio por km²

Referencia de escala: una unidad de cateo son 500 ha (5 km²) y un cateo admite hasta 20 unidades, es decir 100 km² ([V], Código de Minería según Ley 24.287: https://www.argentina.gob.ar/normativa/nacional/norma-24287/texto).

| Proveedor | Producto | USD por km² | Pedido mínimo | Costo de un cateo de 100 km² [E] | Fuente y fecha | Estado |
|---|---|---|---|---|---|---|
| Sentinel-2, ASTER, EMIT | Archivo abierto | 0 | No tiene | USD 0 | Ver tabla anterior | [V] |
| Wyvern Dragonette | Hiperespectral 5 m | 1 archivo, 7,50 tasking | 1 km² (SkyWatch), 100 km² (UP42) | USD 100 a 750 | https://skywatch.com/geospatial-data-providers/wyvern/ (jun. 2026) | [F1] |
| Satellogic (origen argentino) | Multiespectral | 4 archivo, 8 tasking, 12 prioritario, 18 urgente | 25 km² (50 vía UP42) | USD 400 a 1.800 | https://satellogic.com/?p=5304 | [F1] |
| Planet Tanager | Hiperespectral | 6 a 9 indicativo | Sin publicar | USD 600 a 900 | https://skywatch.com/geospatial-data-providers/planet/ (jun. 2026) | [F1] |
| Pixxel Firefly | VNIR hiperespectral | 8 tasking | 100 km² vía UP42 | USD 800 | https://docs.pixxel.space/documentation/pricingandrefunds/tasking | [F1] |
| SkyFi | VHR y SHR nuevas | 12 y 30 | 25 km² | USD 1.200 a 3.000 | https://skyfi.com/files/SkyFi_Pricing_2025.pdf (2025, PDF poco legible) | [F1] |
| WorldView-3 SWIR (Vantor/Maxar) | SWIR 3,7 m | 25,50 archivo, 34 nueva | 50 km² | USD 2.550 a 3.400 | https://landinfo.com/wp-content/uploads/Imagery_LandInfo_202601-1.pdf (ene. 2026, lista de revendedor) | [F1] |
| Planet SkySat | Óptico | [INPUT] | 25 km² | [INPUT] | https://docs.planet.com/platform/get-started/access-data/task-imagery/create_orders/ | [V] el mínimo |
| Albedo | Óptico muy alta resolución | [INPUT] | [INPUT] | [INPUT] | Sin fuente | [INPUT] |

Lectura: el nivel base del producto tiene costo de dato cero. Un nivel premium con hiperespectral o SWIR comercial agrega entre USD 100 y 3.400 de costo por cateo, monto chico frente a un primer programa de perforación.

## Financiamiento de exploración

### Global

- Presupuesto global de exploración no ferrosa: **USD 12.400 M en 2025**, 0,6% menos que los USD 12.500 M de 2024 y tercera baja anual seguida. Oro unos USD 6.150 M, cobre unos USD 3.300 M, litio unos USD 595 M ([V], S&P Global: https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/03/world-exploration-trends-2026-what-the-latest-data-says-about-budgets-risk-appetite-and-the-project-pipeline).
- Exploración grassroots: 22% del total (USD 2.790 M) en 2024, mínimo histórico ([F1], https://www.mining.com/budget-allocated-to-grassroots-exploration-at-all-time-low-sp/). En 2025 bajó a 21%, con la exploración en mina en récord de 45% ([F1], resumen de búsqueda del informe S&P de marzo de 2026).
- América Latina conservó la mayor participación regional en 2025 ([V], mismo informe S&P). **El porcentaje exacto no está publicado fuera del informe pago: [INPUT]**.
- Presupuesto de las junior: bajó 13% a USD 4.390 M en 2025. Aun así junior e intermedias levantaron USD 21.430 M en 2025, más del doble que en 2024 ([F1], https://www.cruxinvestor.com/posts/shrinking-discovery-budgets-raise-the-value-of-funded-explorers).
- TSX más TSXV: unos CAD 33.000 M levantados en 2025 (+60%), con las exploradoras tempranas recibiendo el 12% ([F1], misma fuente).
- ASX: las exploradoras levantaron AUD 5.630 M solo en el cuarto trimestre de 2025 ([F1], https://www.bdo.com.au/en-au/news/media-releases/asx-explorers-hit-record-$12bn-reserves-as-sector-roars-back).
- Kitco, 2026-11-06: "funding, not geology, is the bottleneck for most juniors" (https://www.kitco.com/opinion/2026-11-06/why-funding-not-geology-bottleneck-most-juniors).

Instrumentos habituales (conocimiento general del sector, sin fuente releída): colocaciones privadas con warrants, flow-through shares en Canadá, placements en ASX, acuerdos de earn-in con mineras grandes, regalías y streaming.

### Argentina

- Presupuesto de exploración 2024: **USD 493,4 M**, el más alto desde el récord de 2012 ([V], Secretaría de Minería con datos de S&P y prensa: https://eleconomista.com.ar/energia/argentina-alcanza-cifras-record-exploracion-minera-2024-esta-provincia-capto-mas-n80358/amp). CAEM redondea a USD 500 M.
- En 2024 Argentina fue el sexto país del mundo en inversión exploratoria, con un crecimiento de 251% contra 2014 ([F1], Bolsa de Comercio de Rosario: https://www.bcr.com.ar/es/print/pdf/node/110402).
- Por mineral en 2024: cobre USD 200,2 M, litio USD 127 M ([F1], informe oficial https://www.argentina.gob.ar/sites/default/files/presupuestos_exploratorios_2025.pdf; conviene releer el PDF porque los encabezados no dejan clara la correspondencia por año).
- En 2025 el cobre lideró por primera vez el presupuesto exploratorio del país ([F1], CAEM: https://caem.com.ar/storage/2025/08/caem-cobre-escenario-y-potencial-2025.pdf). La exploración de litio bajó.
- Grassroots en Argentina: se triplicó a USD 66 M en 2025 desde USD 18 M en 2024, en gran parte por NGEx en Lunahuasi ([F1], S&P: https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/06/copper-exploration-budgets-hit-12-year-high-but-a-thinning-pipeline-signals-supply-risk).
- **Presupuesto total de exploración de Argentina en 2025: [INPUT]**. No aparece una cifra cerrada en fuentes abiertas al 2026-11-13.
- Cartera nacional: 316 proyectos (oficial, marzo de 2025: https://argentina.gob.ar/sites/default/files/requerimientos_de_infraestructura_para_el_desarrollo_del_sector_minero_2025.pptx.pdf).

Para el RIGI y la lista de proyectos mineros aprobados y en evaluación, ver la investigación de Saltar: [mineria-y-clientes-chilenos-7-11.md](../../../../hackathon-twin/agentes/hackatwin-mixtoC-diseno/docs/investigacion/mineria-y-clientes-chilenos-7-11.md) y [numeros.md](../../../../hackathon-twin/agentes/hackatwin-mixtoC-diseno/docs/investigacion/numeros.md). El RIGI apunta a proyectos grandes y queda fuera del segmento de exploración temprana; pesa como señal de clima y como salida para quien descubre.

### NOA

- Proyectos de litio al 2025-12-04: 57 en total, Salta 33, Catamarca 18, Jujuy 6 ([F1], Chequeado citando a la Secretaría de Minería: https://chequeado.com/el-explicador/litio-en-jujuy-salta-y-catamarca-cuales-son-los-proyectos-mas-importantes-en-esta-region/).
- Catastro minero de Salta: la Secretaría de Minería provincial lo describe como digital, en línea y de acceso público, con consulta del estado registral de cada concesión ([F1], https://elinversorenergetico.com/salta-impulsa-obras-de-infraestructura-para-apuntalar-proyectos-mineros). El dato legal manda en el expediente del Juzgado de Minas ([V], portal nacional: https://www.argentina.gob.ar/node/407406).
- Superficie pedida en Salta: cateos unos 12.973 km², minas unos 25.396 km², canteras 94 km² ([F1], nota sin fecha visible: https://elinversorenergetico.com/salta-recibira-inversiones-mineras-por-700-millones-en-el-ano). A 100 km² por cateo completo eso equivale a un piso de unos 130 cateos [E]; la cantidad real es mayor porque muchos tienen menos unidades.
- **Cantidad de cateos y minas vigentes en Salta: [INPUT]**. Pedirlo a la Secretaría de Minería o al Juzgado de Minas.
- Capa de catastro de la Puna (junio de 2021): https://oat.ambiente.gob.ar/layers/geonode:catastrominero062021_puna
- Tasas en Salta (Ley 8499): 51.500 UT por solicitud de cateo y 51.500 UT por manifestación de descubrimiento ([F1], https://www.consejosalta.org.ar/wp-content/uploads/Ley-N-8499.pdf).

### Cuánto cuesta explorar

| Etapa | Costo | Fuente | Estado |
|---|---|---|---|
| Perforación diamantina, tarifa base | USD 110 a 250 por metro | Blog de proveedor: https://farmonaut.com/?p=122587 | [F1] |
| Programa argentino real, todo incluido | USD 1,088 M por 1.250 m, unos USD 870 por metro | El Quevar: https://www.panorama-minero.com/en/news/el-quevar-project-discovery-of-new-exploration-target-and-commencement-of-summer-drill-program | [F1] |
| Mapeo, muestreo y geofísica terrestre de una propiedad | USD 50.000 a 300.000 | Orden de magnitud propio | [E] |
| Primer programa de 2.000 m | USD 0,6 a 1,5 M | Orden de magnitud propio | [E] |
| Geoquímica y geofísica a precios locales | [INPUT] | Pedir cotización a un laboratorio (ALS, SGS) y a una consultora del NOA | [INPUT] |

## Competencia y comparables

| Actor | Qué hace | Modelo | Plata levantada | Estado a 2026 | Qué nos enseña |
|---|---|---|---|---|---|
| KoBold Metals | IA para targeting de cobre, litio, níquel | Se queda con los activos | USD 537 M Serie C a USD 2.960 M de valuación (ene. 2025) [V] https://techcrunch.com/2025/01/02/kobold-used-ai-to-find-copper-now-investors-are-piling-in-to-the-tune-of-537m | Activo, extensión de fines de 2025 sin verificar | El valor está en tener la tierra |
| Earth AI | Targeting con IA más perforación propia | Descubre y vende el proyecto | USD 20 M Serie B (ene. 2025) [V] https://www.mining.com/?p=1170737 | Activo | Vender estudios queda chico frente a quedarse con el hallazgo |
| Fleet Space (ExoSphere) | Satélites, sensores sísmicos e IA | Servicio a mineras | AUD 150 M Serie D, valuación sobre AUD 800 M (dic. 2024) [V] https://www.satellitetoday.com/finance/2024/12/12/fleet-space-raises-95m-in-series-d-funding-round/ | Activo | El servicio escala con hardware propio y clientes grandes |
| VerAI | Generador de activos con IA | Pide tierra y retiene regalías | USD 12 M Serie A [F1]; E&MJ habla de USD 24 M https://www.e-mj.com/departments/suppliers-report/verai-lands-24m-investment/ | Activo | Mismo patrón: upside sobre la tierra |
| Terra AI | IA para exploración mineral y de reservorios | Software y servicio | USD 20 M Serie A (2026-06-03, Khosla y BHP Ventures) más USD 3,4 M semilla (2023) [V] https://www.canadianminingjournal.com/news/terra-ai-raises-20m-in-push-for-ai-driven-mineral-discovery/ | Activo | Las mineras grandes invierten en la capa de datos |
| SensOre | Targeting con ML | Servicio y proyectos propios | AUD 7,5 M en IPO de ASX (2022) y USD 1,5 M de Alpha Future Funds [F1] https://www.miningnews.net/partners/partner-content/1422570/ai-mining-technology-company-sensore-launches-ipo-funding-round | Escindida de Premier1 Lithium, fecha sin confirmar | El modelo de solo servicio levanta poco |
| Minestarters (Reino Unido) | Financiamiento tokenizado de exploración | Plataforma curada | GBP 3 M comprometidos por Power Metal Resources [F1] https://www.cruxinvestor.com/posts/power-metal-backs-blockchain-revolution-in-mining-finance-with-ps3m-minestarters-investment | Pre-escala; prevé rechazar 90 a 95% de los postulantes | El filtro de proyectos es el producto |
| MINE Network | Financiamiento minero estilo DAO | Token | Unos USD 2 M (2024) [F1], sin URL releída | [INPUT] estado 2026 | Sin verificación de proyectos, queda marginal |
| NatGold | Token de oro sin extraer | 1 token por recurso certificado | 106.800 NATG emitidos (2026) [F1] https://persportaal.anp.nl/artikel/CSN-090726165/natgold-digital-addresses-delay-in-commencement-of-natg-trading-and-completes-tokenization-of-second-us-gold-property | White paper MiCA publicado el 2026-05-07; trading demorado, reportado en MEXC el 2026-07-30 | Poner valor al mineral en el suelo atrae la crítica por NI 43-101 |
| AZX1 de Bridgetower (Avalanche) | Security token del proyecto DOM X de cobre y oro en Arizona | Token con Chainlink Proof of Reserve | Presentado como USD 11.000 M [F1] https://cryptobriefing.com/bridgetower-tokenizes-11b-assets-avalanche/ | Unos USD 10.700 M de RWA "representado" en Avalanche son este único token, que no circula [F1] https://crypto.news/avalanche-lands-11b-bridgetower-deal-rwa-assets-2-1b/ | Comparable más cercano en la misma cadena; una valuación de titular sin liquidez resta credibilidad |
| Atómico3 (Argentina) | Token "por kilo" de litio | PSAV que vendía el token | [INPUT] monto recaudado | Suspendido por la CNV y denunciado penalmente en julio de 2025; amparo rechazado en agosto de 2025; sin sentencia penal hallada en 2026 [V] https://www.cronista.com/finanzas-mercados/cnv-suspende-por-primera-vez-a-una-empresa-cripto-y-la-denuncia-en-la-justicia y https://www.iproup.com/economia-digital/59368-por-que-rechazaron-el-amparo-de-atomico-3-contra-la-cnv | Falló en lo que Cateo atesta: de quién es el permiso y qué hay en el terreno |

Dato en conflicto sobre Atómico3: iProfesional informa una filial argentina "aprobada" y un acuerdo con Hua Lian Mining en junio de 2026 (https://www.iprofesional.com/tecnologia/429664-criptomoneda-litio-atomico-3-abrio-filial-argentina-aprobada-por-gobierno-javier-milei), que no pude conciliar con la suspensión. Queda como [INPUT] hasta ver el registro de PSAV de la CNV.

Otros antecedentes: el crowdfunding de equity para minería (Red Cloud Klondike Strike, Equitise, ExplorationFunder) fue chico y de 2014 a 2016, con un caso documentado de USD 25.000 ([F1], https://www.mining-technology.com/features/featureexplorationfunder-crowdsourcing-natural-resources-mining-investment/). Kinka (oro en bóveda) tiene unos 480 tokens ([F1], https://www.coingecko.com/coins/kinka). Sin verificar: que ALS haya comprado GoldSpot, y los fondos de Exploration.ai.

Patrón: los mejor financiados retienen la tierra y el upside. Los intentos cripto fallaron por falta de procedencia verificable. Ninguno ofrece una verificación neutral y recomputable para terceros, que es el hueco de Cateo.

## DePIN y atestación de ubicación

| Proyecto | Qué hace | Estado a 2026 | Relación con Cateo | Fuente | Estado |
|---|---|---|---|---|---|
| GEODNET | Red de estaciones RTK | Más de 21.000 estaciones y más de USD 7 M de ingresos anualizados (mar. 2026) | Prueba que hay demanda paga de datos geoespaciales on-chain | https://app.blockworksresearch.com/unlocked/geodnet-strengthening-rtk-leadership | [F1] |
| Spexi | Imágenes de dron, DePIN sobre Flow | USD 5,5 M semilla; acuerdos con SkyWatch y Niantic en 2026 | Posible fuente de imagen de alta resolución para el nivel premium | https://blockworks.co/news/drone-imagery-depin-fundraise | [F1] |
| Astral Protocol | Atestaciones de ubicación sobre EAS | Esquema en Celo, Base, Arbitrum y Sepolia; sin Avalanche; repo sin cambios desde 2024-06 | Referencia de esquema para atestar polígonos | https://docs-six-sage.vercel.app/location-protocol/introduction | [F1] |
| EAS | Servicio de atestación | Sin despliegue oficial en Avalanche ni Fuji | Obliga a un contrato propio | https://github.com/ethereum-attestation-service/eas-contracts | [V] |
| EAS desplegado por Integra | EAS v1.4.0 en C-Chain | Despliegue de un tercero, sin verificar on-chain | Opción futura en mainnet | https://integra-documentation.pages.dev/authorization/attestations/eas-integration | [F1] |
| Chainlink CRE | Cómputo off-chain firmado | Soporta Avalanche y Fuji; Chainlink Functions se dio de baja el 2026-09-01 | Camino para reemplazar al firmante único | https://docs.chain.link/cre/supported-networks-ts | [V] CRE, [F1] la baja |
| dClimate, Copernic Space, SpaceChain, SkyTrade | Datos climáticos y espaciales on-chain | [INPUT] | Sin relevar | Sin fuente | [INPUT] |

Infraestructura disponible en Avalanche: USDC nativo en C-Chain y token de prueba en Fuji ([V], https://build.avax.network/integrations/circlepay), facilitadores x402 en mainnet y Fuji ([V], https://build.avax.network/academy/blockchain/x402-payment-infrastructure/04-x402-on-avalanche/03-facilitators), y un mercado RWA distribuido de USD 1.700 a 2.100 M en 2026 ([F1], https://app.rwa.xyz/networks/avalanche).

## Tamaño de mercado TAM, SAM, SOM

Todo este bloque es **estimación propia [E]**. No existe una cifra publicada de mercado de analítica geoespacial específica para minería. La cifra genérica de analítica geoespacial (USD 32.000 a 38.000 M en 2024, https://www.gminsights.com/industry-analysis/geospatial-analytics-market) no sirve para dimensionar este producto.

Supuesto central: entre 2% y 5% del gasto de exploración va a targeting y teledetección. Es un supuesto sin fuente; mover ese porcentaje mueve todo lo demás en proporción.

| Nivel | Cálculo | Resultado |
|---|---|---|
| TAM global | USD 12.400 M (2025, S&P) × 2% a 5% | USD 250 a 600 M por año |
| SAM América Latina | USD 12.400 M × 25% (participación supuesta, la real es [INPUT]) = unos USD 3.000 M; × 2% a 5% | USD 60 a 150 M por año |
| SAM Argentina | USD 493 M (2024) × 2% a 5% | USD 10 a 25 M por año |
| SOM a 2 o 3 años, solo estudios | 30 a 100 estudios pagos por año × USD 500 a 5.000 | USD 15.000 a 500.000 por año |
| SOM con comisión sobre colectas | 3% a 7% de lo levantado vía un socio registrado. Con 5 colectas de USD 200.000 por año: USD 1 M × 3% a 7% | USD 30.000 a 70.000 por año adicionales |

Lectura: vender estudios sueltos da un negocio chico. El ingreso que mueve la aguja es la comisión sobre capital levantado y los contratos con quien hace due diligence (inversores, PSAV, gobiernos provinciales). El detalle de clientes y precios está en [modelo-de-negocio.md](modelo-de-negocio.md).

## Las 5 conclusiones

1. **El dato cuesta cero y la Puna es terreno casi ideal.** Sentinel-2, ASTER y EMIT se piden hoy para cualquier polígono árido. El nivel premium comercial agrega entre USD 100 y 3.400 por cateo de 100 km².
2. **El cuello de botella es el capital.** La exploración temprana recibe el 12% de lo levantado en TSX y TSXV (2025) y el grassroots global está en mínimo histórico (21% en 2025), mientras el grassroots argentino se triplicó a USD 66 M.
3. **El estudio satelital es pre-exploración.** Muestra alteración superficial y sirve para decidir dónde muestrear. Cualquier mención de ley, tonelaje o valor queda fuera del producto, y los casos NatGold y AZX1 muestran el costo de cruzar esa línea.
4. **El hueco del mercado es la procedencia verificable.** Atómico3 cayó porque el permiso estaba a nombre de un tercero y nada se podía comprobar. Una atestación recomputable de polígono, titular declarado y evidencia espectral apunta justo ahí.
5. **Como venta de estudios el mercado es chico; como capa de confianza para levantar capital tiene escala.** Los ganadores bien financiados se quedan con la tierra. Cateo gana si se vuelve el paso de verificación que exigen inversores y plataformas registradas antes de una colecta.

## Pendientes de este documento

- [INPUT] Porcentaje de América Latina en el presupuesto global de exploración 2025 (está en el informe pago de S&P).
- [INPUT] Presupuesto total de exploración de Argentina en 2025.
- [INPUT] Cantidad de cateos y minas vigentes en Salta, y fecha del dato de superficie.
- [INPUT] Fórmulas exactas de los cocientes de Sentinel-2 contra el paper original.
- [INPUT] Precios locales de geoquímica y geofísica.
- [INPUT] Estado registral actual de Atómico3 y monto que recaudó.
- [INPUT] Precio por km² de Planet SkySat y Albedo.
- [INPUT] Estado 2026 de MINE Network, dClimate, Copernic Space, SpaceChain y SkyTrade.
