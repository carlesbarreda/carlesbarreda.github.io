import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";

import AstroPWA from "@vite-pwa/astro";

import { ARGS, PWA } from "./src/config";

console.log(ARGS.site);
console.log(ARGS.base);

console.log(process.env.NODE_ENV);

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
    AstroPWA({
      registerType: "prompt",
      strategies: "generateSW",
      mode: ARGS.mode,
      base: ARGS.base ? ARGS.base : "/",
      scope: ARGS.base ? ARGS.base : "/",
      outDir: "dist",
      includeAssets: ["favicon.svg"],
      manifest: {
        id: (ARGS.base ? ARGS.base : "/") + "?standalone=true",
        start_url: (ARGS.base ? ARGS.base : "/") + "?standalone=true",
        name: "Astro Paper",
        short_name: "astro-paper",
        description: "A minimal, responsive and SEO-friendly Astro blog theme.",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/pwa/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/favicon.ico",
            sizes: "36x36",
            type: "image/x-icon",
            purpose: "any",
          },
        ],
      },
      //exclude: [/404/, /\//],
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        sourcemap: true,
        /*additionalManifestEntries: [
          { url: "/404", revision: null },
          //{url: 'https://static.express/img/.../connection-lost.svg', revision: null},
        ],*/
        globDirectory: "dist",
        globPatterns: [
          "**/*.{js,html,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico,txt}",
        ],
        // Don't fallback on document based (e.g. `/some-page`) requests
        // This removes an errant console.log message from showing up.
        //navigateFallback: null,
        //navigateFallback: "/404",
      },
      devOptions: {
        enabled: ARGS.mode === "development",
        type: "module",
        //navigateFallback: "/404",
      },
    }),
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
