# Cateo · modelo de negocio

Actualizado: 2026-11-13. El tamaño de mercado, la competencia y el marco legal viven en `estudio-de-mercado.md` y `riesgos-y-legal.md`; acá solo se linkea.

Etiquetas de cada cifra:
- **[V]** verificado en fuente oficial o en dos fuentes independientes.
- **[F]** fuente única (prensa, revendedor, blog de proveedor).
- **[E]** estimación propia, con el cálculo a la vista.
- **[INPUT]** falta el dato.

Límites que todo precio y todo copy respetan: el satélite ve alteración superficial (óxidos de hierro, arcillas). Nunca ley, tonelaje, valor ni litio en salmuera. La colecta del MVP usa activos simulados en Fuji. Una colecta real corre por un PFC o PSAV registrado en CNV.

## Qué se vende

Un estudio espectral reproducible sobre un polígono, con atestación en Avalanche de tres cosas: qué área se estudió, con qué escena y algoritmo, y qué mostró la superficie. Cualquiera puede recomputarlo desde la cadena. Sobre esa atestación, el titular puede abrir una colecta de exploración en escrow.

## Clientes

| Cliente | Dolor | Alternativa actual y cuánto paga | Disposición a pagar | Ciclo de venta | Estado de la evidencia |
|---|---|---|---|---|---|
| Titular de pedimento o pequeño minero | Tiene el cateo y ningún material creíble para mostrarle a un socio o inversor | Informe de un geólogo conocido o nada. Precio local de un informe de teledetección: [INPUT] | USD 100 a 500 por estudio [E] | Días, venta directa o por referido | Sin entrevistas. Hipótesis |
| Junior de exploración | Levantar capital temprano: los exploradores en etapa inicial recibieron el 12% de lo colocado en TSX y TSXV en 2025 [F] | Consultora o plataforma de teledetección. TerraEye cobra por puntos: Sentinel-2 1 punto por km², EMIT 5, mapa de prospectividad 400 (2024), sin conversión pública a USD [F]. Geólogo senior: USD 1.000 por día en una propuesta de 2024 para trabajo de campo en Salta [F] | USD 1.000 a 10.000 por un estudio de escritorio [E] | Semanas, un decisor técnico | Sin entrevistas. Hipótesis |
| Inversor o PSAV haciendo due diligence | Verificar de forma independiente que el polígono existe, muestra lo que dicen y es de quien dice serlo (caso Atómico 3, 2025) | Due diligence legal y técnica a medida. Precio: [INPUT] | La más alta por estudio: USD 500 a 5.000, más suscripción [E] | Semanas a meses, exige revisión legal | Sin entrevistas. Hipótesis más fuerte |
| Gobierno provincial (REMSA en Salta, JEMSE en Jujuy, CAMYEN en Catamarca) | Poner en valor áreas propias para licitarlas. CAMYEN tuvo dos llamados desiertos (Gold Nugget y Filo de las Vicuñas) [F] | Relevamientos propios y consultoría por licitación. Hay licitaciones de consultoría geológico-minera en Argentina con presupuestos del orden de USD 100.000 [F] | USD 20.000 a 50.000 por contrato de capa de prospectividad sobre un paquete de áreas [E] | 6 a 12 meses, compra pública | Sin contacto. Hipótesis |

Fuentes de la tabla:
- 12% etapa inicial en TSX y TSXV, 2025 (Fastmarkets, 2026-04-30): https://www.fastmarkets.com/insights/critical-minerals-boom-boosts-growth-stage-juniors-hotter-commodities/
- Puntos de TerraEye, 2024: https://terraeye.blogspot.com/2024/11/terraeyes-points-based-system-powering.html
- Geólogo senior a USD 1.000 por día, propuesta a PPSA para un curso de campo en Salta, 2024 (es docencia de campo, sirve solo como orden de magnitud): https://www.presalpetroleo.gov.br/wp-content/uploads/2024/12/3-PROPUESTA_CT-PPSA-034-2024-Curso-Geologico-de-campo_TL.pdf
- Licitación de consultoría geológico-minera con presupuesto de USD 100.000: https://www.developmentaid.org/tenders/view/1723016/estandarizacion-internacional-del-reporte-de-recursos-y-reservas-mineras-en-argentina-hoja-de-ruta-i
- CAMYEN, plan 2026 y llamados desiertos, 2026: https://www.elancasti.com.ar/politica-y-economia/camyen-proyecta-ampliar-exploraciones-y-atraer-inversiones-2026-n602346
- Atómico 3: ver `riesgos-y-legal.md`.

