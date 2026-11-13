---
name: Cateo
colors:
  fondo: "oklch(1 0 0)"
  superficie: "oklch(0.972 0.004 230)"
  linea: "oklch(0.885 0.008 230)"
  tinta: "oklch(0.23 0.025 240)"
  tinta-2: "oklch(0.42 0.02 240)"
  primario: "oklch(0.36 0.075 235)"
  oxidos: "oklch(0.5 0.16 30)"
  arcillas: "oklch(0.47 0.085 205)"
  bien: "oklch(0.42 0.1 152)"
  mal: "oklch(0.47 0.17 25)"
typography:
  titulo: "Source Serif 4, 600"
  cuerpo: "IBM Plex Sans, 400/500/600, 16px"
  dato: "IBM Plex Mono, 400/500, cifras tabulares"
rounded: "4px"
---

# Cateo · sistema visual

Los valores viven en `web/app/globals.css` (`:root`). Si un token cambia, se cambia acá y allá.

## Overview

Un instrumento de medición: carta geológica, certificado de laboratorio, visor de catastro. Tema claro, pensado para verse proyectado en una sala con luz. Color contenido: blanco, tinta azul y líneas finas; el único color fuerte son los dos índices.

## Colors

- **Fondo blanco puro** y una superficie apenas teñida hacia el azul para paneles de lectura.
- **Tinta azul** (`primario`) para acciones y enlaces. Una sola acción llena por pantalla.
- **Óxidos** (rojo ocre, marca cuadrada) y **arcillas** (verde azulado, marca redonda): siempre con etiqueta y forma además del tono, para que se distingan con daltonismo. Las rampas del mapa van de amarillo a rojo y de celeste a petróleo.
- Verde y rojo de estado solo en la verificación (coincide, no coincide) y en errores.

## Typography

Serif para títulos y cifras de resultado (tono de informe), sans para el cuerpo, mono para todo lo que viene de la cadena: direcciones, hashes, escenas, bandas.

## Layout

Estudio y pedido: mapa a la izquierda ocupando el alto de la ventana, ficha a la derecha (22 a 30 rem). En móvil el mapa va arriba (56% del alto) y la ficha debajo. Listas como filas con líneas, sin tarjetas. Reglas negras de 1 px abren cada sección, como en una tabla de informe.

## Components

- **Recorrido**: Área, Estudio, Atestación, Colecta. Numerado porque es una secuencia real.
- **Medida**: cifra grande, qué mide en palabras, cómo se calculó en mono.
- **Límite**: panel "Qué no afirma este estudio", siempre junto al resultado.
- **Verificación**: resultado de recomputar, con fondo verde o rojo suave.
- **Declarado**: borde punteado para lo que nadie verificó (el expediente minero).
- Botones de 44 px de alto, radio 4 px, sin sombras.

## Do's and Don'ts

- Sí: cada número con su escena, fecha y transacción a un clic.
- Sí: unidades y umbrales a la vista.
- No: cifras de dinero grandes fuera de la colecta, verdes y rojos de rendimiento, degradés decorativos, vidrio, neón.
- No: animación decorativa. Solo transiciones de estado de 120 ms.
