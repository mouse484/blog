import { describe, expect, it } from 'vitest'
import { remarkLinkCard } from './remark-link-card'
import { createFind } from './utilities'

const find = createFind(remarkLinkCard, 'link-card')

describe('ok', () => {
  it('normal link', async () => {
    const markdown = '[example](https://example.com)'
    const found = await find(markdown)
    expect(found).toBe(true)
  })

  it('bare link', async () => {
    const markdown = 'https://example.com'
    const found = await find(markdown)
    expect(found).toBe(true)
  })

  it('link with title', async () => {
    const markdown = '[example](https://example.com "Example")'
    const found = await find(markdown)
    expect(found).toBe(true)
  })

  // TODO: これを通さないようにしたいかも
  it('list with link', async () => {
    const markdown = '- [link1](https://example.com)'
    const found = await find(markdown)
    expect(found).toBe(true)
  })
})

describe('not', () => {
  it('image link', async () => {
    const markdown = '![example](https://example.com/image.png)'
    const found = await find(markdown)
    expect(found).toBe(false)
  })

  it('inline code', async () => {
    const markdown = '`https://example.com`'
    const found = await find(markdown)
    expect(found).toBe(false)
  })

  it('paragraph with link', async () => {
    const markdown = 'This is a [link](https://example.com) in a paragraph.'
    const found = await find(markdown)
    expect(found).toBe(false)
  })

  it('multiple links', async () => {
    const markdown = '[link1](https://example.com) and [link2](https://example.org)'
    const found = await find(markdown)
    expect(found).toBe(false)
  })
})
