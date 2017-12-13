export const normalizeTitle = title =>
  title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
export const generateUrl = (number, title) =>
  `${number}-${normalizeTitle(title)}`
