import type { RootContent } from 'mdast'
import { icons } from '@iconify-json/mdi'
import { defineHastPlugin, defineMdastPlugin } from 'satteri'

const iconMap: Record<string, string> = {
  message: 'mdi:message-alert',
  details: 'mdi:information',
}

const colorMap: Record<string, string> = {
  message: 'var(--primary)',
  details: 'var(--secondary)',
}

function getIconBody(name: string): string {
  const key = name.replace(/^mdi:/, '')
  const icon = icons.icons[key]
  return icon?.body ?? ''
}

export const containerMdastPlugin = defineMdastPlugin({
  name: 'container-mdast',
  containerDirective(node, context) {
    const name = node.name
    const color = colorMap[name] ?? 'var(--primary)'

    let title = ''
    const children = [...node.children] as RootContent[]

    if (children.length > 0 && children[0].type === 'paragraph') {
      const firstChild = children[0]
      if (firstChild.data?.directiveLabel) {
        const [child] = firstChild.children
        if (child?.type === 'text' && firstChild.children.length === 1) {
          title = child.value
          children.shift()
        }
      }
    }

    context.setProperty(node, 'children', children)
    const hProperties: Record<string, string> = {
      class: `container-${name}`,
      style: `--color: ${color};`,
    }
    if (title) {
      hProperties['data-title'] = title
    }

    context.setProperty(node, 'data', {
      hName: 'aside',
      hProperties,
    })
  },
})

export const containerHastPlugin = defineHastPlugin({
  name: 'container-hast',
  element: {
    filter: ['aside'],
    visit(node, context) {
      const className = node.properties.class
      if (typeof className !== 'string' || !className.startsWith('container-')) return

      const containerType = className.replace('container-', '')
      const iconName = iconMap[containerType] ?? 'mdi:message-alert'
      const containerTitle = (node.properties['data-title'] as string) ?? ''
      if (containerTitle) {
        delete node.properties['data-title']
      }

      const children = [...node.children]

      const headerChildren: object[] = []
      if (iconName) {
        const iconBody = getIconBody(iconName)
        if (iconBody) {
          headerChildren.push({
            type: 'element',
            tagName: 'svg',
            properties: {
              xmlns: 'http://www.w3.org/2000/svg',
              width: 24,
              height: 24,
              viewBox: '0 0 24 24',
              className: ['icon'],
            },
            children: [{ type: 'raw', value: iconBody }],
          })
        }
      }
      if (containerTitle) {
        headerChildren.push({ type: 'text', value: containerTitle })
      }

      const newChildren: object[] = []
      if (headerChildren.length > 0) {
        newChildren.push({
          type: 'element',
          tagName: 'span',
          properties: { className: ['header'] },
          children: headerChildren,
        })
      }
      newChildren.push({
        type: 'element',
        tagName: 'div',
        properties: {},
        children,
      })

      context.setProperty(node, 'children', newChildren)
    },
  },
})
