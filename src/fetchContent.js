if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const fs = require('fs')
const firebase = require('firebase')

const config = {
  apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
}
firebase.initializeApp(config)

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
  const formatted = song
    .replace('Refren\n\n', 'Refren\n')
    .replace(refren, '<em>$1</em>\n\n')
    .replace(autor, '<small>$1</small>')
    .replace(melodie, '<small>$1</small>')
    .replace(/\(bis\)/g, '<small>(bis)</small>')
    .replace(/\/\//g, '/')
    .replace(/\/(?!small>)(?!em>)/g, '<small>/</small>')
    .replace(/(\n)+$/, '')
  return formatted
}

const formatSection = section =>
  section.filter(x => x).map(({ number, title, content }) => ({
    number,
    title,
    content: formatSong(content),
    path: generatePath(number, title),
  }))

const formatContent = ({ saCantamDomnului, alteCantari, colinde }) => [
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

const writeContent = snapshot => {
  const raw = snapshot.val()
  const content = JSON.stringify(formatContent(raw))
  fs.writeFileSync('./src/songs.json', content)
  process.exit()
}

const getContent = () => {
  firebase
    .database()
    .ref()
    .child('cantari')
    .once('value')
    .then(snapshot => {
      writeContent(snapshot)
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
}

// firebase
//   .auth()
//   .signInWithEmailAndPassword(process.env.EMAIL, process.env.PASSWORD)
//   .then(() => {
//     getContent()
//   })
//   .catch(({ code, message }) => {
//     console.log(code, message)
//     process.exit(1)
//   })

getContent()
