if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const { readFileSync, createWriteStream } = require('fs')
const { SitemapStream } = require('sitemap')

const songs = JSON.parse(readFileSync('./public/songs.json', 'utf8'))

const songsArray = songs
  .map((item) => item.songs)
  .reduce((a, b) => [...a, ...b], [])

const songsUrls = songsArray.map((item) => ({ url: item.path }))

const urls = [
  {
    url: '/',
    changefreq: 'never',
  },
  ...songsUrls,
]

const sitemap = new SitemapStream({
  hostname: process.env.SITEMAP_URL,
})

const writeStream = createWriteStream('./public/sitemap.xml')
sitemap.pipe(writeStream)
urls.forEach((url) => {
  sitemap.write(url)
})
sitemap.end()
