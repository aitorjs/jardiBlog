import rss from "@astrojs/rss";
import {SITE_TITLE, SITE_DESCRIPTION} from "../../config";
import {getCollection} from "astro:content";
import { locales } from "../../i18n/utils";

export async function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
  const { lang } = context.params;
  const blog = await getCollection("blog", ({ data }) => data.lang === lang);
    return rss({
        title: `${ SITE_TITLE }(${ lang })`,
        description: SITE_DESCRIPTION,
        site: import.meta.env.SITE,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
          link: `/${lang}//blog/${post.id}/`,
        })),
    });
}