Qué no apareció en la búsqueda del 2026-11-13: ninguna tarifa publicada de consultoras por un estudio de teledetección o un informe de targets en Argentina o LatAm. Queda como [INPUT] y es la primera pregunta de las entrevistas.

Orden de ataque recomendado: primero el inversor o PSAV (paga más por estudio y su necesidad es la verificación: la atestación cubre hoy el área y el dato, y la titularidad recién con la etapa 3 de la hoja de ruta), después juniors, después gobierno. El pequeño minero es el caso de uso del relato y de la demo, con el riesgo de fraude más alto y la menor capacidad de pago.

## Precios

Todos los precios son propuesta inicial [E], a validar con las entrevistas.

| Plan | Qué incluye | Precio | Estado |
|---|---|---|---|
| Estudio base | Sentinel-2 (gratuito), índices de óxidos férricos y de arcillas, mapa de calor, atestación on-chain, recómputo público. Hasta 100 km² | USD 300 por estudio, mínimo USD 100 hasta 10 km² | por validar |
| Estudio premium | Lo anterior más imagen comercial por encargo (SWIR o hiperespectral), a costo más 30% | Costo de imagen × 1,30 + USD 300 | por validar |
| Monitoreo | Re-estudio automático del mismo polígono en cada ventana seca, con atestación nueva | USD 50 por mes por polígono | por validar |
| Colecta | Comisión sobre lo recaudado, cobrada solo a través de un socio PFC o PSAV registrado en CNV | 3% a 7% de la colecta, repartido con el socio | fuera del MVP |

El precio que cobra el contrato en Fuji: [INPUT] (constante del despliegue; se alinea con el estudio base).

### Ejemplo · un cateo completo de 100 km²

Un cateo tiene hasta 20 unidades de 500 ha, o sea 100 km² [V]: https://www.argentina.gob.ar/normativa/nacional/norma-24287/texto

| Concepto | Cálculo | Monto |
|---|---|---|
| Estudio base | precio fijo | USD 300 |
| Premium con Wyvern (hiperespectral 5 m, encargo) | 100 km² × USD 7,50 = USD 750 de imagen; × 1,30 = USD 975; + USD 300 | USD 1.275 |
| Premium con WorldView-3 SWIR (imagen nueva) | 100 km² × USD 34 = USD 3.400 de imagen; × 1,30 = USD 4.420; + USD 300 | USD 4.720 |
| Monitoreo un año | 12 × USD 50 | USD 600 |
| Colecta de USD 150.000 al 5% | USD 7.500, de los cuales la mitad queda para Cateo si el reparto con el socio es 50/50 | USD 3.750 |

Supuestos del ejemplo:
- Wyvern a USD 7,50 por km² en encargo, junio de 2026 [F]: https://skywatch.com/geospatial-data-providers/wyvern/
- WorldView-3 SWIR a USD 34 por km² en imagen nueva, enero de 2026, lista de un revendedor, con mínimo de 50 km² [F]: https://landinfo.com/wp-content/uploads/Imagery_LandInfo_202601-1.pdf
- Colecta de USD 150.000: punto medio de un programa inicial de mapeo, muestreo y geofísica de superficie, estimado entre USD 50.000 y 300.000 [E]. Los precios locales de esas tareas son [INPUT].
- Reparto 50/50 con el socio registrado: [E], depende del acuerdo.

## Economía unitaria · estudio base

| Costo | Cálculo | Monto |
|---|---|---|
| Imágenes | Sentinel-2 L2A abierto, vía Earth Search sobre AWS, sin clave | USD 0 [V] |
| Cómputo | 100 km² en la grilla de 20 m que usa `estudio.mjs` son 250.000 píxeles por banda, cuatro bandas más la máscara SCL. Segundos de CPU en una función serverless | menos de USD 0,01 [E] |
| Gas en Avalanche | Dos transacciones (pedido con el GeoJSON en el evento, y atestación), unas 300.000 unidades de gas [E]. Con la base mínima de 5 nAVAX vigente desde fines de septiembre de 2026 [V]: 300.000 × 5 nAVAX = 0,0015 AVAX | menos de USD 0,15 con AVAX por debajo de USD 100. Precio de AVAX: [INPUT] |
| Total variable | | menos de USD 0,20 |

