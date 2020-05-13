document.addEventListener("DOMContentLoaded", function(event) { 
  let local_data = data
  //console.log(local_data)      
  Object.keys(local_data).forEach(hovedlag => {
    document.getElementById('wrapper').innerHTML += '<div class="hovedlag" id="hovedlag"> ' + '<div id="hovedlag"> ' + hovedlag + '</div>' + '<div id=hovedlag>' + local_data[hovedlag].tittel + '</div>'  + '<div id="hovedlag"> ' + local_data[hovedlag].wmsurl + '</div> ' + '<div id="hovedlag">' + local_data[hovedlag].status + '</div>' + '<div id="hovedlag">' + local_data[hovedlag].timeStamp + '</div>' + '</div>'
    if (local_data[hovedlag].underlag) {
      Object.keys(local_data[hovedlag].underlag).forEach(underlagKey => {
      document.getElementById('hovedlag').innerHTML += '<div class="underlag"> ' + '<div id="underlag"> ' + hovedlag + '-' + underlagKey + '</div>' + '<div id="underlag">' + local_data[hovedlag].underlag[underlagKey]["tittel"] + '</div>' + '<div id="underlag">' + local_data[hovedlag].underlag[underlagKey]["legendeurl"] + '</div>' + '</div>'
      })
       
    }
  }
  )
}
) 