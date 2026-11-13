# Cateo

Leer `README.md` primero: qué es, estado por frente y cómo se corre.

## Reglas del proyecto

- **Nunca afirmar geología que el satélite no ve.** Ni en copy, ni en el contrato, ni en los docs: nada de ley, tonelaje, valor, reservas ni litio en salmuera. El estudio declara índices espectrales de superficie sobre un porcentaje del polígono.
- **El estudio es determinista.** Mismo polígono, misma escena y misma `VERSION` dan el mismo JSON y el mismo hash. Cualquier cambio en `satelite/estudio.mjs` que altere el informe (umbrales, bandas, redondeo, orden de claves, versión de `geotiff` o `proj4`) obliga a subir `VERSION`. Las dependencias van con versión exacta.
- **Los umbrales son perillas.** `UMBRALES` en `estudio.mjs` son valores de partida sin calibrar contra campo. No presentarlos como validados.
- **Colecta real fuera de alcance.** Solo Fuji con activos simulados. La vía legal está en `docs/riesgos-y-legal.md`.
- `.env` tiene una clave de prueba: no se commitea ni se imprime.

## Verificar un cambio

`cd contracts && forge test`, después `./e2e.sh` (necesita red: baja una escena real). Si toca la web, capturas a 390 y 1440 px.

## Convenciones

Español en código de dominio, docs y commits. Sin co-author en los commits. Docs con las reglas del repo de eventos: toda cifra con fecha y fuente, `[INPUT]` para lo que falta, tablas con estado.
