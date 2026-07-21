import { markdownToHtml } from 'satteri'
import { describe, expect, it, vi } from 'vitest'
import { linkCardPlugin } from './link-card'

vi.mock('node-html-parser', () => ({
  parse: () => ({
    querySelector: (sel: string) => {
      if (sel === 'title') return { textContent: 'Example Domain' }
      if (sel === 'link[rel="icon"]') return { getAttribute: () => '/favicon.ico' }
      if (sel === 'meta[name="description"]')
        return { getAttribute: () => 'Example description' }
      if (sel === 'meta[property="og:image"]')
        return { getAttribute: () => '/og-image.png' }
    },
  }),
}))

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
