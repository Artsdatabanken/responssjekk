
console.log("running")

document.addEventListener("DOMContentLoaded", function(event) {

  console.log("JEG KJØRER")
  let local_data = data;
  Object.keys(local_data).forEach(hovedlag => {
    let lag = local_data[hovedlag];
    let string = '<div class="hovedlag"> ';
    string += '<span> ' + hovedlag + '</span>';
    string += '<span>' + lag.tittel + '</span>';
    string += '<span>' + lag.wmsurl + '</span> ';
    string += '<span>' + lag.status + '</span>';
    string += '<span>' + lag.timeStamp + '</span>'
    string += '</div>';

    document.getElementById('wrapper').innerHTML +=  string;


    if (lag.underlag) {
      Object.keys(lag.underlag).forEach(underlagKey => {

      let string = "";
      string += '<div class="underlag"> ';
      string += '<span> ' + hovedlag + '-' + underlagKey + '</span>';
      string += '<span>' + local_data[hovedlag].underlag[underlagKey]["tittel"] + '</span>' ;
      string += '<span>' + local_data[hovedlag].underlag[underlagKey]["legendeurl"] + '</span>';
      string += '</div>';

      document.getElementById('wrapper').innerHTML +=  string;
      })

    }

  }
  )
}
)
