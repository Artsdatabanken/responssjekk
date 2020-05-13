document.addEventListener("DOMContentLoaded", function(event) { 
  let local_data = data
  //console.log(local_data)      
  Object.keys(local_data).forEach(hovedlag => {
    document.getElementById('wrapper').innerHTML += '<div class="hovedlag" id="hovedlag"> ' + '<div style="display: inline"> ' + hovedlag + '</div>' + local_data[hovedlag].tittel + '<div style="display: inline"> ' + local_data[hovedlag].wmsurl + '</div> ' + local_data[hovedlag].status + '<div style="display: inline"> ' + local_data[hovedlag].timeStamp + '</div>' + '</div>'
    if (local_data[hovedlag].underlag) {
      Object.keys(local_data[hovedlag].underlag).forEach(underlagKey => {
      document.getElementById('hovedlag').innerHTML += '<div class="underlag" id="underlag"> ' + '<div style="display: inline"> ' + hovedlag + '-' + underlagKey + '</div>' + '<div style="display: inline"> ' + local_data[hovedlag].underlag[underlagKey]["tittel"] + '</div>' + '<div style="display: inline"> ' + local_data[hovedlag].underlag[underlagKey]["legendeurl"] + '</div>' + '</div>'
      })
       
    }
  }
  )
}
)