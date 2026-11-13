# Cateo · riesgos y marco legal

Actualizado: 2026-11-13. Research de escritorio hecho con fuentes abiertas.

**Este documento es investigación, sin valor de dictamen.** Antes de cualquier colecta con plata real hace falta un abogado matriculado con práctica en mercado de capitales (CNV) y otro en derecho minero de la provincia donde esté el pedimento.

Cómo leer las marcas:

- **[V]** verificado en fuente primaria (Boletín Oficial, texto de la norma, resolución de la CNV) o en dos fuentes independientes.
- **[U]** fuente única secundaria (estudio jurídico, prensa).
- **[E]** estimación o inferencia propia.
- **[INPUT]** falta el dato.

Los números de mercado viven en `estudio-de-mercado.md` y el modelo de precios en `modelo-de-negocio.md`. RIGI y proyectos por provincia: `../../../../hackathon-twin/agentes/hackatwin-mixtoC-diseno/docs/investigacion/`.

## Resumen en seis líneas

1. Una colecta donde terceros ponen stablecoins esperando un retorno de un proyecto minero es oferta pública de valores negociables en Argentina. La vía legal existe desde abril y junio de 2026 (RG 1125 y RG 1150) y pasa por actores registrados en la CNV.
2. El régimen de tokenización prohíbe transferir los tokens fuera de los PSAV intervinientes o hacia protocolos descentralizados (RG 1150, art. 5 inc. f). El contrato abierto de Fuji sirve como demo y como capa de evidencia. La colecta real corre por otro carril.
3. Un estudio satelital atestado es información de exploración superficial y queda siempre por debajo de cualquier afirmación de recurso, ley, tonelaje o valor.
4. El antecedente local es Atómico 3: token "respaldado en litio" sin títulos mineros a su nombre, suspendido y denunciado penalmente por la CNV el 14/07/2025.
5. El MVP cubre la trazabilidad del dato (qué polígono, qué escena, qué algoritmo, qué resultado). Todavía deja abiertos la titularidad del pedimento (va declarada) y el firmante único.
6. Posición recomendada: Cateo es la capa de evidencia verificable. La emisión y la colocación las hace un socio registrado.

## Propiedad minera en Argentina

### Régimen nacional: Código de Minería

Las minas son de dominio originario de las provincias y se conceden a particulares. El Código de Minería es nacional, el procedimiento y el registro son provinciales.

| Figura | Qué da | Regla | Fuente |
|---|---|---|---|
| Permiso de exploración o cateo | Derecho exclusivo a explorar un área y a obtener concesiones de explotación dentro de ella | Unidad de medida de 500 ha. Hasta 20 unidades por permiso (10.000 ha, 100 km²). Una persona no puede tener más de 20 permisos ni más de 400 unidades por provincia | [V] Ley 24.498 (sancionada 14/06/1995, B.O. 19/07/1995), que reforma el Código: https://www.argentina.gob.ar/normativa/nacional/norma-24287/texto |
| Plazo del cateo | Tiempo para explorar | 150 días para una unidad, 50 días más por cada unidad adicional. Corre desde 30 días después del otorgamiento. A los 300 días se libera la mitad de lo que exceda 4 unidades, a los 700 días la mitad del remanente | [V] misma fuente |
| Solicitud | Qué se presenta | Coordenadas de los vértices, programa mínimo de trabajos, estimación de inversiones y equipos. Canon provisional al solicitar | [V] misma fuente |
| Descubrimiento dentro del cateo | A quién pertenece | "Desde el día de la presentación de la solicitud corresponderá al explorador el descubrimiento" | [V] misma fuente |
| Manifestación de descubrimiento | Paso del hallazgo a la concesión de la mina | Nota con datos del descubridor, muestra del mineral, nombre de la mina y descripción del punto de descubrimiento. Después vienen labor legal, mensura y concesión | [U] guía oficial del marco regulatorio: https://argentina.gob.ar/sites/default/files/marco_regulatorio_argentino.pdf |

Los números de artículo cambian entre el texto de la Ley 24.498 y el texto ordenado por Decreto 456/1997. Para citar en un documento formal usar el texto ordenado vigente en InfoLEG. **[INPUT]** numeración vigente de cada artículo.

