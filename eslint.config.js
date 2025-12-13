import { mouse } from '@mouse_484/eslint-config'

export default mouse({
  formatters: true,
  astro: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
