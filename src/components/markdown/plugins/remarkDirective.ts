import type { Directive, Root, Text } from 'mdast'
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

const REGEX = /:::(?<name>\w+)(?:\s+(?<title>.*))?/

export const remarkDirective: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      const match = REGEX.exec(node.value)

      if (match && parent && typeof index === 'number') {
        const directiveNode: Directive = {
          type: 'directive',
          name: match.groups?.name ?? '',
          title: match.groups?.title ?? undefined,
          children: [],
        }

        const findEnd = (startIndex: number): number => {
          if (startIndex >= parent.children.length) {
            return -1
          }
          const sibling = parent.children[startIndex]
          if (sibling.type === 'text' && sibling.value.trim().match(':::')) {
            directiveNode.children.push(sibling)
            sibling.value = sibling.value.replace(':::', '')
            return startIndex
          }
          directiveNode.children.push(sibling)
          return findEnd(startIndex + 1)
        }

        const endIndex = findEnd(index + 1)
        if (endIndex === -1) {
          return 'skip'
        }
        parent.children.splice(index, endIndex - index + 1, directiveNode)
      }
    })
  }
}