Consecuencia para el producto: el límite de 100 km² por estudio del MVP coincide con el tamaño máximo de un cateo, y un cateo es un derecho corto (meses), exclusivo y con superficie que se va liberando. Un estudio sobre un cateo vencido describe tierra que ya puede ser de otro.

### Registro y catastro por provincia

| Provincia | Autoridad que otorga | Consulta pública | Estado | Fuente |
|---|---|---|---|---|
| Salta | Juzgado de Minas (Poder Judicial). Procedimiento: Ley 7141 | Catastro en geoportal IDESA: http://geoportal.idesa.gob.ar/maps/648. Los datos "deben ser verificados en el expediente judicial". Desde 2026 el Poder Judicial habilitó consulta pública de expedientes digitales, fuero Minas incluido, sin crear cuenta (Acordada 14.273) | Polígonos consultables. Titularidad y estado se confirman en el expediente | [V] portal EITI de Nación: https://www.argentina.gob.ar/node/407406 · [U] consulta de expedientes: https://www.diariojudicial.com/news-99847-salta-habilito-la-consulta-publica-de-los-expedientes-digitales (la fecha de la nota no se pudo confirmar) |
| Jujuy | Juzgado Administrativo de Minas | Catastro online con estado legal de cada expediente: http://www.mineriajujuy.gob.ar/site/jam_catastro.php | Es una de las dos provincias (con Neuquén) que muestran el estado del expediente | [U] https://elinversorenergetico.com/?p=28155 (nota sin fecha visible, verificar que el enlace siga activo) |
| Catamarca | Autoridad Minera provincial. Código de Procedimiento Minero, Ley 5682: los expedientes son públicos | Incluida en el catastro minero unificado nacional | **[INPUT]** URL del visor provincial | [U] https://digesto.catamarca.gob.ar/digesto/crearpdf/ley/65 |
| Nación | Secretaría de Minería | Catastro Minero Unificado (CIMA): cima.minem.gob.ar. Capa histórica de la Puna (junio 2021): https://oat.ambiente.gob.ar/layers/geonode:catastrominero062021_puna | **[INPUT]** si CIMA sigue activo en 2026 y si expone WMS/WFS | [U] |

Costos de trámite en Salta (Ley 8499): 51.500 unidades tributarias por solicitud de cateo y lo mismo por manifestación de descubrimiento [U]: https://www.consejosalta.org.ar/wp-content/uploads/Ley-N-8499.pdf. **[INPUT]** valor vigente de la UT y si se aprobó la suba a 400.000 UT.

**[INPUT]** cantidad de cateos y minas vigentes en Salta, Jujuy y Catamarca.

### Qué significa para Cateo

- La titularidad se prueba con el número de expediente y la constancia del juzgado o autoridad minera. El polígono dibujado queda como área declarada.
- En el MVP el expediente va **declarado** por quien pide el estudio y la pantalla lo dice así.
- En producción hacen falta dos cosas: cruce automático del polígono con el catastro (donde haya capa pública) y una constancia de titularidad firmada por escribano o emitida por la autoridad minera, registrada como atestación separada de la satelital.

## Qué puede afirmar un estudio satelital atestado y qué nunca

### Estándares de reporte

| Estándar | Jurisdicción | Quién firma | Lo que importa acá |
|---|---|---|---|
| NI 43-101 | Canadá (TSX, TSXV) | Qualified Person: ingeniero o geocientífico con al menos cinco años de experiencia relevante, miembro en regla de una asociación profesional reconocida | Toda divulgación científica o técnica al público debe estar preparada o aprobada por una QP, nombrada, con la verificación de datos explicada [V]: https://www.osc.ca/fr/node/306366 · [U] https://cassels.com/insights/national-instrument-43-101-who-is-a-qualified-person-and-what-are-their-responsibilities/ |
| JORC 2012 | Australia (ASX) | Competent Person | Misma lógica: resultados de exploración, recursos y reservas son categorías separadas [E, conocimiento general sin fuente consultada en esta sesión] |
| S-K 1300 | Estados Unidos (SEC) | Qualified Person | Misma familia CRIRSCO [E, ídem] |

