import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://rishi1508.github.io',
  base: '/rishi-portfolio',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'static',
  build: { inlineStylesheets: 'always' },
});
