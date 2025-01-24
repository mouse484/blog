import type { Directive, Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

declare module 'mdast' {
  interface Directive extends Parent {
    type: 'directive'
    name: string
    title?: string
  }

  interface RootContentMap {
    directive: Directive
  }
}

const REGEX = /:::(?<name>[a-z]+)?(\s(?<title>\n+))?/

export const remarkDirective: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!node.children) {
        return 'skip'
      }
      const [first] = node.children
      if (first.type !== 'text') {
        return 'skip'
      }
      const text = first.value ?? ''
      const match = text.match(REGEX)
      if (!match) {
        return 'skip'
      }
      const name = match.groups?.name ?? ''
      const title = match.groups?.title

      const directiveNode = {
        type: 'directive',
        name,
        title,
        children: node.children.map((child) => {
          if (child.type === 'text') {
            return {
              ...child,
              value: child.value?.replace(REGEX, '').trim(),
            }
          }
          return child
        }),
      } satisfies Directive

      parent!.children.splice(index ?? 0, 1, directiveNode)
    })
  }
}
