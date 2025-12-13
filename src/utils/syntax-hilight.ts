import { ExpressiveCode } from 'expressive-code'
import { loadWasm } from 'shiki/engine/oniguruma'

// @ts-expect-error -- https://shiki.style/guide/install#cloudflare-workers
await loadWasm(import('shiki/onig.wasm'))

const ec = new ExpressiveCode()

const baseStyles = await ec.getBaseStyles()
const themeStyles = await ec.getThemeStyles()
const jsModules = await ec.getJsModules()

export {
  baseStyles,
  ec,
  jsModules,
  themeStyles,
}

export { toHtml } from 'expressive-code/hast'
