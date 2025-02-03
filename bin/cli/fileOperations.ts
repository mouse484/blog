import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { processor } from './markdownProcessor.js'
import { baseFromtmatter, BLOG_DIRECTORY, getExistingSlugs } from './utils.js'

export async function createPost(slug: string, options: { directory?: boolean }) {
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

  await execSync(`code ${fullPath}`)
}

export async function updatePosts() {
  const changedFiles = getChangedFiles()
  if (!changedFiles.length) {
    return console.info('変更はありません')
  }

  for (const fullPath of changedFiles) {
    const content = await fs.readFile(fullPath, 'utf-8')
    const processed = await processor.process(content)
    await fs.writeFile(fullPath, processed.toString())
  }
}

function getChangedFiles() {
  return execSync(`git diff --name-only ${BLOG_DIRECTORY}`).toString().split('\n').filter(Boolean)
}
