import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://aitor.info',
  base: '/',
  i18n: {
    defaultLocale: "es",
    locales: ["es", "eu"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false, // desactivamos la redirección automática de Astro
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});