import type { SocialObjects } from "./types";
import type { VitePWAOptions } from "vite-plugin-pwa";

export const ARGS: {
  [name: string]: string | undefined;
  mode?: "development" | "production";
  site?: string;
  base?: string;
} = {};

ARGS.mode = import.meta.env.PROD ? "production" : "development";

ARGS.site = import.meta.env.SITE
  ? import.meta.env.SITE
  : import.meta.env.PROD
  ? "https://astro-paper.pages.dev"
  : "http://localhost:3000";

//ARGS.base = import.meta.env.BASE_URL ? import.meta.env.BASE_URL : "/";
ARGS.base = import.meta.env.BASE_URL ?? "/";

// Parse Argo argv
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === "--site") ARGS.site = process.argv[++i];
  if (process.argv[i] === "--base") ARGS.base = process.argv[++i];
}

ARGS.base += !ARGS.base.endsWith("/") ? "/" : "";

// "@vite-pwa/astro": "^0.0.1",

console.log("ARGS");
console.log(ARGS);
console.log("Vite env");
console.log(import.meta.env);

export const SITE = {
  //website: "https://astro-paper.pages.dev/",
  website: ARGS.site + ARGS.base,
  author: "Sat Naing",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 216,
  height: 46,
};

export const PWA: Partial<VitePWAOptions> = {
  disable: false,
  mode: ARGS.mode,
  base: ARGS.base,
  scope: ARGS.base,
  outDir: "dist",
  registerType: "prompt",
  strategies: "generateSW",
  includeAssets: ["favicon.svg"],
  buildBase: ARGS.base,
  manifest: {
    id: ARGS.base + "?astropaper",
    start_url: ARGS.base + "?standalone=true",
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
        src: ARGS.base + "pwa/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: ARGS.base + "pwa/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: ARGS.base + "pwa/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: ARGS.base + "pwa/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: ARGS.base + "favicon.ico",
        sizes: "36x36",
        type: "image/vnd.microsoft.icon",
        purpose: "any",
      },
    ],
  },
  workbox: {
    /*
    modifyURLPrefix: {
      "": ARGS.base,
    },
    additionalManifestEntries: [
      { url: ARGS.base + "404", revision: null },
      { url: ARGS.base, revision: null },
      //{url: 'https://static.express/img/.../connection-lost.svg', revision: null},
    ],
    */
    globDirectory: "dist",
    globPatterns: [
      "**/*.{js,html,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico,txt}",
    ],
    // Don't fallback on document based (e.g. `/some-page`) requests
    // This removes an errant console.log message from showing up.
    //navigateFallback: null,
    //navigateFallback: ARGS.base + "404",
    //navigateFallback: ARGS.base,
  },
  devOptions: {
    enabled: import.meta.env.DEV,
    type: "classic",
    //navigateFallback: ARGS.base + "404",
  },
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on GitHub`,
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
