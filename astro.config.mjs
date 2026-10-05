// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const lastmod = new Date();

export default defineConfig({
  site: 'https://eloraos.com',
  trailingSlash: 'always',
  // Compression drops the space where a line break meets an inline tag ("the<strong>MCP</strong>").
  // gzip makes the saved bytes negligible, so keep the source whitespace instead.
  compressHTML: false,
  build: {
    format: 'directory',
    // Inline the (~15 KB gzipped) stylesheet: most visitors land on one page, and the
    // first paint then never waits on a separate CSS request.
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        item.lastmod = lastmod.toISOString();
        item.priority = item.url === 'https://eloraos.com/' ? 1.0 : 0.8;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
