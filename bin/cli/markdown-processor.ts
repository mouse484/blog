import type { Literal } from 'mdast'
import type { Plugin } from 'unified'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import YAML from 'yaml'
import { TODAY } from './utilities.ts'

const updateYamlPlugin: Plugin = () => {
  return (tree) => {
    visit(tree, 'yaml', (node: Literal) => {
      const data = YAML.parse(node.value) as Record<string, unknown>
      data.updatedAt = TODAY
      node.value = YAML.stringify(data, {}).trim()
    })
  }
}

export const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(updateYamlPlugin)
  .use(remarkStringify)
