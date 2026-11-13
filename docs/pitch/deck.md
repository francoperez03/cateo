# Cateo · deck

7 slides. Una idea por slide. Las cifras y sus fuentes viven en `../estudio-de-mercado.md` y `../modelo-de-negocio.md`.

## Slide 1 · Problema

**En exploración minera temprana, nadie puede comprobar lo que le cuentan.**

- El titular de un cateo necesita plata para el primer programa de campo.
- Quien podría ponerla no tiene cómo verificar el área, el dato ni al titular.
- En 2025 la CNV suspendió y denunció a Atómico 3: permisos a nombre de un tercero.

Notas del orador: abrir con el caso local. Atómico 3 vendía un token de litio y los permisos no eran suyos (julio de 2025). El problema de fondo es la confianza. Dato de contexto: los exploradores en etapa inicial recibieron el 12% de lo colocado en TSX y TSXV en 2025 (fuente única, Fastmarkets, abril de 2026).

## Slide 2 · Solución

**Cateo: un estudio satelital que cualquiera puede recomputar, atestado en Avalanche.**

- Dibujás el área y pagás el estudio en USDC.
- El satélite procesa Sentinel-2 real y deja la atestación on-chain.
- Con esa atestación abrís una colecta de exploración en escrow.

Notas del orador: decir en voz alta el límite. El estudio muestra alteración superficial (óxidos de hierro, arcillas) sobre un porcentaje del polígono. Es un filtro previo al campo. Ninguna ley, tonelaje ni valor.

## Slide 3 · Cómo funciona: del dato al contrato

**Polígono → escena Sentinel-2 → índices → hash → contrato.**

- `pedirEstudio`: el polígono queda público en un evento.
- El satélite calcula B04/B02 (óxidos férricos) y B11/B12 (arcillas) y llama a `atestar` con el hash del informe.
- `crearColecta` solo acepta estudios atestados; los aportes van a escrow con reembolso.

Notas del orador: mostrar el diagrama de una línea. Datos: Earth Search STAC, colección sentinel-2-c1-l2a, sin clave. Atribución en pantalla: "Contains modified Copernicus Sentinel data [año de la escena]". Red: Fuji C-Chain, chain ID 43113.

## Slide 4 · Por qué blockchain

**Cuatro respuestas.**

- Quién desconfía de quién: el inversor, del titular del área.
- Qué se dispara on-chain: la atestación habilita la colecta; los aportes quedan en escrow.
- Si el dato miente: se recomputa desde la escena y el hash; si no se llega a la meta, reembolso.

Notas del orador: la cuarta respuesta va hablada y se retoma en el slide 6: el titular paga el estudio, los aportantes fondean, la plataforma cobra el estudio. Aclarar qué prueba la atestación: quién firmó qué, cuándo y sobre qué datos. Hoy firma un solo satélite; el paso siguiente es un quórum de firmantes o Chainlink CRE, que ya corre en Fuji.

## Slide 5 · Demo

**Cuatro transacciones en Fuji.**

- Pedido de estudio: [INPUT link del explorer]
- Atestación: [INPUT link del explorer]
- Colecta creada y aporte en USDC de prueba: [INPUT links del explorer]

Notas del orador: correr en vivo sobre un polígono de la Puna ([INPUT] cuál) y terminar con `verificar`: el hash recomputado coincide con el on-chain. Tener las transacciones de respaldo ya confirmadas. Contrato: [INPUT dirección en Fuji].

## Slide 6 · Modelo de negocio

**Quién paga y quién cobra.**

- El titular paga el estudio: USD 300 con datos gratuitos; premium con imagen comercial a costo más 30%.
- Inversores y PSAV pagan monitoreo: USD 50 por mes por polígono.
- Colectas reales: comisión de 3% a 7%, solo a través de un PFC o PSAV registrado en CNV.

Notas del orador: los precios son propuesta inicial, a validar con 5 entrevistas. El costo variable de un estudio base es menor a USD 0,20 (imagen gratuita, cómputo de segundos, dos transacciones). En el hackathon la colecta usa activos simulados con datos reales, como pide el reglamento.

## Slide 7 · Próximos pasos y fuentes

**De un firmante en Fuji a una colecta regulada.**

- Quórum de firmantes o Chainlink CRE, y cruce con el catastro minero de Salta.
- Co-firma de un geólogo matriculado y socio PFC o PSAV (RG 1125, sandbox hasta el 31/12/2027).
- Fuentes: Copernicus Sentinel-2 vía Earth Search, CNV, Código de Minería (Ley 24.498), Avalanche docs.

Notas del orador: cerrar con el pedido concreto: contactos en la Secretaría de Minería de Salta, en REMSA y en una plataforma de financiamiento colectivo registrada. Equipo: [INPUT]. Links: repo [INPUT], demo [INPUT].
