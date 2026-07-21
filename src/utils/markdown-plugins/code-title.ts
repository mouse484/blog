import { defineMdastPlugin } from 'satteri'

export const codeTitlePlugin = defineMdastPlugin({
  name: 'code-title',
  code(node, context) {
    if (node.lang === undefined || node.lang === null) return

    const colonIndex = node.lang.indexOf(':')
    if (colonIndex === -1) return

    const lang = node.lang.slice(0, colonIndex)
    const title = node.lang.slice(colonIndex + 1)

    context.setProperty(node, 'lang', lang)
    if (title.length > 0) {
      const meta = node.meta === null ? '' : `${node.meta} `
      context.setProperty(node, 'meta', `${meta}title="${title}"`)
    }
  },
})