Un "exploration target" solo puede divulgarse con una advertencia igual de visible de que el potencial es conceptual y que es incierto que más exploración defina un recurso [V para el concepto]: https://fcaa.gov.sk.ca/public/CKeditorUpload/Securities/CSA_Consultation_Papers/2025/43_101_et_al/Annex_A_43-101_NI_Amendments_June_12,_2025.pdf. La CSA propuso en junio de 2025 reemplazar NI 43-101. **[INPUT]** si la reforma ya entró en vigencia.

Argentina no tiene un estándar propio obligatorio de reporte de recursos para oferta pública local. **[INPUT]** confirmar con el abogado si la CNV exige o acepta informes bajo CRIRSCO para emisoras mineras.

### Lo que el estudio puede decir

- Qué escena de Sentinel-2 se usó, de qué fecha y con qué cobertura de nubes.
- Qué índices se calcularon (óxidos férricos B04/B02, arcillas e hidroxilos B11/B12), con qué umbrales y qué versión del algoritmo.
- Qué porcentaje de píxeles del polígono supera cada umbral.
- Que el resultado es recomputable por cualquiera a partir de la escena, el polígono y el código.
- Que el patrón es compatible con alteración superficial y que eso sirve para decidir dónde muestrear.

### Lo que nunca puede decir

- Que hay un recurso, una reserva, una ley, un tonelaje o una profundidad.
- Que hay litio en salmuera (el satélite no penetra la superficie).
- Cualquier valor en dólares del subsuelo o "respaldo" de un token por mineral.
- Que el área pertenece a quien pidió el estudio.
- Que un profesional calificado revisó o avala el resultado, salvo que haya una firma de QP registrada aparte.

El esquema on-chain acompaña esto: guarda polígono, escena, dos porcentajes, hash y versión. No tiene campos de valor, recurso ni mineral.

### Texto del descargo que va en cada informe

Va completo en la pantalla del estudio, en el PDF o JSON del informe y en la ficha de cualquier colecta que lo cite:

> **Alcance de este estudio.** Este informe describe índices espectrales calculados sobre una imagen satelital Sentinel-2 de la superficie del área indicada. Es información preliminar de exploración. No constituye una estimación de recursos ni de reservas minerales, no informa ley, tonelaje, profundidad ni valor económico, y no fue preparado ni aprobado por una persona calificada en los términos de NI 43-101, JORC o S-K 1300. La presencia de alteración superficial no implica mineralización: su potencial es conceptual y es incierto que trabajos posteriores definan un recurso.
>
> **Titularidad.** El número de expediente minero fue declarado por quien solicitó el estudio y no fue verificado por Cateo. Este informe no acredita derechos mineros sobre el área.
>
> **Qué prueba la atestación.** El registro en Avalanche prueba qué polígono se analizó, con qué imagen, con qué versión del algoritmo, qué resultado se obtuvo y cuándo. Cualquier persona puede recalcularlo. No prueba la geología del subsuelo.
>
> **Sin oferta de inversión.** Este informe no es una oferta ni una recomendación de inversión. Contains modified Copernicus Sentinel data [año].

## Régimen CNV

### Normas, en orden

