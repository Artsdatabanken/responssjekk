let load_test_dataset = false
let kartlag_json = 'https://forvaltningsportal.test.artsdatabanken.no/kartlag.json'
var os = require("os");
var hostname = os.hostname();
// Host machines that are member of dev, just add yours (go to cmd and write 'hostname' and you will get the correct string)
let dev_hosts = ["4997ADB", "OTHER.."];

if (load_test_dataset && dev_hosts.includes(hostname)){
    kartlag_json = "http://127.0.0.1:5501/test2.json"
}

const fetch = require("fix-esm").require('node-fetch')
//const fetch = require('node-fetch')
const fs = require('fs')


fetch(kartlag_json)
    .then(res => {
        const dest = fs.createWriteStream('kartlag.json')
        res.body.pipe(dest)})