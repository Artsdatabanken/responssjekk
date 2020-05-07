const fs = require('fs')
const kartlag = JSON.parse(fs.readFileSync('kartlag.json'))
const fetch = require('node-fetch')
const config = require('./config/config.json')
let outputFile = JSON.parse(fs.readFileSync('./output/output.json'))
let output = []
let message = ''
let timeStamp

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

function calculateTimeStamp () {
let today = new Date()
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
let dateTime = date+' '+time
return dateTime
}

Object.keys(kartlag).forEach(key => {
  if (kartlag[key].wmsurl) {
    const request = async () => {
      const response = await fetch(kartlag[key].wmsurl)
        .catch(err => console.error(err))
      if (response.status === 200) {
        console.log('Requested OK')
        kartlag[key].status = 'UP'
        timeStamp = calculateTimeStamp ()
        kartlag[key].timeStamp = timeStamp
        output.push(kartlag[key])
       // console.log(kartlag[key])
       
      } else {
        message = 'Jeg virker ikke: ID = ' + key + ' Tittel = ' + kartlag[key].tittel + ' ' + kartlag[key].wmsurl
     //   postMessageToSlack(message)
     console.log(message)
     kartlag[key].status = 'DOWN'
     timeStamp = calculateTimeStamp ()
     kartlag[key].timeStamp = timeStamp
     output.push(kartlag[key])
     // console.log(kartlag[key])
   
      }
    }
    request()
  }
  else {
    message = 'Dette laget mangler wmsurl: ID = ' + key + ' Tittel = ' + kartlag[key].tittel
   // postMessageToSlack(message)
   console.log(message)
   kartlag[key].status = 'DOWN'
   timeStamp = calculateTimeStamp ()
   kartlag[key].timeStamp = timeStamp
   output.push(kartlag[key])
  }
}
)
