import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import dayjs from 'dayjs'
import YAML from 'yaml'

export const BLOG_DIRECTORY = path.join(process.cwd(), 'src/data/blog')
export const TODAY = dayjs().format('YYYY-MM-DD')

export const baseFromtmatter = YAML.stringify({
  title: '',
  tags: [''],
  description: '',
  createdAt: TODAY,
})

export async function getExistingSlugs(dir: string) {
  const items = await fs.readdir(dir, { withFileTypes: true })
  const slugs = await Promise.all(items.flatMap(async (item) => {
    if (item.isDirectory()) {
      const indexPath = path.join(dir, item.name, 'index.md')
      try {
        await fs.stat(indexPath)
        return item.name
      }
      catch {
        return []
      }
    }
    else if (item.isFile() && item.name.endsWith('.md')) {
      return item.name.replace('.md', '')
    }
    return []
  }))
  return slugs
}
