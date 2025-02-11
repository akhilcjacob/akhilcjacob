import sitemap from "@astrojs/sitemap";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

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
      filter: (page) => !page.includes('/private/') && !page.includes('/admin/'),
      customPages: ['https://akhilcjacob.com/mvp'],
      serialize: (item) => {
        if (item.url.includes('/mvp')) {
          return {
            url: item.url,
            changefreq: 'weekly',
            priority: 1.0,
            lastmod: new Date()
          };
        }
        return undefined;
      }
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
  output: "static",
  build: {
    format: 'file'
  }
});
