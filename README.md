# Cateo

Estudios satelitales de superficie atestados en Avalanche, que respaldan colectas de exploración minera con stablecoins en escrow. Nombre de trabajo: "cateo" es el permiso de exploración del Código de Minería.

Nació para el track de Avalanche del hackathon Argentina Space 2026 (Salta, 11 al 13/11/2026; categoría RWA cruzada con Geoespacial). Se construye sin correr a ese cierre, respetando lo que el track pide.

## Cómo funciona

1. Alguien dibuja un polígono (hasta 100 km²), declara su número de expediente minero y paga el estudio en USDC: `pedirEstudio`.
2. El satélite (`web/satelite/atestar.mjs`) busca la escena Sentinel-2 más despejada, calcula óxidos férricos (B04/B02) y arcillas (B11/B12) y firma `atestar` con la escena, los porcentajes sobre umbral y el hash del informe.
3. Con el estudio atestado, quien lo pidió abre una colecta (`crearColecta`). Otros aportan (`aportar`). Si se llega a la meta el creador retira; si vence sin llegar, cada aportante se reembolsa.
4. Cualquiera recomputa el estudio desde la cadena y compara el hash: `web/satelite/verificar.mjs <id>`.

## Límites del producto

- El satélite ve alteración superficial. Nunca ley, tonelaje, profundidad, valor ni litio en salmuera. El contrato no tiene campos para eso, a propósito.
- El expediente minero va declarado y sin verificar. El cruce con catastro queda en la hoja de ruta.
- La colecta de Fuji usa activos simulados. Una colecta real es un valor negociable: corre por un PFC o PSAV registrado en la CNV (ver `docs/riesgos-y-legal.md`; la RG 1150 prohíbe mover tokens hacia protocolos descentralizados).
- Un solo firmante satélite. Siguiente paso: quórum o Chainlink CRE.

## Estado por frente

| Frente | Estado |
|---|---|
| Contrato `contracts/src/Cateo.sol` | hecho: 5 tests en verde (`forge test`) |
| Satélite `web/satelite/` | hecho: estudio real sobre Salar de Pozuelos en ~6 s, hash reproducible |
| E2E local `./e2e.sh` | hecho: flujo completo y reembolso en anvil con datos reales |
| Despliegue en Fuji | [INPUT] fondear la wallet de prueba (dirección en `.env`, `SATELITE`) con AVAX y USDC; después desplegar y cargar `NEXT_PUBLIC_CATEO`, `NEXT_PUBLIC_TOKEN` y `PRIVATE_KEY` en Vercel |
| Web `web/` | hecho y publicado: https://cateo-gold.vercel.app (proyecto `cateo` en Vercel). Flujo completo probado en navegador contra anvil. Falta la revisión con subagente y el pulido |
| Estudio de mercado `docs/` | escrito y auditado contra fuentes (25 cifras); queda lo marcado `[INPUT]` |
| Video y deck | guion y deck escritos en `docs/pitch/`; faltan los links de Fuji |

## Correr

```bash
cd contracts && forge test
cd web && npm install && node satelite/estudio.mjs satelite/ejemplos/pozuelos.geojson   # informe + PNG en salida/
./e2e.sh                                                                    # todo junto en anvil
```

Fuji (con `.env` cargado: `set -a; source .env; set +a`):

```bash
cd contracts && forge script script/Deploy.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
# copiar CATEO=... al .env
node web/satelite/atestar.mjs --watch
node web/satelite/verificar.mjs 0
```

## Secciones

- `PRODUCT.md` y `DESIGN.md`: para quién es la web y su sistema visual.
- `web/`: Next.js. Pantallas en `app/`, lectura de cadena en `lib/`, y las rutas `api/atestar` (el satélite como función) y `api/estudio` (recomputar).
- `assets/`: logo (isotipo en SVG y PNG, versión horizontal, versión sobre fondo oscuro) y portada de 1200×630.
- `contracts/`: Foundry. `Cateo.sol` (estudios, atestación, colectas) y `TokenPrueba.sol` (stablecoin simulada).
- `web/satelite/`: `estudio.mjs` (el cálculo, determinista), `atestar.mjs`, `verificar.mjs`, `abi.mjs`.
- `docs/estudio-de-mercado.md`: qué ve un satélite, datos y precios, financiamiento, competencia, TAM/SAM/SOM.
- `docs/modelo-de-negocio.md`: clientes, precios, economía unitaria, llegada al mercado, entrevistas.
- `docs/riesgos-y-legal.md`: propiedad minera, CNV, caso Atómico 3, tabla de riesgos, test de las 4 preguntas.
- `docs/pitch/`: deck de 7 slides, guion de video de 100 segundos y pitch de un minuto con foco en mercado (`pitch-1-minuto.md`).

Datos: Contains modified Copernicus Sentinel data 2026, vía Earth Search (Element 84).