Fuentes:
- Earth Search, colección `sentinel-2-c1-l2a`: https://earth-search.aws.element84.com/v1
- Base mínima de 5 nAVAX tras la actualización Helicon (22/9/2026): https://docs.avax.network/docs/rpcs/other/guides/txn-fees
- Referencia previa a Helicon: transferencia ERC-20 promedio en C-Chain a USD 0,000649, enero a agosto de 2026 [F]: https://www.tokenpost.kr/news/blockchain/433608

Lectura: el margen bruto del estudio base supera el 99%. El costo real está en las personas: soporte, venta y, cuando el estudio se le muestra a inversores, la firma de un geólogo matriculado. Con la referencia de USD 1.000 por día [F], medio día de revisión agrega unos USD 500 por estudio y se cobra aparte como "revisión profesional". Tarifa local real: [INPUT].

En el premium, el margen es el 30% sobre la imagen. El riesgo es el mínimo de compra del proveedor (25 a 100 km² según el satélite), que se traslada al cliente.

## Proyección a 3 años · estimación

Todo este bloque es [E]. Sirve para ver órdenes de magnitud y qué línea pesa.

Supuestos:
- Universo: 316 proyectos mineros en la cartera nacional ([INPUT] confirmar: la cifra no aparece en el texto del PDF citado, fechado en febrero de 2025) y 57 proyectos de litio en Salta, Catamarca y Jujuy (diciembre de 2025) [F]. Cantidad de cateos activos en Salta: [INPUT].
- Precios de la tabla de arriba, sin cambios.
- Margen premium promedio de USD 1.000 por estudio (mezcla de Wyvern y WorldView-3).
- Colecta promedio de USD 150.000, comisión del 5%, la mitad para Cateo.
- Ninguna colecta real antes de tener socio registrado (año 2).
- Contrato provincial promedio de USD 30.000 a 40.000.

| Línea | Año 1 | Año 2 | Año 3 |
|---|---|---|---|
| Estudios base | 30 × 300 = 9.000 | 100 × 300 = 30.000 | 250 × 300 = 75.000 |
| Estudios premium (margen) | 3 × 1.000 = 3.000 | 15 × 1.000 = 15.000 | 40 × 1.000 = 40.000 |
| Monitoreo | 0 | 20 polígonos × 600 = 12.000 | 80 × 600 = 48.000 |
| Comisión de colectas | 0 | 2 × 3.750 = 7.500 | 8 × 3.750 = 30.000 |
| Contratos provinciales | 0 | 1 × 30.000 = 30.000 | 2 × 40.000 = 80.000 |
| **Ingresos (USD)** | **12.000** | **94.500** | **273.000** |

Lo que la tabla muestra:
- Los estudios sueltos al pequeño minero no sostienen un equipo. El año 1 es validación.
- En el año 3, más de la mitad del ingreso viene de tres líneas que dependen de terceros: gobierno, monitoreo para PSAV e inversores, y colectas vía socio.
- Costos no modelados: equipo, legal (acuerdo con PFC o PSAV), auditoría del contrato antes de mainnet. [INPUT]

Fuentes del universo:
- 316 proyectos: https://argentina.gob.ar/sites/default/files/requerimientos_de_infraestructura_para_el_desarrollo_del_sector_minero_2025.pptx.pdf
- 57 proyectos de litio: https://chequeado.com/el-explicador/litio-en-jujuy-salta-y-catamarca-cuales-son-los-proyectos-mas-importantes-en-esta-region/

## Llegada al mercado en el NOA

