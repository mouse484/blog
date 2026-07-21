import type { RootContent } from 'mdast'
import { parse } from 'node-html-parser'
import { defineMdastPlugin } from 'satteri'

export const linkCardPlugin = defineMdastPlugin({
  name: 'link-card',
  async paragraph(node, _context) {
    const children = node.children as RootContent[]
    if (children.length !== 1) return
    if (children[0].type !== 'link') return

    const link = children[0]
    const [firstChild] = link.children
    if (link.children.length !== 1 || firstChild?.type !== 'text') return
    if ((firstChild).value !== link.url) return

    const href = link.url
    let title = href
    let description = ''
    let faviconUrl: string | undefined
    let ogImageUrl: string | undefined

    try {
      const response = await fetch(href)
      const raw = await response.text()
      const document = parse(raw)

      title = document.querySelector('title')?.textContent ?? href
      const origin = new URL(href).origin
      const faviconHref = document.querySelector('link[rel="icon"]')?.getAttribute('href')
      description
        = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
      const imageContent = document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content')

      if (faviconHref !== undefined) faviconUrl = new URL(faviconHref, origin).href
      if (imageContent !== undefined) ogImageUrl = new URL(imageContent, origin).href
    } catch {
      // fetch failed, render basic card
    }

    const origin = new URL(href).origin

    const faviconImg = faviconUrl === undefined
      ? ''
      : `<img src="${faviconUrl}" class="favicon" alt="${origin} favicon" />`
    const ogImage = ogImageUrl === undefined
      ? ''
      : `<img class="og-image" src="${ogImageUrl}" alt="${title} og image" />`

    const rawHtml = `<div class="link-card">
  <a href="${href}" target="_blank" rel="noopener noreferrer">
    <div>
      <p>${title}</p>
      <p class="description">${description.slice(0, 100)}</p>
      <p class="meta">
        ${faviconImg}
        <span>${origin}</span>
      </p>
    </div>
    ${ogImage}
  </a>
</div>`

    return { raw: rawHtml, mdxExpressions: false }
  },
})
