import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";

import AstroPWA from "@vite-pwa/astro";

import { ARGS, PWA } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: ARGS.site,
  base: ARGS.base,
  /*
  vite: {
    base: ARGS.base ? ARGS.base : "/",
  },
  */
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
    sitemap(),
    AstroPWA(PWA),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    // https://docs.astro.build/en/guides/upgrade-to/v2/#changed-markdown-plugin-configuration
    //extendDefaultPlugins: true,
  },
});
