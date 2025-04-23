// Import necessary types and functions
import type { LinkCard, Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

// Add the LinkCard type to the mdast module
declare module 'mdast' {
   // Define LinkCard type: same as Link but with type 'link-card'
   type LinkCard = Omit<Link, 'type'> & {
     type: 'link-card'
   }

   // Add LinkCard to the content map
   interface RootContentMap {
     'link-card': LinkCard
   }
}

// Plugin that converts single links in paragraphs to link cards
export const remarkLinkCard: Plugin<[], Root> = () => {
  return (tree) => {
    // Visit each link in the syntax tree
    visit(tree, 'link', (node, _, parent) => {
      // Check if the link is alone in a paragraph
      if (parent && parent.type === 'paragraph' && parent.children.length === 1) {
        // Create a link-card node from the link
        const linkCard: LinkCard = {
          ...node,
          type: 'link-card',
        }
        // Replace the original link with the link-card
        Object.assign(node, linkCard)
      }
    })
  }
}
