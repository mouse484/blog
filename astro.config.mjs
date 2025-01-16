// @ts-check

import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import pagefind from 'astro-pagefind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.mousedev.page',
  build: {
    format: 'file',
  },
  integrations: [sitemap(), pagefind(), icon()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
})
