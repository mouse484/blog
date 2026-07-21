import { markdownToHtml } from 'satteri'
import { describe, expect, it } from 'vitest'
import { containerHastPlugin, containerMdastPlugin } from './container'

function getContainerHtml(markdown: string): string {
  const result = markdownToHtml(markdown, {
    features: { directive: true },
    mdastPlugins: [containerMdastPlugin],
    hastPlugins: [containerHastPlugin],
  })
  return result.html
}

describe('container', () => {
  describe('message', () => {
    it('basic', () => {
      const html = getContainerHtml(':::message\ncontent\n:::')
      expect(html).toContain('container-message')
    })

    it('with title', () => {
      const html = getContainerHtml(':::message\nTitle\n\ncontent\n:::')
      expect(html).toContain('container-message')
      expect(html).toContain('>Title<')
    })

    it('without title', () => {
      const html = getContainerHtml(':::message\n- item1\n- item2\n:::')
      expect(html).toContain('container-message')
    })

    it('has svg icon', () => {
      const html = getContainerHtml(':::message\ncontent\n:::')
      expect(html).toContain('<svg')
      expect(html).toContain('viewBox="0 0 24 24"')
    })

    it('has color style', () => {
      const html = getContainerHtml(':::message\ncontent\n:::')
      expect(html).toContain('--color:')
    })
  })

  describe('details', () => {
    it('basic', () => {
      const html = getContainerHtml(':::details\ncontent\n:::')
      expect(html).toContain('container-details')
    })
  })

  describe('unknown name', () => {
    it('uses default icon', () => {
      const html = getContainerHtml(':::warning\ncontent\n:::')
      expect(html).toContain('container-warning')
      expect(html).toContain('<svg')
    })
  })
})
