import type { LinkCard, Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

declare module 'mdast' {
  type LinkCard = Omit<Link, 'type'> & {
    type: 'link-card'
  }

  interface RootContentMap {
    'link-card': LinkCard
  }
}

export const remarkLinkCard: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'link', (node, _, parent) => {
      const isAloneInParagraph
        = parent?.type === 'paragraph'
          && parent.children.length === 1

      const isBareLink
        = node.children.length === 1
          && node.children[0].type === 'text'
          && node.children[0].value === node.url

      if (isAloneInParagraph && isBareLink) {
        Object.assign(node, { ...node, type: 'link-card' } satisfies LinkCard)
      }
    })
  }
}
