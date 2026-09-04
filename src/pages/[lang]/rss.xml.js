import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../../config";
import { getCollection } from "astro:content";
import { locales } from "../../i18n/utils";

export async function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
  const { lang } = context.params;

  const blog = await getCollection("blog");

  return rss({
    title: `${SITE_TITLE}(${lang})`,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: blog
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title[lang],
        description: post.data.description[lang],
        pubDate: post.data.pubDate,
        link: `/${lang}/blog/${post.data.staticSlug?.[lang] ?? post.id}/`,
      })),
  });
}
