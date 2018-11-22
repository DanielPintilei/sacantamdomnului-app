export const replaceAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export const normalizeTitle = (title: string) =>
  replaceAccents(title)
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')

export const generatePath = (number: number, title: string) =>
  `${number}-${normalizeTitle(title)}`
