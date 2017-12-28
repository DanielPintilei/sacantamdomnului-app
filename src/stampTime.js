const fs = require('fs')

fs.writeFileSync('./src/songsVersion.json', JSON.stringify(+new Date()))
process.exit()
