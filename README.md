# Luucyy Nails · sitio web

Sitio estático de varias páginas para Yadira Sayago, manicurista en CDMX.
Sin frameworks ni paso de build: se abre `index.html` y funciona.

## Estructura

```
index.html          Inicio (hero, datos, sobre Yadira, adelanto de portafolio)
portafolio.html     Galería filtrable por técnica
servicios.html      Servicios y especialidades
prensa.html         Reconocimiento y apariciones en medios
agenda.html         Reserva (Calendly embebido) y contacto
assets/styles.css   Sistema de diseño completo
assets/app.js       Filtros, lightbox, contadores, reveal, menú móvil
assets/img/luucyy-logo.png  Archivo fuente oficial con aro ampliado
assets/img/luucyy-logo-transparent.png  Versión web sin fondo
assets/img/luucyy-logo-wide.webp  Logotipo transparente recortado y optimizado
assets/img/         Fotos reales, agrupadas por categoría
robots.txt          Directivas para rastreadores
sitemap.xml         Inventario de URLs indexables
```

El menú y el pie se repiten en cada archivo a propósito: así cada página funciona
sola y nada esencial depende de JavaScript.

## Sistema de diseño · Manual de marca v2

Todo el color vive en `assets/styles.css`, en el bloque `:root`. Cada tono tiene
un rol y no se usa fuera de él.

| Token | Hex | Rol |
|---|---|---|
| `--white` | `#FEF9EE` | Lienzo principal de las páginas |
| `--jasmine` | `#FDDF85` | Amarillo protagonista · bloques y franjas |
| `--petal` | `#FFD7E9` | Rosa suave · tarjetas y secciones delicadas |
| `--olive` | `#9F8F65` | Tierra · **solo decorativo**, nunca lleva texto |
| `--ink` | `#3E2233` | Todo el texto · ancla oscura |
| `--raspberry` | `#B83A6E` | Acento de identidad dentro de la firma cromática `.rule` |
| `--mint` | `#F2FEDC` | Fondo alterno para separar secciones |
| `--olive-deep` | `#6F6240` | Acento principal: botones, rótulos y texto de acento |

### Verde en lugar de rosa

**Olive Deep es el color de acción y de acento del sitio.** Lleva los botones,
los rótulos (`.eyebrow`), el apellido del hero (`.name-accent`), los separadores
del marquee y el borde de los botones fantasma. Mide más contraste que raspberry
en todos los fondos claros —5.72 vs 5.17 sobre blanco cálido y mint, y 4.62 vs
4.17 sobre petal, donde raspberry reprueba.

El raspberry se retiró de la interfaz y quedó como color exclusivamente de
identidad dentro de la barra de marca. El logotipo oficial conserva sus colores
originales y se utiliza como archivo de imagen, sin reconstruirlo con tipografía web.

### Logotipo oficial

`assets/img/luucyy-logo.png` conserva el archivo fuente oficial con el aro “Nail
Artist” ampliado. `assets/img/luucyy-logo-transparent.png` retira únicamente el
fondo para integrarlo sin recuadros en la navegación y el pie de página; no hay
reconstrucciones tipográficas ni recoloreados. La interfaz carga
`assets/img/luucyy-logo-wide.webp`, un recorte transparente del mismo archivo,
para evitar descargar y esconder el lienzo cuadrado completo.

## SEO, accesibilidad y rendimiento

- Cada página incluye título y descripción únicos, URL canónica, metadatos
  Open Graph/Twitter, idioma `es-MX` y directivas de indexación.
- El inicio publica datos estructurados `BeautySalon`, `Person` y `WebSite` sin
  inventar dirección, horarios ni precios.
- `robots.txt` enlaza `sitemap.xml`, que enumera las cinco páginas públicas.
- Todas las fotografías visibles cargan WebP responsive con `srcset`, `sizes`,
  dimensiones intrínsecas y carga diferida bajo el primer pantallazo.
- La imagen principal usa prioridad alta; el resto usa `loading="lazy"` y
  `decoding="async"`.