| Norma | Fecha | Qué habilita | Marca y fuente |
|---|---|---|---|
| Ley 27.349, Título II | 2017 | Crea el sistema de financiamiento colectivo y la figura de Plataforma de Financiamiento Colectivo (PFC), sociedad anónima registrada en CNV | [U] https://www.argentina.gob.ar/node/247867 |
| RG 717/2017 | 2017 | Reglamenta las PFC (Normas CNV, Título XIV, Capítulo I) | [U] https://www.consejosalta.org.ar/wp-content/uploads/RES_CNV_717.pdf · **[INPUT]** requisitos y topes vigentes del Capítulo I |
| RG 1058/2025 | B.O. 14/03/2025 | Marco de los Proveedores de Servicios de Activos Virtuales (PSAV) | [V] https://www.boletinoficial.gob.ar/detalleAviso/primera/322539/20250314 |
| RG 1069/2025 | junio 2025 | Primera etapa de tokenización: fideicomisos financieros y fondos cerrados sobre activos del mundo real, dentro de un sandbox | [V] https://www.marval.com/Publicacion/nuevo-regimen-de-tokenizacion-de-valores-negociables-17235 y considerandos de la RG 1150 |
| RG 1081/2025 | 2025 | Segunda etapa: amplía los valores representables digitalmente (acciones, ON, CEDEARs) | [V] considerandos de la RG 1150 |
| RG 1087/2025 | 2025 | Admite tokenizar ciertos valores emitidos bajo regímenes de autorización automática. Prorrogó el sandbox a 21/08/2026 | [V] considerandos de la RG 1150 · [U] fecha de prórroga: https://www.bcr.com.ar/es/print/pdf/node/115926 |
| RG 1118/2026 | dictada 04/03/2026, B.O. 06/03/2026 | Deroga el Capítulo II del Título XIV y renombra el título: "Plataforma de financiamiento colectivo. Registro de proveedores de servicios de activos virtuales" | [V] https://www.boletinoficial.gob.ar/detalleAviso/primera/339151/20260306 |
| RG 1125/2026 | dictada 01/04/2026, B.O. 07/04/2026, vigente 08/04/2026 | Financiamiento colectivo dentro de la oferta pública con autorización automática (Secciones XV a XVII del Capítulo V, Título II). ON y acciones. Colocación por mecanismos generales o por PFC registradas | [V] https://www.boletinoficial.gob.ar/detalleAviso/primera/340413/20260407 |
| RG 1137/2026 | 30/04/2026 | Consulta pública del proyecto que termina en la RG 1150 | [V] considerandos de la RG 1150 |
| RG 1150/2026 | dictada 10/06/2026, B.O. 11/06/2026 (N.º 35928, pág. 72), vigente 12/06/2026 | Tokenización de valores emitidos bajo cualquier régimen de autorización automática (salvo fondos abiertos). Sandbox hasta 31/12/2027 inclusive | [V] https://www.argentina.gob.ar/normativa/nacional/norma-426586/texto |
| RG 1172/2026 | dictada 14/10/2026, vigente 16/10/2026 | Texto único del régimen PSAV. Informe mensual PSAV_014 exigible desde 01/11/2026. Prohíbe mixers. Excluye protocolos descentralizados salvo que alguien tenga control o influencia suficiente | [U] https://www.marval.com/Publicacion/se-actualiza-el-regimen-de-los-psav-17739 · **[INPUT]** texto oficial en el Boletín |

### RG 1125: topes y reglas del financiamiento colectivo [V]

Texto del Boletín Oficial del 07/04/2026:

- Definición: "un sistema en el que muchos inversores aportan pequeñas cantidades de dinero a una Emisora".
- Sin límite en la cantidad de inversores no calificados (art. 145).
- Topes por inversor no calificado (art. 148), los cuatro a la vez:
  - 3.000 UVA por emisión.
  - 10.000 UVA en el conjunto de emisiones bajo el régimen.
  - 5% de su patrimonio por emisión.
  - 10% de su patrimonio en el total.
  - Se acredita con declaración jurada en cada suscripción.
- Lenguaje claro para público general, obligatorio para la emisora y los agentes (art. 147).
- Bajo impacto (art. 149 y 150): rigen los límites de emisión de los arts. 65, 66, 101 y 102. **[INPUT]** montos de esos artículos.
- Mediano impacto (art. 151 y 152): no rigen los límites de emisión ni la agregación de los arts. 83, 84, 113 y 114 (15.000.000 UVA por emisión en el régimen general de mediano impacto).
- Quedan fuera de la CNV los financiamientos colectivos que no involucren valores negociables (art. 144). Una donación o una precompra sin expectativa de renta entran ahí. Una colecta de exploración con retorno queda adentro [E].
- La RG 1125 no habla de tokenización. Eso lo resuelve la RG 1150.

Referencia de escala: UVA a $2.194,78 al 13/11/2026 [U]: https://indicadores.ar/indicadores-economicos/uva (el valor anterior de este documento, $2.156,58 al 15/10/2026, no aparece en la fuente). Entonces 3.000 UVA son unos $6,6 millones y 10.000 UVA unos $21,9 millones [E]. **[INPUT]** tipo de cambio para expresarlo en dólares.

### RG 1150: cómo es un valor tokenizado [V]

