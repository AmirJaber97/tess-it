// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://tess-it.net',
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        // `_nm_corrupt/` is a damaged node_modules orphan that the dev file
        // watcher cannot scandir (crashes Vite on start). Ignore it until the
        // folder is cleared with `chkdsk F: /f`. Harmless on clean checkouts.
        ignored: ['**/_nm_corrupt/**'],
      },
    },
  },
  integrations: [mdx()],
});