| Canal | Para qué cliente | Dato | Estado |
|---|---|---|---|
| Cámara de Minería de Salta | Juniors y titulares | Participó de la apertura de Argentina Mining Norte 2026. Cantidad de socios: [INPUT] | por contactar |
| Cámaras de proveedores: CAPEMISA (Salta), CAPROSEMITP (Puna), CaFeProMi (federal, lanzada en Salta en 2026) | Entrar como proveedor de servicios | [F] | por contactar |
| Consultoras geológicas locales | Revenden el estudio y aportan la firma profesional | Lista: [INPUT] | por contactar |
| Secretaría de Minería de Salta y Juzgado de Minas | Acceso al catastro minero para el cruce de titularidad | Ver `riesgos-y-legal.md` | por contactar |
| REMSA | Gobierno | Anunció dos áreas nuevas de exploración (litio y polimetálicos) el 27/4/2026 y una convocatoria para áreas de cobre. Pliegos en remsa.gob.ar/licitaciones [F] | por contactar |
| JEMSE | Gobierno | Licitación de siete propiedades de litio en unas 11.000 ha, pliego a USD 55.000 [F] | por contactar |
| CAMYEN | Gobierno | Licitación de exploración con opción a explotar, apertura 17/10/2025; plan 2026 de puesta en valor de áreas [F] | por contactar |
| Eventos: Argentina Mining Norte (2 al 4 de septiembre de 2026, Centro de Convenciones de Salta) | Todos | Más de 3.500 asistentes según una nota y más de 9.000 proyectados según otra, 69 conferencias [F] | próxima edición: [INPUT] |
| Contactos de Argentina Space 2026 | Ángulo satelital | Dossiers en `../../../dossiers/` | por contactar |

Fuentes:
- Argentina Mining Norte 2026: https://eleconomista.com.ar/energia/la-mineria-pone-foco-salta-mas-9000-participantes-una-agenda-dominada-litio-cobre-n97852 y https://www.ambito.com/energia/la-mineria-pone-el-foco-salta-llega-la-mayor-cumbre-negocios-del-sector-n6297051
- CaFeProMi: https://www.elancasti.com.ar/politica-y-economia/catamarca-asume-la-primera-presidencia-la-camara-federal-proveedores-mineros-n562419
- Proveedores de la Puna: https://eleconomista.com.ar/energia/litio-proveedores-dolares-caem-pide-boom-minero-derrame-mas-alla-norte-n98720
- REMSA, áreas del 27/4/2026 (aviso de Cancillería; confirmar en el sitio de REMSA): https://chous.cancilleria.gob.ar/es/node/81044 y https://mase.lmneuquen.com/mineria/salta-acelera-la-carrera-el-cobre-n1171374
- JEMSE: https://econojournal.com.ar/mineria/jujuy-lanza-una-nueva-licitacion-para-explorar-litio-en-un-area-de-11-000-hectareas/
- CAMYEN, licitación 2025: https://www.bakermckenzie.com/en/insight/publications/alerts/2025/09/argentina-catamarca-opens-public-tender-for-exploration

## Validación · 5 entrevistas

Objetivo: confirmar quién paga y cuánto antes de construir más. Una entrevista por perfil, y la quinta repite el perfil que mejor responda.

| # | Perfil | Quién | Fecha | Estado |
|---|---|---|---|---|
| 1 | Titular de cateo en Salta | [INPUT] | [INPUT] | por agendar |
| 2 | Geólogo de una junior con proyecto en la Puna | [INPUT] | [INPUT] | por agendar |
| 3 | Consultora geológica local | [INPUT] | [INPUT] | por agendar |
| 4 | PSAV o plataforma de financiamiento colectivo registrada en CNV | [INPUT] | [INPUT] | por agendar |
| 5 | REMSA o Secretaría de Minería de Salta | [INPUT] | [INPUT] | por agendar |

Guion (30 minutos, sin mostrar el producto hasta la pregunta 7):
1. Contame la última vez que tuviste que convencer a alguien de poner plata en un área, o que decidir si ponerla. ¿Qué material había sobre la mesa?
2. ¿Qué parte de ese material hizo dudar a la otra parte?
3. ¿Usaste alguna vez un estudio de teledetección? ¿Quién lo hizo, cuánto tardó y cuánto costó?
4. ¿Cómo comprobás hoy que el área es de quien dice ser el titular? ¿Cuánto tiempo lleva?
5. ¿Cuánto cuesta el primer programa de campo en un área nueva (muestreo, geofísica)? ¿De dónde sale esa plata?
6. ¿Qué tendría que decir un informe satelital para que le creas? ¿Quién tendría que firmarlo?
7. (Mostrar un estudio atestado.) ¿Qué harías con esto mañana? ¿A quién se lo mandarías?
8. Si costara USD 300, ¿lo pedirías esta semana? ¿Y a USD 1.000 con la firma de un geólogo?
9. ¿Pondrías o recibirías plata a través de una colecta en escrow con reembolso? ¿Qué te frenaría?
10. ¿A quién más debería hablarle?

