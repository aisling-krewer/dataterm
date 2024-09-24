import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        character: resolve(__dirname, 'character.html'),
        nightmarket: resolve(__dirname, 'nightmarket.html'),
        404: resolve(__dirname, '404.html')
      },
      output: {
        manualChunks: undefined
      }
    },
    outDir: 'dist', // Specify the output directory
  },
  publicDir: 'public' // Directory where static assets are located
});
