---
author: Carles Barreda
pubDatetime: 2023-02-11T01:57:35Z
title: How to configure PWA
postSlug: how-to-configure-pwa
featured: true
draft: true
tags:
  - configuration
  - docs
ogImage: ""
description: How you can make AstroPaper working offline with PWA.
---

AstroPaper is a highly customizable Astro blog theme. With AstroPaper, you can customize everything according to your personal taste. This article will explain how you can make some customizations easily in the config file.

pnpm remove @types/github-slugger
pnpm add -w @vite-pwa/astro workbox-window
pnpm add -w -D @types/react-dom @typescript-eslint/eslint-plugin @vite-pwa/astro prettier-plugin-astro typescript vite vite-plugin-pwa

## Table of contents

## Configuring PWA

https://vite-pwa-org.netlify.app/frameworks/astro.html
https://docs.astro.build/en/guides/integrations-guide/react/

// src/env.d.ts

```ts
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />
```

### AutoUpdate

```
---
import { pwaInfo } from 'virtual:pwa-info';
...
---
  ...
  <head>
    ...
    <script src="/src/AutoUpdate.ts"></script>
    { pwaInfo && <Fragment set:html={pwaInfo.webManifest.linkTag} /> }
  </head>
  ...
```

### PromptUpdate

```
---
import { pwaInfo } from 'virtual:pwa-info';
import ReloadPrompt from '../components/ReloadPrompt.astro';
...
---
  ...
  <head>
    ...
    { pwaInfo && <Fragment set:html={pwaInfo.webManifest.linkTag} /> }
  </head>
  <body>
    ...
    <ReloadPrompt />
  </body>
  ...
```

### Generate PWA assets

npm install -g pwa-asset-generator

npx pwa-asset-generator ./public/favicon.svg ./public/pwa -v /pwa -i ./pwa-gen/pwa-gen.html -m ./pwa-gen/pwa-gen.json --scrape false --icon-only true --favicon true --mstile true --opaque false --maskable true --type png
