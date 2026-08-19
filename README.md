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

## Roadmap / TODOs

El propio repositorio recoge algunas tareas pendientes, entre ellas:

- Añadir imagen de avatar
- Actualizar linkedin e infojobs antes de publicitar la página  
- Meter GoatCounter. Con descomentarlo basta. Antes meter una forma de que misvisitas no cuenten con el uso de una cookie y una parametro en la url.

## Mas tarde

- Si añades una foto a una entrada de blog que ya esta en la galeria, en sus tags aparecera publicada. Por ejemplo en https://aitor.info/galeria/tag/lechuga meter los imagenes que solo estan en las entradas a blog su ruta dentro de un array. 
- 37 fotos con su descripcion, titulo y metatags y ordenadas por pubDate en orden descendente. Ordenado por nombre ascendente en IMG_20260705_203828.jpg como siguiente foto seleccionada a subir. Tenemos más de 90 fotos en el repo.
- En el cv poner un link o links en las practicas y huerta que lleven a su tag de fotos.
- Se pueden meter datos estructurados para blog sería BlogPosting por cada blog. Para las imágenes de la galería serua ImageGallery o ImageObject.
- Tiene sentido hacer un linktr.ee para conseguir enlaces hacia la pagina para seo?

## Recordatorio

- Posibles eitquetas de galeria: huerta26, huerta25, h24, balcón. fraisoro, blasenea...
- Tono de las entradas de blog: cercano, directo, práctico, en primera persona, con negritas para conceptos clave, algo de humor suave y emojis puntuales, y un cierre tipo "Aprendizajes". 

## Licencia

Este proyecto está publicado bajo licencia [MIT](./LICENSE).

## Autor

Desarrollado y mantenido por [aitor ibañez](https://github.com/aitorjs).