- Hay enlace de salto, foco visible, jerarquía de encabezados continua,
  anuncios del filtro, diálogo con nombre y descripción, y reducción de
  movimiento según la preferencia del sistema.

El olivo claro `#9F8F65` **no sirve como texto** (3.03:1). Se queda en bordes,
marcos, viñetas y el contorno de los botones fantasma.

### Jerarquía de botones

| Clase | Uso | Sobre fondo claro | Sobre fondo Ink |
|---|---|---|---|
| `.btn-primary` | Acción principal (Agendar cita) | Olive Deep, texto blanco | **Jasmine, texto Ink** |
| `.btn-ghost` | Acción secundaria (Ver portafolio) | Contorno olivo, texto Ink | — |
| `.btn-ink` | Alterno, disponible | Ink, texto blanco | — |

El cambio a Jasmine sobre Ink no es decorativo: Olive Deep sobre Ink da **2.36:1**
y el botón se perdería. Jasmine da 10.85:1 y cumple el "hace que el botón
resalte" del manual 04. Aplica en el pie y en la tarjeta de agenda.

### Ritmo de secciones

Las páginas alternan fondos claros y cierran con un bloque oscuro:

| Página | Ritmo |
|---|---|
| Inicio | Warm White → **Jasmine** (datos) → Warm White → Mint (galería) → Ink |
| Portafolio | Mint (cabecera) → Warm White (rejilla) → Ink |
| Servicios | Mint (cabecera) → **Petal** (bloque delicado) → Ink |
| Prensa | Mint (cabecera) → Warm White → Ink |
| Agenda | Warm White → tarjeta **Ink** (hace resaltar el botón) → Ink |

Las bandas se disuelven en el lienzo con un degradado en los bordes (`.band`,
variables `--fade-in` / `--fade-out`). Las **franjas** —el ribbon de datos y el
marquee— van a filo limpio a propósito: deben leerse como franjas.

### Reglas que no se rompen

- Todo el texto en Ink. Blanco solo sobre Ink, Olive Deep o Raspberry.
- **Nunca texto sobre `--olive`**, en ningún color, ni texto escrito en olivo o amarillo.
- Raspberry solo en la firma cromática; los acentos y botones van en Olive Deep.
- El amarillo aparece una o dos veces por página, no más.
- Nada de pastel sobre pastel.
- Bordes y separadores: olivo al 25% (`--line`). Sombras siempre cálidas, nunca grises.
- Foco de teclado: contorno Ink de 2px con 2px de separación.

### Dos apartes del manual

1. La matriz publica **Raspberry sobre Petal como 4.5 AA**; el valor real es
   **4.2:1**, que reprueba. Por eso los enlaces dentro de un bloque petal van en
   Ink (`.band--petal .prose-link`). Los rótulos ya no lo necesitan desde que
   pasaron a Olive Deep, que ahí mide 4.62:1.
2. El manual se contradice con el olivo: la ficha y los "No" prohíben texto
   encima, pero el demo incluye una etiqueta olivo con texto. Aquí gana la regla
   escrita — el olivo es solo decorativo.

## Cambiar contenido

- **Fotos:** van en `assets/img/<categoría>/`. Cada pieza de la galería es un
  `<li class="cell" data-cat="..." data-label="...">` con su `<figure class="tile">`.
  El `data-cat` debe coincidir con el `data-f` del botón de filtro correspondiente.
- **Encuadre del hero:** se ajusta con la variable `--hero-focus` (por defecto
  `center center`).
- **Calendly:** ya está embebido en `agenda.html`. Para cambiar el evento, se
  edita el `data-url` del `div.calendly-inline-widget`.

## Publicar en GitHub Pages

1. Sube todo a la raíz del repositorio.
2. Settings → Pages → Source: rama `main`, carpeta `/root`.
3. Queda en `https://TU-USUARIO.github.io/<repo>/`.
4. Con dominio propio: agrega un archivo `CNAME` y configúralo en Pages.

## Contacto

WhatsApp 55 2869 5896 · Instagram [@luucyy_nails](https://instagram.com/luucyy_nails) · yadira.sayago.1503@gmail.com
