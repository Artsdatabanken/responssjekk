const fs = require('fs')
const kartlag = JSON.parse(fs.readFileSync('kartlag.json'))
const fetch = require('node-fetch')
const config = require('./config/config.json')

function postMessageToSlack (key) {
  const data = {
    'text': 'Jeg virker ikke: ID = ' + key + ' Tittel = ' + kartlag[key].tittel + ' ' + kartlag[key].wmsurl
  }
  fetch(config.addressAndToken, {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .catch(err => console.error(err))
}

Object.keys(kartlag).forEach(key => {
  if (kartlag[key].wmsurl) {
    const request = async () => {
      const response = await fetch(kartlag[key].wmsurl)
        .catch(err => console.error(err))
      if (response.status === 200) {
        console.log('Requested OK')
      } else {
        console.log('Requested not OK!', kartlag[key].tittel, kartlag[key].wmsurl)
        postMessageToSlack(key)
      }
    }
    request()
  }
  else {
    const test = {
      'text': 'Dette laget mangler wmsurl: ID = ' + key + ' Tittel = ' + kartlag[key].tittel
    }
    fetch(config.addressAndToken, {
      method: 'POST',
      body: JSON.stringify(test)
    })
      .catch(err => console.error(err))
  }
}
)
