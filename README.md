# aitor.info web personal

## Galería

- Poner un placeholder o skeleton mientras carga las imagenes en el grid y en el detalle de la foto.
- Meter fecha de foto en la info adicional.
- AL estar encima de la imagen en el grid sacar una lupa que haga ver que se puede ampliar la foto.
- Precargar la siguiente/anterior foto para que el cambio sea instantáneo al hacer swipe o darle al boton de siguiente/anterior.
- Boton de ir para atras visible en cualquier momento



- Hacer que funcionen las fotos por tags. Tag de huerta26, huerta25, h24, balcón. fraisoro, blasenea... asi algunos tags pueden ponerse en el grid desde json definiendo que tags quiero que muestre. recuerda que en grid es como una carpeta y asi podemos poner la ruta al tag y al click vaya a ella.


### Click de las 3 imagenes de la galeria

Para no repetir el `<script>` y el markup del lightbox en cada página, lo mejor es sacarlo a un **componente reutilizable** que reciba las imágenes como prop. Así lo usás tanto en la sección de "últimas fotos" como en una página que liste **todas** las de la colección.

## 1. Crear el componente `Lightbox.astro`

```astro
---
// src/components/Lightbox.astro
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Foto {
  image: ImageMetadata;
  alt: string;
  title: string;
}

interface Props {
  fotos: Foto[];
}

const { fotos } = Astro.props;
---

<div class="grid">
  {fotos.map((foto, index) => (
    <figure class="item">
      <button type="button" class="open-lightbox" data-index={index}>
        <Image src={foto.image} alt={foto.alt} width={500} height={350} />
      </button>
      <figcaption>{foto.title}</figcaption>
    </figure>
  ))}
</div>

<div class="lightbox" id="lightbox">
  <button class="lightbox-close" id="lightbox-close" aria-label="Cerrar">✕</button>
  <button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Anterior">‹</button>
  <img id="lightbox-img" src="" alt="" />
  <button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Siguiente">›</button>
  <p class="lightbox-caption" id="lightbox-caption"></p>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .item {
    margin: 0;
  }

  .open-lightbox {
    all: unset;
    display: block;
    cursor: pointer;
    width: 100%;
  }

  .item :global(img) {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    display: block;
    border-radius: 8px;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  .lightbox {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    align-items: center;
    justify-content: center;
  }

  .lightbox.open {
    display: flex;
  }

  .lightbox img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 4px;
  }

  .lightbox-caption {
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
    text-align: center;
    color: white;
    font-size: 0.95rem;
  }

  .lightbox-close,
  .lightbox-nav {
    position: absolute;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    line-height: 1;
  }

  .lightbox-close {
    top: 1rem;
    right: 1rem;
  }

  .lightbox-prev {
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .lightbox-next {
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
</style>

<script define:vars={{ fotos: fotos.map(f => ({ src: f.image.src, alt: f.alt, title: f.title })) }}>
  const containers = document.querySelectorAll('.grid');
  // Nos aseguramos de tomar el lightbox más cercano si hay varios en la página
  const lightbox = document.currentScript.previousElementSibling.previousElementSibling; // fallback simple
</script>

<script define:vars={{ fotosData: fotos.map(f => ({ src: f.image.src, alt: f.alt, title: f.title })) }}>
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + fotosData.length) % fotosData.length;
    const foto = fotosData[currentIndex];
    lightboxImg.src = foto.src;
    lightboxImg.alt = foto.alt;
    lightboxCaption.textContent = foto.title;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-lightbox').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(Number(btn.dataset.index)));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
  });
</script>
```

Nota: dejé sin usar el primer bloque de `<script>` que puse por error al probar una idea — borralo, quedate solo con el segundo (el que arranca con `const lightbox = document.getElementById('lightbox')`). Te lo dejo limpio abajo del todo para copiar directo.

## 2. Usarlo en la sección de "últimas 3 fotos"

```astro
---
import { getCollection } from 'astro:content';
import Lightbox from '../components/Lightbox.astro';

const todasLasFotos = await getCollection('gallery');

const ultimasTres = todasLasFotos
  .sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf())
  .slice(0, 3)
  .map((foto) => ({
    image: foto.data.image,
    alt: foto.data.alt,
    title: foto.data.title,
  }));
---

<h2>Últimas fotos</h2>
<Lightbox fotos={ultimasTres} />
```

