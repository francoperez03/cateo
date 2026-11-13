# Cateo · guion del video

Duración: 100 segundos (el track acepta de 1 a 3 minutos). Estructura de la guía: problema, dato y transacción, por qué blockchain. Unas 230 palabras de locución.

Antes de grabar:
- Contrato desplegado en Fuji: `0x146ccb469FDA4B84bb36f0fD12FA35443ea7B7AF` (https://testnet.snowtrace.io/address/0x146ccb469FDA4B84bb36f0fD12FA35443ea7B7AF)
- Un estudio ya atestado y una colecta con un aporte, como respaldo: estudio N.º 0 (https://cateo-gold.vercel.app/estudio/0) y colecta N.º 0 (https://cateo-gold.vercel.app/colecta/0)
- Polígono de la demo: borde oeste del Salar de Pozuelos, Salta (el "Área de ejemplo" de la web)
- Wallet con AVAX y USDC de prueba en Fuji.

| Tiempo | Pantalla | Locución |
|---|---|---|
| 0:00 a 0:08 | Landing de Cateo. Título y la Puna de fondo | "La exploración minera temprana recibe la porción más chica del presupuesto mundial desde que hay registro: 21% en 2025." |
| 0:08 a 0:20 | Titular de prensa sobre Atómico 3 (julio de 2025), después el mapa vacío de la app | "Quien podría financiarlas no tiene cómo comprobar lo que le cuentan. En 2025 la CNV denunció a un token de litio cuyos permisos eran de un tercero." |
| 0:20 a 0:32 | App, pantalla Pedir estudio. Se dibuja el polígono, se carga el número de expediente (marcado como declarado) | "En Cateo dibujás el área, declarás el expediente y pagás el estudio en USDC." |
| 0:32 a 0:42 | Wallet confirma. Explorer de Fuji con la transacción `pedirEstudio`: https://testnet.snowtrace.io/tx/0x5466ffe391812832146b32bd596b96d4f8910c0fa000d080e45bc44a24ac912e | "El pedido queda en Avalanche, con el polígono a la vista de todos." |
| 0:42 a 0:56 | Terminal del satélite: busca la escena de Sentinel-2, calcula, firma. Después la pantalla Estudio con el mapa de calor | "El satélite toma una escena real de Sentinel-2 y calcula dos índices espectrales de la superficie, asociados a óxidos de hierro y arcillas. Es un filtro previo al trabajo de campo. No dice ley ni tonelaje." |
| 0:56 a 1:10 | Explorer de Fuji con la transacción `atestar`: https://testnet.snowtrace.io/tx/0x95b70822332d82844acada0f33daad8c1276285908c3c78031eacebba6c9f0f4. Zoom al hash del informe y al identificador de la escena | "El resultado se atesta on-chain: qué escena, qué algoritmo, qué porcentaje del área y el hash del informe." |
| 1:10 a 1:22 | Pantalla Crear colecta, después un aporte en USDC de prueba. Explorer: https://testnet.snowtrace.io/address/0x146ccb469FDA4B84bb36f0fD12FA35443ea7B7AF | "Solo con esa atestación el contrato deja abrir una colecta. Los aportes quedan en escrow, y si no se llega a la meta se devuelven." |
| 1:22 a 1:34 | Las cuatro respuestas en pantalla, una por línea. Al lado, la terminal corre `verificar` y los hashes coinciden | "¿Quién desconfía? El inversor, del titular. ¿Qué se dispara? La atestación habilita la colecta. ¿Y si el dato miente? Cualquiera lo recomputa. ¿Quién paga? El titular, el estudio; los aportantes, la colecta." |
| 1:34 a 1:40 | Cierre: nombre, links y la línea de atribución | "Cateo. Estudios satelitales que cualquiera puede comprobar." |

Las cuatro respuestas, texto en pantalla (1:22 a 1:34):
1. Quién desconfía de quién: el inversor, del titular del área.
2. Qué evento on-chain se dispara: la atestación habilita la colecta en escrow.
3. Qué pasa si el dato miente: recómputo público desde la escena y el hash; reembolso si no se llega a la meta.
4. Quién paga y quién cobra: el titular paga el estudio, los aportantes fondean, la plataforma cobra el estudio.

Texto fijo del cierre:
- Contains modified Copernicus Sentinel data [año de la escena]
- Demo en Fuji con activos simulados y datos reales. Una colecta real corre por una plataforma registrada en CNV.
- Repo: https://github.com/francoperez03/cateo · Demo: https://cateo-gold.vercel.app · Contrato: https://testnet.snowtrace.io/address/0x146ccb469FDA4B84bb36f0fD12FA35443ea7B7AF

Notas de grabación:
- Mostrar al menos una transacción confirmada en el explorer dentro del tramo 0:20 a 1:10, como pide la guía.
- Si la red tarda, cortar al link de respaldo ya confirmado.
- En ningún plano aparecen cifras de valor, ley o tonelaje del área.
