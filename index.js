const fs = require('fs')
const kartlag = JSON.parse(fs.readFileSync('kartlag.json'))
const fetch = require('node-fetch')
const config = require('./config/config.json')
//let outputFile = JSON.parse(fs.readFileSync('./output/output.json'))
let alle = {}
let message = ''
let timeStamp
let feilkode
let teller = 0

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
        // console.log('Requested OK')
        kartlag[key].status = 'UP'
        timeStamp = calculateTimeStamp ()
        kartlag[key].timeStamp = timeStamp
        kartlag[key].feilkode = 'funker fint'
        alle[key] = kartlag[key]
        writeToFile(kartlag, alle)
       // console.log(alle)
      } else {
        message = 'Jeg virker ikke: ID = ' + key + ' Tittel = ' + kartlag[key].tittel + ' ' + kartlag[key].wmsurl
     //   postMessageToSlack(message)
     // console.log(message)
     kartlag[key].status = 'DOWN'
     timeStamp = calculateTimeStamp ()
     kartlag[key].timeStamp = timeStamp
     kartlag[key].feilkode = 'fikk ikke svar'
     alle[key] = kartlag[key]
     writeToFile(kartlag, alle)
      }
    }
    request()
  }
  else {
    message = 'Dette laget mangler wmsurl: ID = ' + key + ' Tittel = ' + kartlag[key].tittel
   // postMessageToSlack(message)
   // console.log(message)
   kartlag[key].status = 'DOWN'
   timeStamp = calculateTimeStamp ()
   kartlag[key].timeStamp = timeStamp
   kartlag[key].feilkode = 'mangler wmsurl'
   alle[key] = kartlag[key]
   writeToFile(kartlag, alle)
   //fs.appendFileSync('./output/output.json', JSON.stringify(kartlag[key], null, 2))
  }
  
}
)
//console.log(alle)
function writeToFile () {
faktiskeKartlag = Object.keys(kartlag)
console.log(faktiskeKartlag.length)
kartArr = Object.keys(kartlag)
alleArr = Object.keys(alle)
if (kartArr.length === alleArr.length) {
fs.writeFileSync('./output/output.json', JSON.stringify(alle, null, 2))
} else {
  console.log('not yet')
}
}