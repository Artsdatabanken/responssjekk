const fs = require('fs')
const fetch = require('node-fetch')

fetch('https://forvaltningsportal.test.artsdatabanken.no/kartlag.json')
    .then(res => {
        const dest = fs.createWriteStream('kartlag.json')
        res.body.pipe(dest)})
