export function escapeTag(tag: string) {
  return encodeURIComponent(tag.toLowerCase().replaceAll(/[.\s]/g, '-'))
}
export const tagToPath = (tag: string) => `/tags/${escapeTag(tag)}`
