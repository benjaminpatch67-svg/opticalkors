# Óptica Kors — Sitio web

Sitio web completo, moderno y responsive para una óptica, construido con HTML5, CSS3 y JavaScript ES6 puro (sin frameworks de build). Incluye 7 páginas, sistema de diseño propio, animaciones con AOS, formularios validados en el cliente y estructura optimizada para SEO.

## Estructura del proyecto

```
/optica
│
├── index.html            → Página de inicio (todas las secciones principales)
├── nosotros.html         → Historia, misión, visión, valores y equipo
├── servicios.html        → Detalle de los 8 servicios y proceso de atención
├── catalogo.html         → Catálogo completo con filtros por categoría
├── promociones.html      → Promociones vigentes y condiciones
├── blog.html             → Índice de artículos del blog
├── contacto.html         → Datos de contacto, mapa y formularios (cita + mensaje)
│
├── blog/                 → Artículos individuales del blog (8 páginas)
│
├── css/
│   ├── style.css          → Sistema de diseño y estilos de componentes
│   ├── responsive.css      → Ajustes mobile-first por breakpoint
│   └── articulo.css        → Estilos específicos de los artículos del blog
│
├── js/
│   ├── main.js             → Navegación, formularios, filtros, acordeón, slider, contadores
│   └── animations.js       → Inicialización de AOS y animación de enfoque (marca)
│
├── img/                   → Imágenes propias del sitio, todas en formato WebP
│   ├── logo.webp, hero-optometra.webp, fachada-optica.webp, fondo-page-header.webp
│   ├── hombre/             → Monturas para hombre (catálogo)
│   ├── mujer/              → Monturas para mujer (catálogo)
│   ├── infantil/           → Monturas infantiles (catálogo)
│   └── contacto/           → Lentes de contacto (catálogo) — imágenes de referencia,
│                              reemplázalas por fotos reales (ver sección abajo)
│
├── assets/
│   ├── images/og-cover.jpg → Imagen para Open Graph / Twitter Card
│   └── icons/               → favicon.svg (principal) y favicon.png (fallback)
│
├── robots.txt
├── sitemap.xml             → Incluye las 7 páginas principales + 8 artículos del blog
└── README.md
```

## Concepto de diseño: "Enfoque"

El signo visual central del sitio es el gesto óptico de **enfocar**: pasar de lo
difuso a lo nítido. Se expresa en tres lugares:

1. **El héroe**: la fotografía principal carga desenfocada y se aclara suavemente
   al terminar de cargar la página (`focus-frame` en `style.css` + `initFocusReveal()`
   en `animations.js`).
2. **El anillo de lente**: un marco circular doble (dorado + azul) enmarca la
   imagen del héroe, evocando un par de lentes.
3. **El acento dorado** (`--color-gold`, #C9A961): simula el destello de un
   cristal y se usa con moderación en eyebrows, badges y promociones.

### Paleta
| Token | Hex | Uso |
|---|---|---|
| `--color-white` | #FFFFFF | Fondo base |
| `--color-navy` | #0F172A | Textos principales, botones primarios, footer |
| `--color-blue` / `--color-blue-dark` | #3B82F6 / #2563EB | Acento interactivo (enlaces, hover) |
| `--color-gray-light` | #F8FAFC | Fondos alternos de sección |
| `--color-gray-dark` | #334155 | Texto secundario |
| `--color-gold` | #C9A961 | Acento de firma (dorado, "destello de lente") |

### Tipografía
- **Poppins** — títulos y elementos de marca (peso 600–700).
- **Inter** — cuerpo de texto, formularios y navegación (peso 400–600).

## Cómo publicar el sitio

1. Reemplaza las imágenes de `https://placehold.co/...` en cada archivo HTML por
   fotografías reales de tu óptica (guárdalas en `assets/images/`).
2. Actualiza los datos de contacto (dirección, teléfono, WhatsApp, correo y
   horarios) en todas las páginas — aparecen en la sección de contacto y en el pie de página.
3. Reemplaza el mapa embebido de Google Maps por la URL específica de tu ubicación
   (usa el botón "Compartir → Insertar un mapa" desde Google Maps).
4. Conecta los formularios (`#appointment-form` y `#contact-form` en `js/main.js`)
   a tu backend o servicio de formularios (por ejemplo, un endpoint propio, Formspree
   o EmailJS). Actualmente la validación es 100% del lado del cliente y el envío
   simula un éxito visual; el `fetch`/`POST` real debe añadirse dentro del
   listener `submit` de cada formulario.
5. Actualiza `sitemap.xml`, `robots.txt` y las etiquetas `og:` con el dominio real.
6. Sube los archivos a tu hosting (Netlify, Vercel, cPanel, GitHub Pages, etc.).

## Cómo cambiar las fotos del catálogo (incluye Lentes de contacto)

Cada producto del catálogo (`catalogo.html`) es una tarjeta `.product-card` con
una imagen (`<img src="...">`) y, en la mayoría de los casos, un botón "Vista
rápida" que también referencia la misma imagen mediante `data-img`. Para
cambiar una foto:

1. Ubica la carpeta de la categoría dentro de `img/` (`hombre/`, `mujer/`,
   `infantil/` o `contacto/`).
2. Sube tu foto nueva a esa carpeta. Puedes usar `.webp`, `.jpg` o `.png`.
3. En `catalogo.html`, busca la tarjeta del producto y actualiza **dos**
   lugares con el nuevo nombre de archivo:
   - el atributo `src` de la etiqueta `<img>`
   - el atributo `data-img` del botón `Vista rápida` (si la tarjeta lo tiene)
4. Si cambias el nombre del archivo (por ejemplo de `contacto-1.svg` a
   `acuvue-oasys-real.webp`), asegúrate de que ambos atributos usen el mismo
   nombre nuevo.

**Lentes de contacto:** la sección "Lentes de contacto" del catálogo usa
imágenes de referencia (ilustraciones, no fotos reales) ubicadas en
`img/contacto/contacto-1.svg` a `contacto-6.svg`, marcadas con la etiqueta
"Foto de referencia". Reemplázalas por fotografías reales de tus productos
(cajas, blísteres o empaques) siguiendo los pasos de arriba — recomendado
500×400px, fondo claro y producto centrado para que se vea igual de bien que
el resto del catálogo. También puedes agregar más productos de lentes de
contacto copiando el bloque `<div class="product-card" data-category="contacto">`
de uno existente en `catalogo.html` y cambiando la imagen, marca, nombre y
especificaciones.

## Rendimiento y SEO

- Imágenes con `loading="lazy"` (excepto la del héroe, que carga de inmediato).
- Metaetiquetas `description`, `keywords`, Open Graph y Twitter Card en cada página.
- Marcado `schema.org/Optician` con datos estructurados en `index.html`.
- HTML semántico (`header`, `nav`, `section`, `article`, `footer`).
- Accesibilidad: foco visible (`:focus-visible`), textos alternativos en imágenes,
  `aria-label`/`aria-expanded` en controles interactivos, y respeto por
  `prefers-reduced-motion`.

## Librerías externas (CDN)

- [Font Awesome 6.5.1](https://cdnjs.com/libraries/font-awesome) — iconografía.
- [AOS 2.3.4](https://michalsnik.github.io/aos/) — animaciones al hacer scroll.
- [Google Fonts](https://fonts.google.com/) — Poppins e Inter.

No se requiere ningún paso de build: el proyecto funciona abriendo `index.html`
directamente o sirviéndolo desde cualquier hosting estático.

esta es la acutalizacion n1 de la pag.