Resultados: [INPUT]

Criterio para seguir: al menos dos de cinco piden un estudio sobre un área propia y nombran un precio que estarían dispuestos a pagar.

## Por qué blockchain

Las cuatro preguntas del track:

1. **Quién desconfía de quién.** El inversor desconfía de lo que cuenta el titular del área, y el titular no tiene cómo probar que el estudio es el mismo que recibió.
2. **Qué evento on-chain se dispara.** La atestación del estudio habilita la creación de la colecta. Sin atestación, el contrato rechaza la colecta. Los aportes quedan en escrow.
3. **Qué pasa si el dato miente.** El polígono, el identificador de la escena, la versión del algoritmo y el hash del informe son públicos. Cualquiera corre `verificar` y compara. Si la colecta vence sin llegar a la meta, cada aportante recupera lo suyo.
4. **Quién paga y quién cobra.** El titular paga el estudio. Los aportantes fondean la colecta. La plataforma cobra el estudio y, en producción, una comisión compartida con el socio registrado.

Lo que la atestación prueba: quién firmó qué resultado, cuándo y sobre qué datos. La geología la prueba el trabajo de campo posterior.

## Por qué Avalanche

- USDC nativo en C-Chain y USDC de prueba en Fuji [V]: https://build.avax.network/integrations/circlepay
- Costo por estudio despreciable (ver economía unitaria).
- Chainlink CRE disponible en Fuji y en mainnet, camino directo para reemplazar al firmante único [V]: https://docs.chain.link/cre/supported-networks-ts
- Facilitadores x402 en mainnet y Fuji para el pago por estudio [V]: https://build.avax.network/academy/blockchain/x402-payment-infrastructure/04-x402-on-avalanche/03-facilitators
- Antecedente minero en la red: AZX1 de Bridgetower, con Proof of Reserve [F]: https://cryptobriefing.com/bridgetower-tokenizes-11b-assets-avalanche/ (sirve también como advertencia sobre valuar activos en el subsuelo; ver `estudio-de-mercado.md`).
- Posibilidad de una L1 propia donde los validadores sean los proveedores de datos, opción que la guía del track menciona.

## Hoja de ruta

| Etapa | Qué | Depende de | Estado |
|---|---|---|---|
| 1 | MVP en Fuji: estudio con Sentinel-2, atestación, colecta simulada en escrow, recómputo público | nada | en construcción |
| 2 | Firmantes múltiples (quórum) o Chainlink CRE en lugar del firmante único | etapa 1 | pendiente |
| 3 | Cruce del polígono con el catastro minero provincial y atestación separada de titularidad | acceso a datos del catastro de Salta | pendiente |
| 4 | Pago por estudio con x402 en USDC | etapa 1 | pendiente |
| 5 | Revisión profesional: co-firma de un geólogo matriculado para estudios que se muestran a inversores | acuerdo con una consultora | pendiente |
| 6 | Acuerdo con un PFC o PSAV registrado en CNV para colectas reales (RG 1125 y sandbox de tokenización hasta el 31/12/2027) | asesoría legal, etapas 2, 3 y 5 | pendiente |
| 7 | Mainnet, con auditoría del contrato | etapa 6 | pendiente |
| 8 | Tier premium con imagen comercial por encargo y fuentes adicionales (EMIT, ASTER, SAOCOM) | demanda validada | pendiente |

## Pendientes

- [INPUT] Tarifa local de un estudio de teledetección o informe de targets (consultoras de Argentina, Chile o Perú).
- [INPUT] Tarifa de revisión de un geólogo matriculado en Salta.
- [INPUT] Precios locales de muestreo geoquímico y geofísica de superficie, para dimensionar la colecta típica.
- [INPUT] Cantidad de cateos activos en Salta y de socios de la Cámara de Minería de Salta.
- [INPUT] Precio del estudio fijado en el contrato desplegado y precio de AVAX a la fecha del despliegue.
- [INPUT] Resultados de las 5 entrevistas.
- [INPUT] Costos de equipo, legal y auditoría para completar la proyección.
