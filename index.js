const fs = require('fs')
const kartlag = JSON.parse(fs.readFileSync('kartlag.json'))
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let wmsreq = new XMLHttpRequest()

    /* wmsreq.open('GET', "https://gis3.NVE.no/map/services/VerneplanforVassdrag/MapServer/WmsServer?request=GetCapabilities&service=WMS", true)
wmsreq.send()
wmsreq.addEventListener("readystatechange", processRequest, false)
wmsreq.onreadystatechange = processRequest
function processRequest(e) {
    if (wmsreq.readyState == 4 && wmsreq.status == 200) {
        console.log("Yay")
    } 
    else {
        console.log("Fail")
    }
} */
console.log(kartlag)
console.log(Object.keys(kartlag))

Object.keys(kartlag).forEach(key => 
    {wmsreq.open('GET', kartlag[key].wmsurl, true)
    wmsreq.send()
    wmsreq.addEventListener("readystatechange", processRequest, false)
    wmsreq.onreadystatechange = processRequest
    function processRequest(e) {
    if (wmsreq.readyState == 4 && wmsreq.status == 200) {
        console.log(key,"Yay", wmsreq.readyState, wmsreq.status)
        console.log(kartlag[key].wmsurl)
    } 
    else if (wmsreq.readyState == 4 && wmsreq.status !== 200 && wmsreq.responseText == '') {
        console.log("Do nothing")
    }
}}
    
    )

