import { markdownToHtml } from 'satteri'
import { describe, expect, it } from 'vitest'
import { codeTitlePlugin } from './code-title'

function getCodeHtml(markdown: string): string {
  const result = markdownToHtml(markdown, {
    mdastPlugins: [codeTitlePlugin],
  })
  return result.html
}

describe('code-title', () => {
  describe('title extracted', () => {
    it('lang:title', () => {
      const html = getCodeHtml('```js:filename.js\n```')
      expect(html).toContain('language-js')
    })

    it('lang:path/to/file.ts', () => {
      const html = getCodeHtml('```ts:src/routes/+layout.svelte\n```')
      expect(html).toContain('language-ts')
    })

    it('lang:日本語タイトル', () => {
      const html = getCodeHtml('```sh:例\n```')
      expect(html).toContain('language-sh')
    })

    it('lang:title with existing meta', () => {
      const html = getCodeHtml('```js:config.js {1}\n```')
      expect(html).toContain('language-js')
    })
  })

  describe('no title', () => {
    it('no colon', () => {
      const html = getCodeHtml('```js\n```')
      expect(html).toContain('language-js')
    })

    it('no lang', () => {
      const html = getCodeHtml('```\n```')
      expect(html).not.toContain('language-')
    })
  })
})
