import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import { isDev } from '../const'

export const GET: APIRoute = async (context) => {
  const blog = (await getCollection('blog'))
    .sort((a, b) => {
      return (a.data.createdAt ?? 0) > (b.data.createdAt ?? 0) ? -1 : 1
    })
    .slice(0, 5)
    .map(post => ({
      title: post.data.title,
      date: dayjs(post.data.createdAt).format('YYYY-MM-DD'),
      url: new URL(`posts/${post.id}`, context.site).href,
    }))

  return new Response(JSON.stringify(blog), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': isDev ? '*' : 'https://portfolio.mousedev.page',
      'Access-Control-Allow-Methods': 'GET',
    },
  })
}
