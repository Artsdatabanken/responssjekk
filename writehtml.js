
console.log("running")

document.addEventListener("DOMContentLoaded", function(event) {

  console.log("JEG KJØRER")
  let local_data = data
  Object.keys(local_data).forEach(hovedlag => {
    let lag = local_data[hovedlag]
    let string = '<div class="hovedlag" data-content="' + lag.status + '">'
    string += '<span>'  + hovedlag + '</span>'
    string += '<span>' + lag.tittel + '</span>'
    string += '<span>' + lag.wmsurl + '</span> '
    string += '<span>' + lag.status + '</span>'
    string += '<span>' + lag.timeStamp + '</span>'
    string += '</div>'

    document.getElementById('wrapper').innerHTML +=  string


    if (lag.underlag) {
      Object.keys(lag.underlag).forEach(underlagKey => {
      let ulag = local_data[hovedlag].underlag[underlagKey]
      let string = '<div class="underlag" data-content="' + ulag.status + '">'
      console.log(ulag)
      string += '<span> ' + hovedlag + '-' + underlagKey + '</span>'
      string += '<span>' + ulag.tittel + '</span>' 
      string += '<span>' + ulag.legendeurl + '</span>'
      string += '<span>' + ulag.status + '</span>'
      string += '<span>' + lag.timeStamp + '</span>'
      string += '</div>'

      document.getElementById('wrapper').innerHTML +=  string
      })

    }

  }
  )
}
)