- Tokenizables: acciones, ON, CEDEARs, valores de fideicomisos financieros y cuotapartes de fondos cerrados sobre activos del mundo real, entre otros (art. 1 del Título XXII).
- Bajo impacto: solo se puede tokenizar si la emisora elabora voluntariamente un prospecto y pide autorización de representación digital (arts. 11 y 12).
- El valor tradicional existe primero o al mismo tiempo, depositado en un agente depositario central. El token es su representación (art. 10 inc. b).
- Una entidad especializada en tecnología de registro distribuido genera los tokens (art. 5 inc. d).
- Hasta cinco PSAV intervinientes, nombrados en los documentos de emisión, interoperables y sincronizados (art. 5 inc. e).
- **No se admiten transferencias fuera de los PSAV intervinientes ni hacia protocolos descentralizados** (art. 5 inc. f).
- Los PSAV deben estar inscriptos en todas las categorías. Quien solo presta tecnología no necesariamente se inscribe (art. 14).
- Sandbox hasta el 31/12/2027. Después no se emiten nuevas representaciones digitales salvo prórroga (art. 38).

### La vía concreta para una colecta real

Paso a paso, con el estado de conocimiento actual [E, a validar con abogado]:

1. **Vehículo emisor por proyecto.** Una sociedad (SA o SAS) titular del cateo o con contrato de exploración inscripto sobre él. Emite ON o acciones. Alternativa: fideicomiso financiero cuyo activo sea el derecho minero o el contrato.
2. **Titularidad probada.** Constancia del Juzgado de Minas o autoridad minera, más informe de escribano. Sin esto no se abre nada.
3. **Informe técnico con firma.** El estudio de Cateo como anexo de evidencia y, para todo lo que se diga al inversor, una persona calificada (geólogo matriculado) que firme el alcance.
4. **Régimen de oferta.** Financiamiento colectivo con autorización automática (RG 1125), bajo o mediano impacto según el monto. Topes de 3.000 y 10.000 UVA por inversor minorista.
5. **Colocación.** A través de una PFC registrada en CNV o de un agente (ALyC). Cateo no coloca.
6. **Si se quiere token.** Prospecto voluntario y autorización de representación digital (RG 1150), entidad de tecnología de registro distribuido, hasta cinco PSAV. El token circula solo entre esos PSAV. La suscripción en stablecoins la recibe el PSAV [INPUT: confirmar si la integración puede ser en USDC/USDT y en qué red].
7. **Custodia y liberación de fondos.** El escrow con hitos lo administra el agente o fiduciario. La lógica de "se libera si se llega a la meta, se devuelve si no" del contrato de Cateo se replica en el contrato de colocación.
8. **Prevención de lavado.** PFC y PSAV son sujetos obligados ante la UIF. Identificación de inversores a cargo de ellos.

Con quién asociarse:

| Rol | Quién | Estado |
|---|---|---|
| PFC registrada | **[INPUT]** nómina vigente en cnv.gov.ar (no apareció en la búsqueda) | por contactar |
| PSAV registrado con práctica en tokenización | **[INPUT]** nómina vigente | por contactar |
| Estudio jurídico de mercado de capitales | Los que publicaron análisis de estas normas: Marval O'Farrell Mairal, Beccar Varela, O'Farrell, Allende & Brea | por contactar |
| Abogado minero en Salta | **[INPUT]** | por contactar |
| Geólogo matriculado que firme | **[INPUT]** (colegio profesional provincial) | por contactar |

Alternativas más angostas: colocación privada solo a inversores calificados, o un producto que no sea valor negociable (venta de estudios y nada más). La segunda es lo que Cateo hace hoy.

### Dónde queda el contrato de Fuji

El contrato del MVP es abierto: cualquiera aporta desde cualquier wallet. Eso es incompatible con la RG 1150 para una emisión real. Sirve para tres cosas: demostrar el flujo en el track ("activos simulados con datos reales"), dejar el registro de estudios como capa pública de evidencia, y mostrarle a un socio registrado la lógica de escrow que tendría que replicar.

## El caso Atómico 3

### Cronología

