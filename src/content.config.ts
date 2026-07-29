import {z, defineCollection} from "astro:content";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
    loader: glob({pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog"}),
    schema: ({image}) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.string().optional(),
        heroImage: image().optional(),
        badge: z.string().optional(),
        tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
            message: 'tags must be unique',
        }).optional(),
    }),
});

const gallery = defineCollection({
  loader: file('src/data/gallery.json'),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.number(),
    alt: z.string(),
    image: image(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
      message: 'tags must be unique',
    }).optional(),
  }),
});

export const collections = { blog, gallery };