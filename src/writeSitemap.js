if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const fs = require('fs')
const sitemap = require('sitemap')

const songs = JSON.parse(fs.readFileSync('./public/songs.json', 'utf8'))

const songsArray = songs
  .map(item => item.songs)
  .reduce((a, b) => [...a, ...b], [])

const songsUrls = songsArray.map(item => ({ url: item.path }))

const urls = [
  {
    url: '/',
    changefreq: 'never',
  },
  ...songsUrls,
]

const sitemapXML = sitemap.createSitemap({
  hostname: process.env.PUBLIC_URL,
  urls,
})

fs.writeFileSync('./public/sitemap.xml', sitemapXML.toString())