| Fecha | Hecho | Marca y fuente |
|---|---|---|
| 2020 a 2021 | Pablo Rutigliano impulsa CALBAMERICA y el "Mercado de Metales" (MMARG) y presenta Atómico 3 como cripto respaldada en litio | [U] https://agendaindustrial.com/agenda-industrial/la-cronologia-de-una-estafa-del-litio-tokenizado-al-colapso-de-atomico-3/ (19/07/2025) |
| Septiembre 2022 | La CNV ordena a MMARG y a sus responsables cesar la actividad por falta de autorización (Resolución 21.783) | [U] misma fuente |
| 2024 | Relanzamiento desde Paraguay | [U] misma fuente · https://www.abc.com.py/economia/2025/07/29/denuncian-en-argentina-a-firma-cripto-ligada-al-litio-y-con-sede-en-paraguay/ |
| 30/05/2025 | Anuncia filial argentina y se presenta como inscripta en el registro PSAV. Declara un acuerdo de tokenización sobre 50.000 ha en los Salares de Mogna (San Juan) | [U] https://www.iprofesional.com/tecnologia/429664-criptomoneda-litio-atomico-3-abrio-filial-argentina-aprobada-por-gobierno-javier-milei |
| Junio 2025 | Denuncias de inversores ante la CNV (ID 5773 y 5775). Se abre el expediente 272/2025. Lanza un segundo token ligado al cobre | [V] resolución CNV · [U] cronología de Agenda Industrial |
| 14/07/2025 | Resolución RRFCO-2025-303-APN-DIR#CNV: la CNV resuelve denunciar penalmente a Atómico 3 S.A., PSAV N.º 103, por posible estafa (art. 172 del Código Penal), con base en el art. 177 del Código Procesal Penal y el art. 20 de la Ley 26.831. El mismo día, resolución conjunta de suspensión preventiva como PSAV, sin plazo: "hasta tanto existan hechos posteriores que justifiquen su revisión" | [V] texto de la resolución: https://argentina.gob.ar/sites/default/files/2025_-_3.1_-_303_fc.pdf · [V] suspensión: https://www.marval.com/Publicacion/primera-sancion-de-la-cnv-a-un-psav-17262 |
| Julio 2025 | Motivo informado: la empresa tenía solo un permiso de exploración y a nombre de un tercero. La autoridad minera de San Juan no registra títulos ni proyectos de Atómico 3 en Mogna. Monto mencionado en prensa: unos US$ 2 millones, estimación de damnificados sobre unos 300 holders; los 14 denunciantes argentinos suman cerca de US$ 500.000. Sin cifra oficial | [V, dos fuentes] https://www.cronista.com/finanzas-mercados/cnv-suspende-por-primera-vez-a-una-empresa-cripto-y-la-denuncia-en-la-justicia · https://www.criptonoticias.com/sucesos/empresa-argentina-criptomonedas-denuncia-estafa-cnv-atomico/ · monto [U]: https://www.eldestapeweb.com/economia/estafa/la-cnv-denuncio-a-una-cripto-por-fraude-por-us-2-millones-con-un-proyecto-de-litio-202571616529 |
| Agosto 2025 | El Juzgado Civil y Comercial Federal de feria rechaza el amparo de la empresa contra la suspensión | [V, dos fuentes] https://www.diariodecuyo.com.ar/economia/rechazaron-un-amparo-a-la-empresa-acusada-de-estafar-con-cripto-de-litio-sanjuanino-1763018.html (26/08/2025) · https://www.iproup.com/economia-digital/59368-por-que-rechazaron-el-amparo-de-atomico-3-contra-la-cnv |
| Sin fecha | La empresa sostiene que presentó pruebas técnicas que descartan el delito | [U, parte interesada] https://territorioblockchain.com/pablo-rutigliano-y-atomico-3-desarticulan-la-operacion-de-la-cnv-pruebas-tecnicas-confirman-la-inexistencia-de-delito/ |
| Noviembre 2026 | **[INPUT]** estado de la causa penal y de la suspensión. No aparecieron novedades fechadas en 2026 | sin fuente |

Nota de fechas: Diario de Cuyo ubica la suspensión el 7 de julio. La resolución oficial y Marval dicen 14 de julio. Se toma el 14.

Corrección al research inicial: la nota de iProfesional sobre la "filial aprobada" es del 30/05/2025, anterior a la suspensión. No hay conflicto entre fuentes ni una rehabilitación en 2026.

### Qué falló y cómo lo cubre Cateo

