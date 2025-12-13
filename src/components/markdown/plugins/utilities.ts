import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

export function createFind(plugin: Plugin<[], Root>, matchType: string) {
  const processor = unified().use(remarkParse).use(remarkGfm).use(plugin)

  const find = async (markdown: string) => {
    const parsed = processor.parse(markdown)
    const node = await processor.run(parsed)

    let found = false
    visit(node, matchType, () => {
      found = true
    })
    return found
  }

  return find
}
