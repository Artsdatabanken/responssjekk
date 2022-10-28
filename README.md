# responssjekk

Publiseres automatisk til følgende URL, ved innsjekk av kode til test-branch. 
https://responssjekk.test.artsdatabanken.no/
Kort og godt en sjekk av at de forskjellige datakilder som benyttes i Forvaltningsportalen er oppegående. Sjekken kjøres én gang
per time og timestamp er siste kjøring. 

Skal du publisere til produksjon, gå til #crocotta og be botten publisere, etter at du har merget/sjekket inn kode til master og dette bygget er grønt. Fortrinnsvis etter en PR fra test.

Fet skrift = hovedlag
Innrykk = underlag
Grønn = Good stuff
Rød = Bad stuff

Hvordan kjører du den lokalt for å fikse ting? 
1. Last ned repo.
2. npm install
3. npm run process
4. Cake!


.config/config.json, format:
```yaml
 "addressAndToken": "Your URL and token goes here...",
    "teams_webhook": "..."
