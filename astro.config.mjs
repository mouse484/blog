// @ts-check

import icon from 'astro-icon'
import pagefind from 'astro-pagefind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'file',
  },
  integrations: [pagefind(), icon()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
})
