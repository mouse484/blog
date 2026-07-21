import { rssSchema } from '@astrojs/rss'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const dateSchema = rssSchema.shape.pubDate

const blog = defineCollection({
  loader: glob({
    pattern: '**/**/*.md',
    base: 'src/data/blog',
  }),
  schema: z.object({
    title: z.string(),
    // eslint-disable-next-line unicorn/max-nested-calls
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    createdAt: dateSchema,
    updatedAt: dateSchema,
    canonicalUrl: z.url().optional(),
  }),
})

export const collections = { blog }
