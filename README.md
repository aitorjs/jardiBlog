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

- i18n:
   - [x] quitar carpeta es y eu y meterlo todo en [lang] para no tener paginas duplicadas por idioma. segun se va traduciendo
   - [x] rss por idioma
   - [ ] Traducción a euskara
      - [x] menu
      - [x] index
      - [ ] galeria -> en las ultimas imagenes. si estas en eu, pasaste a es y vuelves a eu y salen en eu. los pasos previos bien + date en lightbox en i18n
      - [x] cv
      - [x] 404
      - [x] contacto
      - [x] blog (la contenido de la entrada en castellano. titulo y descripcion en i18n) 
        - [x] tener en cuenta el language switcher (la url depende del titulo pero el language switcher entiende que la url de la entrada por idioma y por lo tanto el titulo siempre es el mismo)
        - [x] tener la entrada una unica vez, no una por idioma
        - [x] al entrar en una entrada de blog en euskara que salga un mensaje de "ez dago itzulia" o algo del estilo => https://docs.astro.build/es/recipes/i18n/

    - [x] cambiar de un idioma a otro estando de una entrada de blog.
    - [x] src/lib/timeAgo.ts i18n.

## Mas tarde

- 46 fotos con su descripcion, titulo y metatags y ordenadas por pubDate en orden descendente. Ordenado por nombre ascendente en IMG_20260705_203828.jpg como siguiente foto seleccionada a subir. Tenemos más de 90 fotos en el repo.
- Se pueden meter datos estructurados para blog sería BlogPosting por cada blog. Para las imágenes de la galería serua ImageGallery o ImageObject.

- 1 i18n. Todo en euskara menos la parte de blog
- 2 Tiene sentido hacer un linktr.ee para conseguir enlaces hacia la pagina para seo?

## Por qué oidio y no mildiu

Aquí está la clave que mucha gente desconoce: el mildiu necesita agua líquida sobre la hoja para que sus esporas germinen (por eso se dispara con lluvia, rocío persistente o riego que moja el follaje). El oidio, en cambio, es casi lo contrario: sus esporas germinan mejor con humedad ambiental alta pero hoja seca. No necesita que llueva ni que la hoja esté mojada; le basta con aire húmedo y temperaturas suaves-cálidas (20-28°C aprox.), especialmente con oscilación entre días calurosos y noches algo más frescas.

Así que la combinación que describes —más calor de lo habitual + algo más de humedad ambiental, pero sin encharcar hoja porque riegas con regadera a ras de pie— es prácticamente el escenario ideal para oidio y bastante desfavorable para mildiu. No es casualidad, es justo la firma climática de cada enfermedad.

## Recordatorio

- Posibles eitquetas de galeria: huerta26, huerta25, h24, balcón. fraisoro, blasenea...
- Tono de las entradas de blog: cercano, directo, práctico, en primera persona, con negritas para conceptos clave, algo de humor suave y emojis puntuales, y un cierre tipo "Aprendizajes". 

## Licencia

Este proyecto está publicado bajo licencia [MIT](./LICENSE).

## Autor

Desarrollado y mantenido por [aitor ibañez](https://github.com/aitorjs).


