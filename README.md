# jardiBlog 🌱

**Diario de una huerta.** Blog personal donde se documenta el día a día de una huerta: siembras, cosechas, aprendizajes y una galería de fotos organizada por etiquetas.

🔗 Sitio en producción: [aitor.info](https://aitor.info)

## Descripción

jardiBlog es el proyecto personal de [aitor ibañez](https://github.com/aitorjs), pensado como un cuaderno de bitácora de su huerta. Combina entradas de blog (con un tono cercano, directo y en primera persona) con una galería de imágenes clasificada por etiquetas (por ejemplo, `lechuga`, `huerta25`, `balcón`...), de forma que cada foto puede quedar asociada tanto a una entrada del blog como a su correspondiente tag en la galería.

## Tecnologías

- [Astro](https://astro.build/) — generador de sitios estáticos
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) — estilos
- [pnpm](https://pnpm.io/) — gestor de paquetes
- GitHub Actions — integración/despliegue continuo

## Estructura del proyecto

```
/
├── .github/workflows/   # Flujos de CI/CD
├── .vscode/             # Configuración recomendada para VS Code
├── public/              # Archivos estáticos
├── src/                 # Código fuente (páginas, componentes, contenido)
├── astro.config.mjs     # Configuración de Astro
├── tailwind.config.cjs  # Configuración de Tailwind CSS
├── tsconfig.json        # Configuración de TypeScript
└── package.json
```

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [pnpm](https://pnpm.io/installation)

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/aitorjs/jardiBlog.git
cd jardiBlog
pnpm install
```

## Uso

| Comando          | Acción                                                  |
| ----------------- | -------------------------------------------------------- |
| `pnpm dev`     | Inicia el servidor de desarrollo en `localhost:4321`   |
| `pnpm build`   | Genera la versión de producción en `./dist/`           |
| `pnpm preview` | Previsualiza localmente la build de producción          |

## Contenido

- **Entradas de blog**: escritas con un tono cercano y práctico, en primera persona, con conceptos clave en negrita, algo de humor y un cierre a modo de "Aprendizajes".
- **Galería**: fotos ordenadas por fecha de publicación (descendente) y clasificadas mediante etiquetas, que permiten navegar por tema (por ejemplo, todas las fotos relacionadas con la lechuga).

## Analíticas

- La primera vez que visitas el sitio con ?no-track (por ejemplo https://aitor.info/?no-track), se guarda una cookie no-track=1 durante un año.
- En cada carga de página, el script comprueba si esa cookie existe antes de inyectar el <script> de GoatCounter. Si existe, no lo carga y por tanto esa visita no se contabiliza.
- Si en algún momento quieres reactivar el tracking, basta con visitar ?track para borrar la cookie.

## TODOs

GitHub Pages es solo hosting estático, así que no soporta `_redirects` (eso es específico de Netlify) ni redirecciones HTTP reales del lado del servidor. No pasa nada, hay una forma de conseguir el mismo efecto sin loader.

Lo que probablemente viste antes era la página de redirección que genera Astro por defecto, que incluye un mensaje visible tipo "Redirecting..." antes del `meta refresh`. La solución es sustituir esa página por una tuya, minimalista, que redirija de forma instantánea sin mostrar nada:

```js
// astro.config.mjs
i18n: {
  defaultLocale: "es",
  locales: ["es", "eu"],
  routing: {
    prefixDefaultLocale: true,
    redirectToDefaultLocale: false, // desactivamos la redirección automática de Astro
  },
}
```

Y creas tu propia página raíz:

```astro
---
// src/pages/index.astro
---
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=/es/" />
    <link rel="canonical" href="/es/" />
    <script>location.replace("/es/");</script>
  </head>
  <body></body>
</html>
```

Puntos clave por qué esto no muestra loader:

- **`<script>` en el `<head>`, sin body**: se ejecuta antes de que el navegador tenga nada que pintar, así que la redirección ocurre en microsegundos, sin flash visible de contenido.
- **Sin mensaje de "Redirigiendo..."**: al no tener texto ni estilos en el body, no hay nada que parpadee en pantalla.
- **`meta http-equiv="refresh"` como respaldo**: solo entra en juego si JS está desactivado; con JS activado (el 99% de los casos) el `location.replace` gana y actúa primero.
- **`location.replace` en vez de `location.href`**: no deja la página de redirección en el historial, así que el botón "atrás" no vuelve a pasar por ella.

Con esto, `domain.com/` salta a `domain.com/es/` de forma prácticamente instantánea y sin ningún indicador de carga visible.

-- Conclusión
- i18n con prefixDefaultLocale: true → /es/ y /eu/, con redirectToDefaultLocale: false y tu propio index.astro con location.replace para evitar el loader en GitHub Pages.
- Blog → monolingüe, solo en /es/blog/, sin equivalente en /eu/. En euskera, aviso o enlace directo a la versión en castellano.
- Galería y resto del sitio → traducidos, con title/description/alt como objetos { es, eu } dentro del mismo  JSON, y páginas duplicadas en src/pages/es/ y src/pages/eu/.

## Mas tarde

- 46 fotos con su descripcion, titulo y metatags y ordenadas por pubDate en orden descendente. Ordenado por nombre ascendente en IMG_20260705_203828.jpg como siguiente foto seleccionada a subir. Tenemos más de 90 fotos en el repo.
- Se pueden meter datos estructurados para blog sería BlogPosting por cada blog. Para las imágenes de la galería serua ImageGallery o ImageObject.

- 1 i18n. Todo en euskara menos la parte de blog
- 2 Tiene sentido hacer un linktr.ee para conseguir enlaces hacia la pagina para seo?

## Recordatorio

- Posibles eitquetas de galeria: huerta26, huerta25, h24, balcón. fraisoro, blasenea...
- Tono de las entradas de blog: cercano, directo, práctico, en primera persona, con negritas para conceptos clave, algo de humor suave y emojis puntuales, y un cierre tipo "Aprendizajes". 

## Licencia

Este proyecto está publicado bajo licencia [MIT](./LICENSE).

## Autor

Desarrollado y mantenido por [aitor ibañez](https://github.com/aitorjs).


