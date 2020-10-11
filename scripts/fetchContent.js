if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const fs = require('fs')
const fetch = require('node-fetch')

const replaceAccents = (str) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const normalizeTitle = (title) =>
  replaceAccents(title)
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')

const generatePath = (number, title) => `${number}-${normalizeTitle(title)}`

const formatSong = (song) => {
  const refren = /Refren\n([^]*?)\n\n/g
  const autor = /(Versuri:(.*)\n)/
  const melodie = /(Melodie:(.*)\n)/
  const multipleRefrains = (song.match(refren) || []).length > 1
  const formatted = song
    .replace(/Refren\n\n/g, 'Refren\n')
    .replace(
      refren,
      multipleRefrains ? '<em>$1</em>\n\n' : '<em class="sticky">$1</em>\n\n',
    )
    .replace(autor, '<small>$1</small>')
    .replace(melodie, '<small>$1</small>')
    .replace(/\(bis\)/g, '<small>(bis)</small>')
    .replace(/\/\//g, '/')
    .replace(/\/(?!small>)(?!em>)/g, '<small>/</small>')
    .replace(/(\n)+$/, '')
  return formatted
}

const formatSection = (section) =>
  section
    .filter((x) => x)
    .map(({ number, title, content }) => ({
      number,
      title,
      content: formatSong(content),
      path: generatePath(number, title),
    }))

const formatContent = ({ scd, alteCantari, colinde }) => [
  {
    title: 'Să cântăm Domnului',
    songs: formatSection(scd),
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

const writeContent = (snapshot) => {
  const rawNormalized = JSON.parse(
    JSON.stringify(snapshot)
      .replace(/"comtent"/g, '"content"')
      .replace(/"numar"/g, '"number"')
      .replace(/\\n\\n \\n/g, '\\n\\n')
      .replace(/\\n \\n/g, '\\n\\n')
      .replace(/ã/g, 'ă')
      .replace(/Ã/g, 'Ă]')
      .replace(/ş/g, 'ș')
      .replace(/Ş/g, 'Ș')
      .replace(/ţ/g, 'ț')
      .replace(/Ţ/g, 'Ț'),
  )
  const contentFormatted = formatContent(rawNormalized)
  const content = JSON.stringify(contentFormatted)
  const contentArray = contentFormatted
    .map((item) => item.songs)
    .reduce((a, b) => [...a, ...b], [])
  fs.writeFileSync('./public/songs.json', content)
  contentArray.forEach((song) => {
    fs.writeFileSync(`./public/json/${song.path}.json`, JSON.stringify(song))
  })
  process.exit()
}

const fetchContent = (child) =>
  fetch(`${process.env.DATABASE_URL}/${child}`)
    .then((res) => res.json())
    .then((resJSON) => {
      if (Object.entries(resJSON).length) {
        return resJSON.arrayBook
      } else throw new Error()
    })

const contentBooks = ['scd', 'alteCantari', 'colinde']

const fetchAllContent = async () => {
  const mergedContent = {}
  for (const book of contentBooks) {
    const child = `${book}/0`
    await fetchContent(child)
      .then((contentSingle) => {
        mergedContent[book] = contentSingle
      })
      .catch((error) => error)
  }
  return mergedContent
}

const getAllContent = async () => {
  const allContent = await fetchAllContent()
  writeContent(allContent)
}

getAllContent()
