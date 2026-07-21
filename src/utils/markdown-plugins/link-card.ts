import type { RootContent } from 'mdast'
import { parse } from 'node-html-parser'
import { defineMdastPlugin } from 'satteri'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;')
}

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
    let origin: string | undefined
    try {
      origin = new URL(href).origin
    } catch {
      // invalid or relative link — fall through to render basic card
    }

    let title = href
    let description = ''
    let faviconUrl: string | undefined
    let ogImageUrl: string | undefined

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      const response = await fetch(href, { signal: controller.signal })
      clearTimeout(timeoutId)
      const raw = await response.text()
      const document = parse(raw)

      title = document.querySelector('title')?.textContent ?? href
      const faviconHref = document.querySelector('link[rel="icon"]')?.getAttribute('href')
      description
        = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
      const imageContent = document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content')

      if (faviconHref !== undefined) faviconUrl = new URL(faviconHref, origin).href
      if (imageContent !== undefined) ogImageUrl = new URL(imageContent, origin).href
    } catch {
      // fetch failed or invalid URL
    }

    const hasDescription = description.trim() !== ''
    const hasOgImage = ogImageUrl !== undefined
    if (!hasDescription && !hasOgImage) return

    const faviconImg = faviconUrl === undefined
      ? ''
      : `<img src="${escapeHtml(faviconUrl)}" class="favicon" alt="${escapeHtml(origin ?? '')} favicon" />`
    const ogImage = ogImageUrl === undefined
      ? ''
      : `<img class="og-image" src="${escapeHtml(ogImageUrl)}" alt="${escapeHtml(title)} og image" />`

    const rawHtml = `<div class="link-card">
  <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
    <div>
      <p>${escapeHtml(title)}</p>
      <p class="description">${escapeHtml(description.slice(0, 100))}</p>
      <p class="meta">
        ${faviconImg}
        <span>${escapeHtml(origin ?? '')}</span>
      </p>
    </div>
    ${ogImage}
  </a>
</div>`

    return { rawHtml }
  },
})