## 3. Usarlo en una página con TODA la galería

```astro
---
// src/pages/galeria.astro
import { getCollection } from 'astro:content';
import Lightbox from '../components/Lightbox.astro';

const todasLasFotos = await getCollection('gallery');

const fotos = todasLasFotos
  .sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf())
  .map((foto) => ({
    image: foto.data.image,
    alt: foto.data.alt,
    title: foto.data.title,
  }));
---

<h1>Galería completa</h1>
<Lightbox fotos={fotos} />
```

## Por qué así

- **Un solo componente, reutilizado con distintos props**: le pasás el array que quieras (3 últimas, todas, filtradas por categoría, etc.) y el componente arma su propio grid + lightbox + navegación.
- **No hay conflicto entre instancias**: si en algún momento ponés el componente dos veces en la misma página, vas a necesitar IDs únicos (`id="lightbox"` se duplicaría). Por ahora, si lo usás **una sola vez por página** (como en tus dos casos), no hay problema.

Si en algún momento pensás poner el componente **más de una vez en la misma página** (por ejemplo, "últimas fotos" arriba y "galería completa" abajo, ambas con su propio lightbox), avisame y lo ajusto para que cada instancia tenga IDs únicos y no se pisen entre sí.

### Otro

Bien, vamos a montarlo. La pieza nueva es un helper (`src/lib/gallery.ts`) que centraliza la optimización de imágenes, para no duplicar esa lógica en dos páginas.

## 1. `src/data/albums.json`

```json
[
  {
    "id": "primavera-2026",
    "title": "Primavera 2026",
    "description": "Semilleros, trasplantes y primeras flores."
  },
  {
    "id": "terraza",
    "title": "Terraza",
    "description": "El rincón de la terraza a lo largo del año."
  }
]
```

## 2. `src/data/gallery.json` (añade el campo `album`)

```json
[
  {
    "id": "semilleros-trasplantados",
    "album": "primavera-2026",
    "title": "Semilleros trasplantados",
    "description": "Plántulas recién repicadas a macetas individuales, esperando turno para salir al bancal.",
    "tags": ["semillero", "plántulas", "trasplante"]
  },
  {
    "id": "enfermedades-fungicas",
    "album": "primavera-2026",
    "title": "Chuleta de enfermedades fúngicas",
    "description": "Guía rápida para identificar oídio, mildiu, botrytis, roya, alternaria y chancro.",
    "tags": ["enfermedades", "hongos", "guía"]
  },
  {
    "id": "rincon-terraza",
    "album": "terraza",
    "title": "Rincón de la terraza",
    "description": "Manzanilla y tomates ganando altura, apoyados en cañas y una cesta reciclada como tutor.",
    "tags": ["terraza", "tomates", "manzanilla"]
  }
]
```

**Estructura de carpetas de imágenes** (igual que antes, un nivel más):

```
src/assets/gallery/
  primavera-2026/
    semilleros-trasplantados.jpg
    enfermedades-fungicas.jpg
  terraza/
    rincon-terraza.jpg
```

## 3. `src/lib/gallery.ts` (nuevo)```ts
// src/lib/gallery.ts
import { getImage } from 'astro:assets';
import galleryMeta from '../data/gallery.json';

// import.meta.glob resuelve rutas relativas a ESTE archivo (src/lib/gallery.ts)
const imageFiles = import.meta.glob('../assets/gallery/*/*.{jpg,jpeg,png,webp}', { eager: true });

export async function getPhotos() {
  return Promise.all(
    galleryMeta.map(async (item) => {
      const entry = Object.entries(imageFiles).find(([path]) =>
        path.includes(`/${item.album}/${item.id}.`)
      );

      if (!entry) {
        throw new Error(
          `No se encontró la imagen para "${item.album}/${item.id}" en src/assets/gallery`
        );
      }

      const source = entry[1].default;

      const full = await getImage({ src: source, width: 1600, format: 'webp', quality: 80 });
      const thumb = await getImage({
        src: source,
        width: 500,
        height: 500,
        fit: 'cover',
        format: 'webp',
        quality: 70,
      });

      return {
        ...item,
        src: full.src,
        thumbSrc: thumb.src,
        width: full.attributes.width,
        height: full.attributes.height,
      };
    })
  );
}
```

## 4. `src/pages/gallery/index.astro` (nuevo — lista de álbumes)

**Importante**: borra el `src/pages/gallery.astro` que tenías, ya que ahora la ruta `/gallery` la genera la carpeta `src/pages/gallery/` (no pueden coexistir un archivo y una carpeta con el mismo nombre de ruta).```astro
---
// src/pages/gallery/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import albums from '../../data/albums.json';
import { getPhotos } from '../../lib/gallery';

