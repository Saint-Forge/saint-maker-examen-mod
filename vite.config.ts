import {defineConfig} from 'vite';
import {VitePWA as vitePWA} from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import { getGeneratedAliases } from './getGeneratedAliases';
import manifest from './manifest.json';


export default defineConfig({
  plugins: [react(), vitePWA({
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest,
    devOptions: {
      enabled: false,
    },
  })],
  resolve: {
    alias: getGeneratedAliases()
  },
});
