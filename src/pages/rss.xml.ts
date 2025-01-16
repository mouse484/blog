import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

interface Context {
  site: URL
}

export async function GET(context: Context) {
  const blog = await getCollection('blog')
  return rss({
    title: 'mouse\'s Blog',
    description: '',
    site: context.site,
    items: blog.map(post => ({
      title: post.data.title,
      pubDate: post.data.createdAt,
      description: post.data.description,
      link: post.id,
    })),
  })
}
