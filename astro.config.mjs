// @ts-check

import { satteri } from '@astrojs/markdown-satteri'
import sitemap from '@astrojs/sitemap'
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import pagefind from 'astro-pagefind'
import { defineConfig } from 'astro/config'
import { codeTitlePlugin } from './src/utils/markdown-plugins/code-title'
import { containerHastPlugin, containerMdastPlugin } from './src/utils/markdown-plugins/container'
import { linkCardPlugin } from './src/utils/markdown-plugins/link-card'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.mousedev.page',
  markdown: {
    processor: satteri({
      features: {
        directive: true,
      },
      mdastPlugins: [codeTitlePlugin, linkCardPlugin, containerMdastPlugin],
      hastPlugins: [containerHastPlugin],
    }),
  },
  integrations: [
    sitemap(),
    pagefind(),
    icon(),
    expressiveCode({
      themes: ['dracula'],
    }),
  ],
})