const photos = await getPhotos();

const albumsWithCover = albums.map((album) => {
  const albumPhotos = photos.filter((p) => p.album === album.id);
  return {
    ...album,
    cover: albumPhotos[0]?.thumbSrc,
    count: albumPhotos.length,
  };
});
---

<BaseLayout title="Galería" description="Álbumes del jardín" sideBarActiveItemID="gallery">
  <div class="mb-6">
    <h1 class="text-2xl font-bold">Diario del jardín</h1>
    <p class="text-sm opacity-70">Álbumes con fotos del huerto.</p>
  </div>

  <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
    {albumsWithCover.map((album) => (
      
        href={`/gallery/${album.id}`}
        class="group block overflow-hidden rounded-xl bg-base-200 transition-shadow hover:shadow-lg"
      >
        <div class="aspect-square overflow-hidden">
          {album.cover && (
            <img
              src={album.cover}
              alt={album.title}
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div class="p-3">
          <h2 class="font-semibold">{album.title}</h2>
          <p class="text-xs opacity-60">{album.count} fotos</p>
        </div>
      </a>
    ))}
  </div>
</BaseLayout>
```

## 5. `src/pages/gallery/[album].astro` (nuevo — grid + visor de un álbum)

Es el mismo lightbox de siempre, solo que ahora filtrado por álbum y generado como ruta estática con `getStaticPaths`.Te dejo los 5 archivos preparados para descargar:Colócalos así en tu repo:

```
albums.json            → src/data/albums.json
gallery.json           → src/data/gallery.json  (sustituye al actual)
gallery.ts             → src/lib/gallery.ts      (carpeta lib es nueva)
index.astro            → src/pages/gallery/index.astro
[album].astro          → src/pages/gallery/[album].astro
```

Y borra `src/pages/gallery.astro` (el archivo suelto de antes), ya que ahora esa ruta la crea la carpeta `src/pages/gallery/`.

Las imágenes se quedan donde están en `src/assets/gallery/`, solo tienes que organizarlas en subcarpetas por álbum (`primavera-2026/`, `terraza/`) moviendo cada `.jpg` a la que le toque.

Pruébalo con `pnpm run dev` y me cuentas.


-----


Buena pregunta para parar y repasar. Sin tocar lo de álbumes, esto es lo que puliría del grid + visor tal como está:

**Rendimiento**
- X Precargar la foto siguiente y anterior en cuanto se abre el visor, para que el swipe/flecha sea instantáneo en vez de esperar la descarga.
- X Generar también `avif` además de `webp` (mejor compresión, y `getImage` lo soporta igual de fácil); usar `<picture>` con ambos formates y que el navegador elija.
- X Cargar la primera imagen del grid con `loading="eager"` en vez de `lazy` — mejora el LCP, ya que hoy hasta la foto más visible espera al lazy-loading.

**Accesibilidad**
- Foco atrapado dentro del visor mientras está abierto (si no, con Tab se puede "escapar" al contenido de detrás sin verlo).
- Devolver el foco al botón de la miniatura al cerrar, no dejarlo perdido en el `<body>`.
- `aria-live` en el contador (`3 / 12`) para que un lector de pantalla anuncie el cambio de foto.
- Falta `role="dialog"` y `aria-modal="true"` en el lightbox.

**UX**
- X El swipe hoy es "todo o nada" (se decide solo al soltar el dedo). Un arrastre que siga el dedo en tiempo real (la imagen se mueve contigo, el fondo se atenúa progresivamente) se siente mucho más "vivo" — así es como lo hace Google Photos/Instagram de verdad, no solo el resultado final.
- X Doble-tap o pellizco para hacer zoom en la foto grande — en un jardín, la típica fotos de una hoja con una plaga es justo donde la gente querrá acercarse.
- Puntitos o miniaturas de posición en vez de solo el texto "3 / 12".

**Robustez**
- En iOS Safari, `overflow: hidden` en el `<body>` no siempre bloquea el scroll de fondo del todo cuando el dedo está sobre el propio visor — mejor fijar el body con `position: fixed` mientras está abierto.
- Si `getImage()` falla para una foto (archivo mal nombrado, etc.) hoy lanza un error en build que tira toda la página — podría degradarse mejor (avisar en consola y saltarse esa foto) según cuánto te preocupe que un typo tumbe el build entero.

**Escala** (si algún día tienes 50+ fotos en vez de 3-6)
- 7 Paginar o cargar el grid en tandas (hoy se genera todo de golpe, no pasa nada con pocas fotos pero con muchas el HTML inicial crecería).

No haría todo esto a la vez — para una galería personal, yo priorizaría **precarga de siguiente/anterior** y el **arrastre en tiempo real** (son los que más se notan al usarlo), y dejaría accesibilidad avanzada y avif como algo opcional. 


-----


Con gusto. La diferencia está en **cuándo se entera el usuario de que su gesto está siendo reconocido**.

**Cómo funciona ahora mismo:**
1. `touchstart` → guarda la posición inicial.
2. Mientras el dedo se mueve por la pantalla, no pasa nada visualmente. La foto está clavada en su sitio.
3. `touchend` → se calcula `dx`/`dy` de golpe, se compara con el umbral (45px) y se decide: ¿fue swipe arriba, abajo, izquierda o derecha? Se ejecuta la acción entera de golpe (abre info, cierra, cambia de foto).

Es "todo o nada" porque no hay ningún estado intermedio: o no pasó nada (si no llegaste al umbral) o pasó la acción completa, instantáneamente, cuando levantas el dedo. El usuario no tiene ninguna pista visual de "voy por buen camino" mientras arrastra.

**Cómo lo hace Google Photos/Instagram:**

1. `touchstart` → igual, guarda posición inicial.
2. `touchmove` (aquí está la diferencia) → en cada frame, mueves la imagen con `transform: translateY(deltaY)` siguiendo literalmente el dedo. La foto "viaja" contigo en tiempo real, 1:1 con el gesto. A la vez, el fondo negro va perdiendo opacidad proporcionalmente a cuánto has arrastrado (`backdrop-opacity = 1 - dy/300`, por ejemplo) — así ves el contenido de detrás asomando poco a poco, dándote la sensación de que estás "levantando" la foto.
3. `touchend` → aquí ya no se decide desde cero, se **resuelve** lo que ya estaba pasando visualmente:
   - Si soltaste habiendo arrastrado poco → animación de "muelle" que devuelve la foto a su sitio original (rubber-banding), como si dijera "no ha sido suficiente, aquí me quedo".
   - Si arrastraste más allá del umbral (o soltaste con velocidad alta, aunque no hayas llegado muy lejos) → la animación *continúa* en la misma dirección hasta completar la acción (cerrar del todo, o deslizar el panel de info hasta el final), en vez de saltar de golpe.

**Por qué se siente distinto** aunque el resultado final (abrir info / cerrar) sea el mismo:
- Es **cancelable a medio camino**: si empiezas a arrastrar y te arrepientes, puedes volver el dedo a su sitio antes de soltar y ves cómo la foto "vuelve" contigo — con el sistema actual, si no llegas al umbral simplemente no pasa nada, pero si te pasas de umbral sin querer, ya se disparó la acción sin remedio.
- Da **feedback continuo**: sabes en todo momento cuánto te falta para que se active algo, en vez de un veredicto sorpresa al levantar el dedo.
- Aprovecha la **velocidad del gesto**, no solo la distancia: un swipe rápido y corto puede disparar la acción igual que uno lento y largo, porque se mide también cuán rápido te movías al soltar (esto se calcula guardando un par de posiciones recientes con sus timestamps durante el `touchmove`, no solo el punto inicial y final).

Técnicamente implica reemplazar el `touchend`-only por: escuchar `touchmove` para actualizar `transform` e `opacity` del fondo en vivo (usando `requestAnimationFrame` para no saturar el hilo principal), y en `touchend` decidir entre "completar con una transición corta hasta el final" o "volver con un muelle" según distancia + velocidad.

Es más código y algo más delicado de afinar (resistencia del arrastre, curvas de la animación de vuelta), pero es la pieza que más "premium" hace sentir un visor de fotos. ¿Lo implemento?

https://claude.ai/chat/cc0e9303-10c7-4e71-87b5-12e70124575b 