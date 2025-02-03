import type { Literal } from 'mdast'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import YAML from 'yaml'
import { TODAY } from './utils'

export const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(() => {
    return (tree) => {
      visit(tree, 'yaml', (node: Literal) => {
        const data = YAML.parse(node.value) as Record<string, unknown>
        data.updatedAt = TODAY
        node.value = YAML.stringify(data, {}).trim()
      })
    }
  })
  .use(remarkStringify)
