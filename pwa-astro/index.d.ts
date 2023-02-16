import { VitePWAOptions } from 'vite-plugin-pwa';
import { AstroIntegration } from 'astro';

declare function export_default(options?: Partial<VitePWAOptions>): AstroIntegration;

export { export_default as default };
