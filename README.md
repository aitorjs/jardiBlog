# aitor.info web personal

## Galería

- Poner un placeholder o skeleton mientras carga las imagenes en el grid y en el detalle de la foto.
- Meter fecha de foto en la info adicional.
- AL estar encima de la imagen en el grid sacar una lupa que haga ver que se puede ampliar la foto.
- En pc el zoom va mal. En movil en horizontal no se puede ir mas abajo de lo que se ve en la foto. Poner boton de pantalla completa en movil.
- Precargar la siguiente/anterior foto para que el cambio sea instantáneo al hacer swipe o darle al boton de siguiente/anterior.


- cada vez que hago un push, pages cambia el custom, porque? que no lo cambie en cada push

- Hacer que funcionen las fotos por tags. Tag de huerta26, huerta25, h24, balcón. fraisoro, blasenea... asi algunos tags pueden ponerse en el grid desde json definiendo que tags quiero que muestre. recuerda que en grid es como una carpeta y asi podemos poner la ruta al tag y al click vaya a ella.

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
- 4 Precargar la foto siguiente y anterior en cuanto se abre el visor, para que el swipe/flecha sea instantáneo en vez de esperar la descarga.
- 5 Generar también `avif` además de `webp` (mejor compresión, y `getImage` lo soporta igual de fácil); usar `<picture>` con ambos formates y que el navegador elija.
- 6 Cargar la primera imagen del grid con `loading="eager"` en vez de `lazy` — mejora el LCP, ya que hoy hasta la foto más visible espera al lazy-loading.

**Accesibilidad**
- Foco atrapado dentro del visor mientras está abierto (si no, con Tab se puede "escapar" al contenido de detrás sin verlo).
- Devolver el foco al botón de la miniatura al cerrar, no dejarlo perdido en el `<body>`.
- `aria-live` en el contador (`3 / 12`) para que un lector de pantalla anuncie el cambio de foto.
- Falta `role="dialog"` y `aria-modal="true"` en el lightbox.

**UX**
- 1 El swipe hoy es "todo o nada" (se decide solo al soltar el dedo). Un arrastre que siga el dedo en tiempo real (la imagen se mueve contigo, el fondo se atenúa progresivamente) se siente mucho más "vivo" — así es como lo hace Google Photos/Instagram de verdad, no solo el resultado final.
- 2 Doble-tap o pellizco para hacer zoom en la foto grande — en un jardín, la típica fotos de una hoja con una plaga es justo donde la gente querrá acercarse.
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