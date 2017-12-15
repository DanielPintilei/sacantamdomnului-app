export const replaceAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export const normalizeTitle = title =>
  replaceAccents(title)
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
export const generatePath = (number, title) =>
  `${number}-${normalizeTitle(title)}`
