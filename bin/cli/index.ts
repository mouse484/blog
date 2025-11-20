import { Command } from 'commander'
import { createPost, updatePosts } from './file-operations.js'

const program = new Command()
program.name('blog-util')

program
  .command('create')
  .alias('c')
  .argument('name', 'ファイル名')
  .option('-d, --directory', 'ディレクトリ内に作成する')
  .action(createPost)

program
  .command('update')
  .alias('u')
  .description('ブログディレクトリの変更を検知する')
  .action(updatePosts)

program.parse()
