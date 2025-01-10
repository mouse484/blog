import { rssSchema } from '@astrojs/rss'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  loader: glob({
    pattern: '**/**/*.md',
    base: 'src/data/blog',
  }),
  schema: rssSchema.extend({
    tags: z.array(z.string()).optional(),
    updateAt: z.date().optional(),
    canonicalUrl: z.string().url().optional(),
  }),
})

export const collections = { blog }
