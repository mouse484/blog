import { rssSchema } from '@astrojs/rss'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const dateSchema = rssSchema.shape.pubDate

const blog = defineCollection({
  loader: glob({
    pattern: '**/**/*.md',
    base: 'src/data/blog',
  }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    createdAt: dateSchema,
    updatedAt: dateSchema,
    canonicalUrl: z.string().url().optional(),
  }),
})

export const collections = { blog }
