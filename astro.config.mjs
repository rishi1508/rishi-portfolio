import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://rishi1508.github.io',
  base: '/rishi-portfolio',
  integrations: [react(), tailwind()],
  output: 'static',
});
