//const ms = require('./messagesender')

var ms = require('./messagesender');
//var ms =  require('./messagesender');



test('say hepp',() => {
    expect(ms.say_hepp()).toBe(void 0);        
})


test('teams message sent', async () => {
    const data = await ms.post_to_teams_channel("Hei på deg2!");
    expect(data).toBe('1');
});