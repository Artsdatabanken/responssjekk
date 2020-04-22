const fs = require('fs')
const kartlag = JSON.parse(fs.readFileSync('kartlag.json'))
const fetch = require("node-fetch")

Object.keys(kartlag).forEach(key => 
    {const request = async () => {
        const response = await fetch(kartlag[key].wmsurl)
        if (response.status == 200) {
            console.log("Requested OK")
        } else {
            console.log("Requested not OK!",kartlag[key].tittel ,kartlag[key].wmsurl)
        }
    }
    request()
    }
    
    )

    
    
    
    