| Qué falló en Atómico 3 | Cateo en el MVP | Cateo en producción |
|---|---|---|
| Decía tener un yacimiento y el permiso era de un tercero | Expediente declarado y rotulado "sin verificar" | Cruce con catastro y constancia de titularidad firmada, como atestación separada |
| Prometía respaldo por kilo de litio sin reservas medidas | El esquema no tiene campos de mineral, ley ni valor. Descargo fijo en cada informe | Firma de persona calificada para cualquier afirmación técnica al inversor |
| Nadie podía verificar nada de forma independiente | Polígono, escena, resultado y hash públicos. `satelite/verificar.mjs` recomputa | Varios firmantes o Chainlink CRE, y código abierto versionado |
| Usaba la inscripción PSAV como sello de garantía | Sin logos de reguladores. Solo Fuji, activos simulados | Colocación a cargo de PFC o PSAV registrado, Cateo como proveedor de evidencia |
| La misma empresa emitía, promocionaba y "certificaba" | El satélite firma el dato. Quien junta plata es otra cuenta | Separación societaria entre quien atesta y quien emite |

## Tabla de riesgos

Estados: abierto (sin mitigación operativa), parcial (mitigado en parte en el MVP), cubierto (mitigado en el MVP para el alcance de Fuji).

| Riesgo | Cómo se manifiesta | Mitigación en el MVP | Mitigación en producción | Estado |
|---|---|---|---|---|
| Oferta pública sin autorización | Una colecta con retorno esperado, abierta al público y en stablecoins, es valor negociable. Sanción administrativa y denuncia penal, como Atómico 3 | Solo Fuji, token de prueba, texto "simulación" en la UI. Sin promesa de retorno | Emisión bajo RG 1125 con PFC registrada. Token bajo RG 1150 con PSAV. Dictamen de abogado antes de abrir | cubierto en Fuji, abierto para producción |
| Estudiar tierra ajena | Alguien dibuja el cateo de otro, obtiene una atestación y junta plata | Expediente declarado, marcado como no verificado. Solo quien pidió el estudio puede abrir colecta sobre él | Cruce con catastro provincial, constancia de titularidad firmada, bloqueo de colectas sin esa segunda atestación | abierto |
| Sobreafirmación geológica | El informe o la colecta se leen como "hay mineral". Reclamo por engaño | Esquema sin campos de valor. Descargo fijo. Lenguaje de índices espectrales | Revisión de persona calificada. Plantilla cerrada para el texto de la colecta. Moderación previa | parcial |
| Confianza en el firmante | El backend de Cateo firma un resultado falso o su clave se filtra | Todo recomputable: polígono en evento, escena, versión de algoritmo, hash. `verificar.mjs` | Quórum de firmantes independientes o Chainlink CRE. Rotación de claves. Disputa on-chain con ventana de tiempo | parcial |
| Dato satelital engañoso sin mala fe | Nubes, nieve, sombra, humedad reciente o barniz del desierto alteran los índices. Un salar húmedo da otra respuesta que seco | Se elige la escena con menos nubes y queda registrada | Máscara de nubes y sombras, ventana seca mínima, mediana de varias fechas, umbral calibrado por zona, puntaje de confianza en el informe | abierto |
| Fondos mal usados después del retiro | El creador llega a la meta, retira y no explora | Escrow con reembolso si no se llega a la meta. Nada después del retiro | Liberación por hitos con evidencia (certificado de laboratorio, metros perforados), fiduciario, auditoría | abierto |
| Muestras o datos de campo adulterados | Etapas posteriores se respaldan con muestras "saladas" | Fuera de alcance: el MVP solo atesta satélite | Cadena de custodia, laboratorio acreditado, hash del certificado, firma de persona calificada | abierto |
| Cateo vencido o superficie liberada | El estudio sigue visible sobre un derecho que caducó | Fecha de escena y de atestación visibles | Vencimiento de la atestación de titularidad y revalidación periódica | abierto |
| Polígono público | El GeoJSON queda en un evento: revela dónde mira un explorador antes de pedir el cateo | Aviso antes de pagar. Es el costo de la verificabilidad | Compromiso con hash y revelación diferida, o estudio solo sobre áreas ya pedidas | abierto |
| Lavado de activos y sanciones | Aportes desde wallets anónimas | No aplica en testnet | Identificación a cargo de PFC y PSAV (sujetos obligados UIF). Sin wallets no identificadas | abierto para producción |
| Licencias de datos | Uso comercial de datos o herramientas que lo prohíben | Sentinel-2 vía Earth Search, datos abiertos de Copernicus, con atribución | Evitar el tier no comercial de Earth Engine. Revisar licencia de cada fuente premium | cubierto |
| Contrato sin auditar | Error en escrow o reembolsos | Tests de Foundry sobre retiro, reembolso y doble retiro. Solo fondos de prueba | Auditoría externa, límites de monto, pausa de emergencia | parcial |
| Stablecoin y red | Congelamiento del emisor, depeg, cambios de la red | No aplica en testnet | Lo define el PSAV: stablecoin admitida, red, custodia | abierto para producción |
| Reputación por asociación | "Otro token minero" después de Atómico 3. Advertencias de cámaras del sector | Posicionamiento como evidencia verificable. Cero lenguaje de "respaldo" | Sumar un geólogo y una cámara o universidad como validadores. Publicar el método | parcial |
| Conflicto con comunidades y ambiente | Estudio o colecta sobre territorio de comunidades, áreas protegidas o glaciares | Ninguna | Capas de exclusión (áreas protegidas, inventario de glaciares, territorios relevados) y aviso en el informe | abierto |

