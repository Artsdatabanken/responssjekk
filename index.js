const fs = require('fs')
const kartlag = JSON.parse(fs.readFileSync('kartlag.json'))
const fetch = require("node-fetch")
const config = require("./config/config.json")


Object.keys(kartlag).forEach(key => 
    {const request = async () => {
        const response = await fetch(kartlag[key].wmsurl)
        const data = {
            "text": "Hello"
        }
        if (response.status == 200) {
            console.log("Requested OK")
        } else {
            console.log("Requested not OK!",kartlag[key].tittel ,kartlag[key].wmsurl)
            fetch(config.addressAndToken, {
                method: 'POST',
                body: JSON.stringify(data)
            })
        }
    }
    request()
    }
    
    )

    
    
    
    