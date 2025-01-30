import sitemap from "@astrojs/sitemap";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://akhilcjacob.com",
  base: "/",
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/private/') && !page.includes('/admin/')
    }),
    robotsTxt({
      sitemap: true,
      host: true,
      policy: [{
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/'],
        crawlDelay: 10,
      }]
    }),
    solidJs(),
    UnoCSS({ injectReset: true }),
    icon(),
    svelte(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  output: "static",
  build: {
    format: 'file'
  }
});