## Test de las 4 preguntas del track de Avalanche

**1. ¿Quién desconfía de quién?**
Quien puede poner plata en exploración temprana desconfía de lo que le cuenta quien tiene el pedimento: si el área existe, si se estudió de verdad y si el informe se retocó después. Atómico 3 mostró que la desconfianza tiene motivos. Quien pide el estudio, a su vez, necesita que nadie pueda decir que eligió la imagen o el resultado que le convenía.

**2. ¿Qué evento on-chain se dispara?**
Tres, en cadena. El pago del estudio emite `EstudioPedido` con el polígono completo. El satélite responde con `EstudioAtestado` (escena Sentinel-2, porcentaje de óxidos, porcentaje de arcillas, hash del informe, versión del algoritmo). Solo con esa atestación el contrato permite `crearColecta`, y los aportes quedan en escrow: se liberan al creador si se llega a la meta y se reembolsan si vence sin llegar.

**3. ¿Qué pasa si el dato miente?**
Se nota y se puede probar. El polígono, la escena y la versión del algoritmo están en la cadena, así que cualquiera corre `satelite/verificar.mjs`, recalcula y compara contra el hash atestado. Si no coincide, el firmante queda expuesto con una prueba pública. Mientras la colecta está abierta la plata sigue en escrow. Límites que se dicen en voz alta: hoy hay un solo firmante, la titularidad del pedimento va declarada, y si el creador ya retiró no hay recupero. El paso siguiente es quórum de firmantes (o Chainlink CRE) y una ventana de disputa antes del retiro.

**4. ¿Quién paga o cobra, y cuánto?**
Quien pide el estudio paga un precio fijo en USDC al contrato, que cobra Cateo. **[INPUT]** precio final: la propuesta para el estudio con datos gratuitos es de US$ 300, con mínimo de US$ 100 hasta 10 km² [E], detalle en `modelo-de-negocio.md`. Los aportantes ponen USDC en la colecta y lo cobra el creador si se alcanza la meta. En la demo no hay comisión sobre la colecta. En producción, una comisión sobre lo recaudado solo puede cobrarse a través del socio registrado que coloca.

## Pendientes

- **[INPUT]** estado a noviembre de 2026 de la causa penal y la suspensión de Atómico 3.
- **[INPUT]** nómina vigente de PFC y PSAV registrados (cnv.gov.ar).
- **[INPUT]** texto oficial de la RG 1172/2026 y límites de emisión de bajo impacto (arts. 65, 66, 101 y 102 de las Normas CNV).
- **[INPUT]** requisitos vigentes de las PFC tras la RG 1118/2026 (capital, proyectos admitidos, medios de pago).
- **[INPUT]** si un PSAV puede recibir suscripciones en USDC o USDT y en qué redes.
- **[INPUT]** numeración vigente de los artículos del Código de Minería (texto ordenado Decreto 456/1997).
- **[INPUT]** visor de catastro de Catamarca, estado de CIMA y acceso por WMS/WFS en las tres provincias.
- **[INPUT]** cantidad de cateos y minas vigentes en Salta, Jujuy y Catamarca.
- **[INPUT]** si la reforma de NI 43-101 propuesta en junio de 2025 ya rige, y si la CNV exige estándar CRIRSCO a emisoras mineras.
- **[INPUT]** abogado de mercado de capitales, abogado minero en Salta y geólogo matriculado que revisen este documento.
