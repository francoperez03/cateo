# Product

## Register

product

## Users

Primero, el jurado de un hackathon de blockchain y espacio: mira una demo de 100 segundos, en una pantalla proyectada o en un video, y decide si el dato es real, si el contrato existe y si la cadena hace falta. No conoce el producto y no va a leer. Necesita ver el recorrido completo sin perderse: área, estudio, atestación, colecta, aporte.

Detrás del jurado están los dos usuarios reales, que la misma interfaz tiene que servir sin rehacerse:

- El inversor que evalúa una colecta de exploración y quiere comprobar por su cuenta qué muestra la superficie, qué escena se usó, quién firmó, y recomputar el resultado.
- El titular de un pedimento minero en la Puna (pequeño minero o junior) que dibuja su área, paga el estudio y abre una colecta.

## Product Purpose

Cateo corre un estudio espectral con Sentinel-2 sobre un polígono, atesta el resultado en Avalanche y deja que esa atestación respalde una colecta de exploración en escrow. Existe porque quien pone plata en exploración temprana desconfía de lo que le cuenta quien la pide, y hoy no tiene cómo comprobarlo sin viajar ni contratar a un geólogo.

Éxito: alguien que nunca vio el producto sigue el recorrido de punta a punta, entiende qué afirma el estudio y qué no, y puede abrir cada transacción en el explorer.

## Brand Personality

Precisa, sobria, verificable. Un instrumento de medición: se parece a una carta geológica, a un informe de laboratorio, a un visor de catastro. Habla en indicativo y con unidades. Dice lo que midió, con qué, cuándo, y dónde termina lo que sabe. Nunca entusiasma, nunca promete.

La confianza viene de mostrar el dato y su procedencia, y de decir en voz alta el límite: el satélite ve alteración de superficie; ley, tonelaje y valor quedan fuera.

## Anti-references

- Apps cripto: neón, degradés violetas, vidrio esmerilado, monedas flotando.
- Paneles de trading: velas, tickers, porcentajes en verde y rojo, cualquier cosa que sugiera rendimiento.
- Landings de tokenización de minerales con lingotes, cifras de "valor en el suelo" y cuentas regresivas.
- Estética de centro de control espacial con órbitas decorativas.
- Cualquier frase o número que se pueda leer como promesa de retorno o como recurso mineral.

## Design Principles

1. **El dato y su procedencia van juntos.** Ningún número aparece sin su escena, su fecha y su transacción a un clic.
2. **El límite se dice al lado del resultado.** Qué no afirma el estudio se lee en la misma pantalla que el resultado, con el mismo peso que una leyenda de mapa.
3. **Un recorrido que se sigue sin explicación.** En cada pantalla hay un solo paso siguiente evidente, y siempre se ve en qué punto del recorrido se está.
4. **El mapa es el documento.** El territorio ocupa el lugar principal; los paneles lo anotan.
5. **Lo declarado y lo verificado se distinguen a simple vista.** El expediente minero declarado nunca se ve igual que un dato atestado.

## Accessibility & Inclusion

WCAG 2.2 AA. Los dos índices (óxidos, arcillas) se distinguen por algo más que el tono: etiqueta, leyenda y capas separadas, legibles con daltonismo rojo-verde. Todo el flujo se puede operar con teclado salvo el dibujo del polígono, que tiene alternativa: cargar un GeoJSON o elegir un área de ejemplo. Se respeta `prefers-reduced-motion`. Legible proyectado: texto de cuerpo de 16 px o más y contraste alto.
