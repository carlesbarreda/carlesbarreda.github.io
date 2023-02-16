'use strict';

const vitePluginPwa = require('vite-plugin-pwa');

function index(options = {}) {
  let pwaPlugin;
  let trailingSlash = "ignore";
  let doBuild = false;
  const enableManifestTransform = () => {
    return { doBuild, trailingSlash };
  };
  return {
    name: "@vite-pwa/astro-integration",
    hooks: {
      "astro:config:setup": ({ config, updateConfig }) => {
        updateConfig({ vite: getViteConfiguration(config, options, enableManifestTransform) });
      },
      "astro:config:done": ({ config }) => {
        trailingSlash = config.trailingSlash;
        pwaPlugin = config.vite.plugins.flat(Infinity).find((p) => p.name === "vite-plugin-pwa");
      },
      "astro:build:done": async () => {
        doBuild = true;
        await regeneratePWA(pwaPlugin);
      }
    }
  };
}
function createManifestTransform(enableManifestTransform, config) {
  return async (entries) => {
    const { doBuild, trailingSlash } = enableManifestTransform();
    if (!doBuild)
      return { manifest: entries, warnings: [] };
    entries.filter((e) => e && e.url.endsWith(".html")).forEach((e) => {
      if (e.url === "index.html") {
        e.url = config.base ?? config.vite?.base ?? "/";
      } else if (e.url === "404.html") {
        e.url = "404";
      } else {
        const url = e.url.slice(0, e.url.lastIndexOf("/"));
        if (trailingSlash === "always")
          e.url = `${url}/`;
        else
          e.url = url;
      }
    });
    return { manifest: entries, warnings: [] };
  };
}
function getViteConfiguration(config, options, enableManifestTransform) {
  const plugin = config.vite?.plugins?.flat(Infinity).find((p) => p.name === "vite-plugin-pwa");
  if (plugin)
    throw new Error("Remove the vite-plugin-pwa plugin from Vite Plugins entry in Astro config file, configure it via @vite-pwa/astro integration");
  const {
    strategies = "generateSW",
    registerType = "prompt",
    injectRegister,
    workbox = {},
    injectManifest = {},
    ...rest
  } = options;
  if (strategies === "generateSW") {
    const useWorkbox = { ...workbox };
    const newOptions = {
      ...rest,
      strategies,
      registerType,
      injectRegister
    };
    if (!useWorkbox.navigateFallback)
      useWorkbox.navigateFallback = config.base ?? config.vite?.base ?? "/";
    newOptions.workbox = useWorkbox;
    newOptions.workbox.manifestTransforms = newOptions.workbox.manifestTransforms ?? [];
    newOptions.workbox.manifestTransforms.push(createManifestTransform(enableManifestTransform, config));
    return {
      plugins: [vitePluginPwa.VitePWA(newOptions)]
    };
  }
  options.injectManifest = options.injectManifest ?? {};
  options.injectManifest.manifestTransforms = injectManifest.manifestTransforms ?? [];
  options.injectManifest.manifestTransforms.push(createManifestTransform(enableManifestTransform, config));
  return {
    plugins: [vitePluginPwa.VitePWA(options)]
  };
}
async function regeneratePWA(pwaPlugin) {
  const api = pwaPlugin?.api;
  if (api && !api.disabled) {
    await api.generateSW();
  }
}

module.exports = index;
