export const escapeTag = (tag: string) => {
  return encodeURIComponent(tag.toLowerCase().replace(/[.\s]/g, '-'))
}
export const tagToPath = (tag: string) => `/tags/${escapeTag(tag)}`
