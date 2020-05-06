const fs = require('fs')
const kartlag = JSON.parse(fs.readFileSync('kartlag.json'))
const fetch = require('node-fetch')
const config = require('./config/config.json')
let message = ''

function postMessageToSlack (message) {
  const data = {
    'text': message
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
        message = 'Jeg virker ikke: ID = ' + key + ' Tittel = ' + kartlag[key].tittel + ' ' + kartlag[key].wmsurl
     //   postMessageToSlack(message)
     console.log(message)
      }
    }
    request()
  }
  else {
    message = 'Dette laget mangler wmsurl: ID = ' + key + ' Tittel = ' + kartlag[key].tittel
   // postMessageToSlack(message)
   console.log(message)
  }
}
)
