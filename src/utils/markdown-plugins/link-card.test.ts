import { parse } from 'node-html-parser'
import { markdownToHtml } from 'satteri'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { linkCardPlugin } from './link-card'

vi.mock('node-html-parser')

function mockParse(options: {
  title?: string
  description?: string
  favicon?: string
  ogImage?: string
}) {
  vi.mocked(parse).mockReturnValue({
    querySelector: (sel: string) => {
      if (sel === 'title') {
        return options.title === undefined ? undefined : { textContent: options.title }
      }
      if (sel === 'link[rel="icon"]') {
        return options.favicon === undefined ? undefined : { getAttribute: () => options.favicon }
      }
      if (sel === 'meta[name="description"]') {
        return options.description === undefined
          ? undefined
          : { getAttribute: () => options.description }
      }
      if (sel === 'meta[property="og:image"]') {
        return options.ogImage === undefined
          ? undefined
          : { getAttribute: () => options.ogImage }
      }
    },
  } as ReturnType<typeof parse>)
}

beforeEach(() => {
  mockParse({
    title: 'Example Domain',
    favicon: '/favicon.ico',
    description: 'Example description',
    ogImage: '/og-image.png',
  })
})

async function hasLinkCard(markdown: string): Promise<boolean> {
  const result = await markdownToHtml(markdown, {
    mdastPlugins: [linkCardPlugin],
  })
  return result.html.includes('link-card')
}

describe('ok', () => {
  it('bare link', async () => {
    expect(await hasLinkCard('https://example.com')).toBe(true)
  })
})

describe('not', () => {
  it('normal link', async () => {
    expect(await hasLinkCard('[example](https://example.com)')).toBe(false)
  })

  it('link with title', async () => {
    expect(await hasLinkCard('[example](https://example.com "Example")')).toBe(false)
  })

  it('list with link', async () => {
    expect(await hasLinkCard('- [link1](https://example.com)')).toBe(false)
  })

  it('image link', async () => {
    expect(await hasLinkCard('![example](https://example.com/image.png)')).toBe(false)
  })

  it('inline code', async () => {
    expect(await hasLinkCard('`https://example.com`')).toBe(false)
  })

  it('paragraph with link', async () => {
    expect(await hasLinkCard('This is a [link](https://example.com) in a paragraph.')).toBe(
      false,
    )
  })

  it('multiple links', async () => {
    expect(
      await hasLinkCard('[link1](https://example.com) and [link2](https://example.org)'),
    ).toBe(false)
  })
})

describe('fallback to regular link when no meaningful content', () => {
  it('cloudflare challenge page', async () => {
    mockParse({ title: 'Just a moment...', description: '' })
    expect(await hasLinkCard('https://example.com')).toBe(false)
  })

  it('page with no metadata (title is URL)', async () => {
    mockParse({ title: 'https://example.com', description: '' })
    expect(await hasLinkCard('https://example.com')).toBe(false)
  })

  it('page with empty title and no description', async () => {
    mockParse({ title: '', description: '' })
    expect(await hasLinkCard('https://example.com')).toBe(false)
  })

  it('page with only meaningful title', async () => {
    mockParse({ title: 'My Page', description: '' })
    expect(await hasLinkCard('https://example.com')).toBe(false)
  })

  it('page with only description', async () => {
    mockParse({ description: 'A page about something' })
    expect(await hasLinkCard('https://example.com')).toBe(true)
  })

  it('page with only og image', async () => {
    mockParse({ ogImage: '/og.png' })
    expect(await hasLinkCard('https://example.com')).toBe(true)
  })

  it('page with meaningful title and favicon only', async () => {
    mockParse({ title: 'My Page', favicon: '/favicon.ico' })
    expect(await hasLinkCard('https://example.com')).toBe(false)
  })

  it('page with meaningful title and og image', async () => {
    mockParse({ title: 'My Page', ogImage: '/og.png' })
    expect(await hasLinkCard('https://example.com')).toBe(true)
  })
})
