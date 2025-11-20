import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import { isDevelopment } from '../const'

export const GET: APIRoute = async (context) => {
  const blogCollection = await getCollection('blog')
  const blog = blogCollection
    .toSorted((a, b) => {
      return (a.data.createdAt ?? 0) > (b.data.createdAt ?? 0) ? -1 : 1
    })
    .slice(0, 5)
    .map(post => ({
      title: post.data.title,
      date: dayjs(post.data.createdAt).format('YYYY-MM-DD'),
      url: new URL(`posts/${post.id}`, context.site).href,
    }))

  return Response.json(blog, {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': isDevelopment ? '*' : 'https://portfolio.mousedev.page',
      'Access-Control-Allow-Methods': 'GET',
    },
  })
}
