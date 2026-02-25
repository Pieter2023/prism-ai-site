import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://prismaiservices.netlify.app',
  integrations: [
    react(),
    sitemap(),
  ],
  output: 'hybrid',
  adapter: netlify(),
});
