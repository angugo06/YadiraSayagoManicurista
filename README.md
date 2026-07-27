# Luucyy Nails · sitio web

Sitio estático de varias páginas. Sin frameworks ni build, listo para GitHub Pages.

## Estructura

```
index.html          Inicio (hero, sobre Yadira, adelanto de portafolio)
portafolio.html     Galería filtrable por técnica
servicios.html      Servicios y especialidades
prensa.html         Reconocimiento y medios
agenda.html         Reserva (Calendly) y contacto
assets/styles.css   Estilos compartidos
assets/app.js       Interacciones compartidas (galería, filtros, lightbox, contadores, menú)
```

Los nombres, el menú y el pie se repiten en cada archivo a propósito: así cada página
funciona sola, sin depender de JavaScript para lo esencial.

## Publicar en GitHub Pages

1. Crea un repositorio (ej. `luucyy-nails`) y sube todos estos archivos a la raíz.
2. En el repo: Settings > Pages > Source: rama `main`, carpeta `/root`.
3. Queda en `https://TU-USUARIO.github.io/luucyy-nails/`.
4. Cuando compren dominio, agrega un archivo `CNAME` con el dominio y configúralo en Pages.

## Reemplazar los placeholders por fotos reales

Cada recuadro de color es un placeholder etiquetado con el nombre real de la carpeta.
Para la versión final:

- Guarda las fotos en `assets/img/` (formato `.webp` o `.jpg` optimizado).
- En `assets/app.js`, cada pieza del arreglo `PIEZAS` puede llevar una ruta de imagen;
  cambia la función `tileHTML` para usar `<img src=...>` en lugar del degradado.
- Para el hero, el "sobre Yadira" y las tomas de prensa, sustituye los bloques
  `.ph-label` / `.ph-mini` por una etiqueta `<img>`.

## Integrar Calendly de verdad (agenda.html)

Reemplaza el bloque `.fake` y el botón por el widget embebido:

```html
<div class="calendly-inline-widget"
     data-url="https://calendly.com/yadira-sayago-1503/manicura"
     style="min-width:320px;height:640px;"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

## Contacto

WhatsApp 55 2869 5896 · Instagram @luucyy_nails · yadira.sayago.1503@gmail.com
