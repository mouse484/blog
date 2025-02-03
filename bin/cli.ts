import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { Command } from 'commander'
import dayjs from 'dayjs'
import YAML from 'yaml'

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/data/blog')
const TODAY = dayjs().format('YYYY-MM-DD')

async function getExistingSlugs(dir: string) {
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

const baseFromtmatter = YAML.stringify({
  title: '',
  tags: [],
  description: '',
  createdAt: TODAY,
})

const program = new Command()
program.name('blog-util')

program
  .command('create')
  .alias('c')
  .argument('name', 'ファイル名')
  .option('-d, --directory', 'ディレクトリ内に作成する')
  .action(async (slug: string, options: { directory?: boolean }) => {
    const isDirectory = options.directory
    const filePath = isDirectory ? `${slug}/index.md` : `${slug}.md`
    const fullPath = path.join(BLOG_DIRECTORY, filePath)
    const dirPath = path.dirname(fullPath)

    const existingSlugs = await getExistingSlugs(BLOG_DIRECTORY)
    if (existingSlugs.includes(slug)) {
      console.error(`エラー: slug '${slug}'は既に存在しています。`)
      process.exit(1)
    }

    await fs.access(dirPath).catch(async () => {
      await fs.mkdir(dirPath, { recursive: true })
    })

    const content = `---\n${baseFromtmatter}---\n\n`

    await fs.writeFile(fullPath, content)
  })

program.parse()
