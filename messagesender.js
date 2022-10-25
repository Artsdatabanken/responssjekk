// Sends messages to teams channel via webhook ("incoming webhook")
// https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook#create-an-incoming-webhook-1

  const fetch = require('node-fetch')


async function post_to_teams_channel(msg){
    var the_webhook_url = "https://artsdatabankenno.webhook.office.com/webhookb2/99e9cecd-2822-4e2f-8bea-652d6cbeb92d@97c30119-98d7-4b74-8ad7-0ba9a09a94c1/IncomingWebhook/f219f9815ad14add8268f26583eb5be1/dfdee89f-d8d2-4d8a-a7bb-6d05162c0dfe";
    const body = {
        "type":"message",
        "attachments":[
           {
              "contentType":"application/vnd.microsoft.card.adaptive",
              "contentUrl":null,
              "content":{
                 "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",
                 "type":"AdaptiveCard",
                 "version":"1.2",
                 "body":[
                     {
                     "type": "TextBlock",
                     //"text": "For Samples and Templates, see [https://adaptivecards.io/samples](https://adaptivecards.io/samples)"
                     "text" : `${msg}`
                     }
                 ]
              }
           }
        ]
     }
    const response = await fetch(the_webhook_url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await response.text();

    console.log(data);
    return data;
}

function say_hepp(){
    console.log("hepp")
}

exports.say_hepp = say_hepp;
exports.post_to_teams_channel = post_to_teams_channel;


