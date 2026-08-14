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
assets/img/         Fotos reales, agrupadas por categoría
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
| `--raspberry` | `#B83A6E` | Botones y enlaces (hover `--raspberry-dark`) |
| `--mint` | `#F2FEDC` | Fondo alterno para separar secciones |
| `--olive-deep` | `#6F6240` | Bloque oscuro cálido que sí admite texto blanco |

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
- Raspberry solo para botones y enlaces.
- El amarillo aparece una o dos veces por página, no más.
- Nada de pastel sobre pastel.
- Bordes y separadores: olivo al 25% (`--line`). Sombras siempre cálidas, nunca grises.
- Foco de teclado: contorno Ink de 2px con 2px de separación.

### Dos apartes del manual

1. La matriz publica **Raspberry sobre Petal como 4.5 AA**; el valor real es
   **4.2:1**, que reprueba. Por eso en bloques petal el texto de acento va en Ink
   (`.band--petal .eyebrow`).
2. El manual se contradice con el olivo: la ficha y los "No" prohíben texto
   encima, pero el demo incluye una etiqueta olivo con texto. Aquí gana la regla
   escrita — el olivo es solo decorativo.

`.btn-olive` está definido y disponible, pero hoy no se usa en ninguna página.

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
