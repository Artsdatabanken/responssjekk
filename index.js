const fs = require('fs')
const kartlag = JSON.parse(fs.readFileSync('kartlag.json'))
const fetch = require('node-fetch')
const config = require('./config/config.json')
//let outputFile = JSON.parse(fs.readFileSync('./output/output.json'))
let alle = {}
let message = ''
let timeStamp
let feilkode

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
      try {
      const response = await fetch(kartlag[key].wmsurl)
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
      } catch(err) {
        console.log('Rejected')
      }
    }
    request()
  } else {
    kartlag[key].status = 'DOWN'
    timeStamp = calculateTimeStamp ()
    kartlag[key].timeStamp = timeStamp
    kartlag[key].wmsurl = 'WMS-URL mangler'
  }
  
  if (kartlag[key].underlag) {
    Object.keys(kartlag[key].underlag).forEach(ul => {
     // console.log(kartlag[key].underlag[ul].legendeurl)
    //console.log(kartlag[key].underlag)
    if (kartlag[key].underlag[ul].legendeurl) {  
    const request = async () => {
      const response = await fetch(kartlag[key].underlag[ul].legendeurl)
        .catch(err => console.error(err))
      if (response.status === 200) {
        // console.log('Requested OK')
        kartlag[key].underlag[ul].status = 'UP'
        timeStamp = calculateTimeStamp ()
        kartlag[key].underlag[ul].timeStamp = timeStamp
        kartlag[key].underlag[ul].feilkode = 'funker fint'
        alle[key].underlag[ul] = kartlag[key].underlag[ul]
        writeToFile(kartlag, alle)
       // console.log(alle)
      } else {
        message = 'Jeg virker ikke: ID = ' + key + '-' + ul + ' Tittel = ' + kartlag[key].underlag.tittel + ' ' + kartlag[key].underlag.wmsurl
     //   postMessageToSlack(message)
     // console.log(message)
     kartlag[key].underlag[ul].status = 'DOWN'
     timeStamp = calculateTimeStamp ()
     kartlag[key].underlag[ul].timeStamp = timeStamp
     kartlag[key].underlag[ul].feilkode = 'fikk ikke svar'
     alle[key].underlag[ul] = kartlag[key].underlag[ul]
     writeToFile(kartlag, alle)
      }
    }
    request() }
    else {
      kartlag[key].underlag[ul].legendeurl = 'URL mangler'
      kartlag[key].underlag[ul].status = 'DOWN'
      kartlag[key].underlag[ul].timeStamp = timeStamp
    }
  })}

  if (kartlag[key.underlag]) {
    console.log("Underlag:", key.underlag)
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
kartArr = Object.keys(kartlag)
alleArr = Object.keys(alle)
//console.log("kart", kartArr)
//console.log("alle", alleArr)
if (kartArr.length === alleArr.length) {
  fs.writeFileSync('./output/output.json', 'var data = ')
  fs.appendFileSync('./output/output.json', JSON.stringify(alle, null, 2))
} else {
  console.log('not yet')
}
}