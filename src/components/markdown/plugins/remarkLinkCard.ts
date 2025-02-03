import type { LinkCard, Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'expressive-code/hast'

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
      if (parent && parent.type === 'paragraph' && parent.children.length === 1) {
        const linkCard: LinkCard = {
          ...node,
          type: 'link-card',
        }
        Object.assign(node, linkCard)
      }
    })
  }
}
