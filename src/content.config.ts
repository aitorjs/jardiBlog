import { z, defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";

const localizedString = z.object({
  es: z.string(),
  eu: z.string(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: localizedString,
    description: localizedString,
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: image().optional(),
    badge: z.string().optional(),
    tags: z.array(z.string()).optional()    ,
    staticSlug: localizedString.optional(), // por si algún día quieres slug fijo por idioma
  }),
});

const gallery = defineCollection({
  loader: file('src/data/gallery.json'),
  schema: ({ image }) => z.object({
    title: localizedString,
    description: localizedString,
    pubDate: z.number(),
    alt: localizedString,
    image: image(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
      message: 'tags must be unique',
    }).optional(),
  }),
});

export const collections = { blog, gallery };