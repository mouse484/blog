export const escapeTag = (tag: string) => encodeURIComponent(tag.toLowerCase()).replace(/\./g, '-')
export const tagToPath = (tag: string) => `/tags/${escapeTag(tag)}`
