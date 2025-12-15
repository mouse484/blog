import { ExpressiveCode } from 'expressive-code'

const ec = new ExpressiveCode()

const baseStyles = await ec.getBaseStyles()
const themeStyles = await ec.getThemeStyles()
const jsModules = await ec.getJsModules()

export { baseStyles, ec, jsModules, themeStyles }
