import type { SocialObjects } from "./types";
import type { VitePWAOptions } from "vite-plugin-pwa";

export const ARGS: {
  [name: string]: string | undefined;
  mode?: "development" | "production" | undefined;
} = {};
ARGS.mode =
  process.env.NODE_ENV === "development" ? "development" : "production";
// Set defaults
if (ARGS.mode === "development") {
  ARGS.site = "http://localhost:3000";
  ARGS.base = undefined;
} else {
  ARGS.site = "https://astro-paper.pages.dev";
  ARGS.base = undefined;
}
// TODO: Parse .env files
// Parse Argo argv
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === "--site") ARGS.site = process.argv[++i];
  if (process.argv[i] === "--base") ARGS.base = process.argv[++i];
}

export const SITE = {
  website: ARGS.site,
  author: "Sat Naing",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const PWA: Partial<VitePWAOptions> = {
  registerType: "prompt",
  strategies: "generateSW",
  mode: ARGS.mode,
  base: ARGS.base ? ARGS.base : "/",
  scope: ARGS.base ? ARGS.base : "/",
  outDir: "dist",
  includeAssets: ["favicon.svg"],
  manifest: {
    id: (ARGS.base ? ARGS.base : "/") + "?astropaper",
    start_url: (ARGS.base ? ARGS.base : "/") + "?standalone=true",
    name: "AstroPaper",
    short_name: "AstroPaper",
    description: "A minimal, responsive and SEO-friendly Astro blog theme.",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    display: "standalone",
    orientation: "natural",
    dir: "ltr",
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
        type: "image/vnd.microsoft.icon",
        purpose: "any",
      },
    ],
  },
  //exclude: [/404/, /\//],
  workbox: {
    //clientsClaim: true,
    //skipWaiting: true,
    //sourcemap: true,
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
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "Twitch",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: "Snapchat",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Snapchat`,
    active: false,
  },
  {
    name: "Pinterest",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Pinterest`,
    active: false,
  },
  {
    name: "TikTok",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on TikTok`,
    active: false,
  },
  {
    name: "CodePen",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: "Skype",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Skype`,
    active: false,
  },
  {
    name: "Steam",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Steam`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
