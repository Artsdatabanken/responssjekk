const hovedliste = document.getElementById('hovedliste')
const input = await (await fetch('./output/output.json')).text()
const input = await (await fetch('./output/output.json')).json() 
console.log(input)  