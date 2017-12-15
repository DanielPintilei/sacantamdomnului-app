const fs = require('fs')

const raw = JSON.parse(fs.readFileSync('./src/cantariRaw.json', 'utf8'))

const replaceAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const normalizeTitle = title =>
  replaceAccents(title)
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
const generatePath = (number, title) => `${number}-${normalizeTitle(title)}`
const formatSong = song => {
  const refren = /Refren\n([^]*?)\n\n/
  const autor = /(Versuri:(.*)\n)/
  const melodie = /(Melodie:(.*)\n)/
  const formated = song
    .replace('Refren\n\n', 'Refren\n')
    .replace(refren, '<em>$1</em>\n\n')
    .replace(autor, '<small>$1</small>')
    .replace(melodie, '<small>$1</small>')
    .replace(/\/\//g, '/')
    .replace(/\(bis\)/g, '<small>(bis)</small>')
    .replace(/\/(?!small>)(?!em>)/g, '<small>/</small>')
  return formated
}
const generateSongs = () => {
  const { saCantamDomnului, alteCantari, colinde } = raw
  const formatSection = section =>
    section.filter(x => x).map(({ number, title, content }) => ({
      number,
      title,
      content: formatSong(content),
      path: generatePath(number, title),
    }))
  const list = [
    {
      title: 'Să cântăm Domnului',
      songs: formatSection(saCantamDomnului),
    },
    {
      title: 'Alte Cântări',
      songs: formatSection(alteCantari),
    },
    {
      title: 'Colinde',
      songs: formatSection(colinde),
    },
  ]
  return list
}

const songs = JSON.stringify(generateSongs())

fs.writeFileSync('./src/songs.json', songs)
