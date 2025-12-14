# Refleksjonsrapport - Programmering med KI

## 1. Gruppeinformasjon
**Gruppenavn:** SG - Driftige Nordlendinger 
**Gruppemedlemmer:**
- Eline [Studentnummer:251829 / Kandidatnummer: 20 / eline.westerberg@himolde.no/elinewes@gmail.com]
- Sindre [Studentnummer:230316 / Kandidatnummer: 157 / sindre.vikshaland@himolde.no/sviksi@gmail.com]

**Dato:** 05.12.25

---
## 3. Utfordringer og løsninger

### 3.1 Tekniske utfordringer

**Utfordring 1: Gemini falt ut av kontekst**  
- Problem: Gemini "glemte" å følge BMAD rammeverket og begynte å overskrive eksisterende mapper i prosjektet. 
- Løsning: Vi ba Gemini om å gjenopprette overskrevne filer og mapper ettersom det på det tidspunktet ikke var synkronisert til Github, og vi dermed ikke kunne gå tilbake i versjon. Vi lærte at vi skulle pushe endringer hyppigere og dessuten velge "allow once" for bedre kontroll.
- KI sin rolle: Både problemskaper og problemløser. 

**Utfordring 2: API-nøkkel feil**  
- Problem: Første gang applikasjonen kjørte fikk vi en 404 feil når knappen for generering av oppsummering ble aktivert.
- Løsning: Gemini gikk gjennom backend-logger og fant hvilken versjon av Gemini API-nøkkelen gjaldt for, og endret backend og API-kallet deretter. 
- KI sin rolle: Genererte logikken og foreslo enkel implementering

**Utfordring 3: Begrensninger for oppgave-kjøring i terminal**  
- Problem: Gemini kunne bare kjøre en oppgave av gangen i samme terminal.
- Løsning: Backend måtte startes manuelt i egen terminal
- KI sin rolle: Fokuserte på å kjøre frontend.

**Utfordring 4: Utviklingsfeil**  
- Problem: Svaralternativer i quiz kunne ikke velges.
- Løsning: Gemini oppdaterte kode slik at svaralternativer kunne velges og svar sendes inn.
- KI sin rolle: Generering og oppdatering av kode.

**Utfordring 5: Gikk tom for tokens**  
- Problem: Vi gikk underveis - flere ganger, tom for tokens under produksjon og testing.
- Løsning: Benyttet en tregere utgave av Gemini.
- KI sin rolle: Strupet hastighet på tilbakemelding og generering av kode.

**Utfordring 6: Brukte privat repository i Github**  
- Problem: Vi var litt for ivrig og startet prosjektet i privat repository i Github, altså ikke den ferdige strukturen skolen hadde laget for oss i eget repository i Github. Fulgte BMAD rammeverket, men startet altså med tomt prosjekt. Løsningen ble ferdig, men da vi sammenlignet vår struktur vs. Malen i Github stemte de ikke overens. Det er mulig vi fikk en annen versjon da vi startet et tomt prosjekt. Vi valgte til tross for tidsmangel å klone skolens repository og starte på nytt, da merging ble uoversiktlig og komplisert da strukturen var annerledes.
- Løsning: Klone vår student repository i Github for å få riktig struktur.
- KI sin rolle: Den fikk gå gjennom alle rollene og sette opp applikasjon på nytt.

**Utfordring 7: Logging av prompter og svar**  
- Problem: Vi er usikre på hvor og hvor mye som blir logget av prompter og svar.
- Løsning: Spurte spesifikt Gemini om den logget input og output, noe den bekreftet at den gjorde, men slet likevel med å finne hvor dette var lagret.
- KI sin rolle: Å logge og vise til logger - noe vi i skrivende stund enda er usikre på.


### 3.2 Samarbeidsutfordringer
- Kapasitetsutfordringer og sykdom hos begge deltakere førte til tidvis lav fremdrift og presset tidsskjema. Vi håndterte dette ved å justere ambisjonsnivå, fordele ansvar tydelig, og legge inn korte, målrettede arbeidsmøter.
- Tidsstyring ble en utfordring, spesielt siden prosjektet krevde både dialog med flere agenter og manuell kvalitetssikring.
- Likevel opplevde vi at samarbeidet fungerte godt, med åpen kommunikasjon og felles eierskap til løsningen. Vi utfylte hverandre godt i hvordan vi tilnærmet oss dialog med agentene – og fikk et bedre resultat sammen enn vi ville klart hver for oss.

### 3.3 KI-spesifikke utfordringer
- Overivrige antagelser: Vi opplevde flere ganger at agentene, særlig i Gemini/BMAD-oppsettet, "tok seg friheter" og godkjente valg på våre vegne – uten at vi hadde bekreftet dem. Eksempelvis kunne den skrive:
“User approved technology stack: Next.js + Firebase”
...uten at vi hadde valgt noen av delene. Dette kunne skape forvirring og gjorde at vi måtte lese gjennom alt med ekstra årvåkenhet.
- Vi måtte ofte justere promptene flere ganger for ønsket output.  
- Avsporing fra BMAD-prosessen: Selv om vi jobbet med BMAD-rammeverket, måtte vi ofte minne Gemini på hvilken agent vi jobbet med og at den skulle holde seg til sin spesifikke rolle. Uten slike påminnelser, falt den gjerne ut av BMAD-modellen og begynte å blande roller eller "løpe foran" i prosessen. Dette førte også til at mappen vår ble tømt på et tidspunkt.
- Prompt-iterasjon var nødvendig: Det var sjelden at vi fikk ønsket resultat på første forsøk. Vi måtte typisk justere promptene flere ganger for å få riktig detaljnivå, formatering og output. Dette krevde både tålmodighet og forståelse for hvordan LLM-er tolker kontekst og språk.
- Mangel på minne og kontekst i lengre løp: I lengre samtaler glemte agentene tidligere detaljer, selv når vi forsøkte å gi eksplisitt kontekst. Dette førte til at vi måtte gjenta oss selv eller lime inn tidligere output i promptene for å få konsistens. 


---

## 4. Kritisk vurdering av KI sin påvirkning

### 4.1 Fordeler med KI-assistanse

**Effektivitet og produktivitet:**  
- Vi laget en full løsning uten å skrive manuell kode.  
- Koden ble generert nokså raskt etter tydelige prompt.

**Læring og forståelse:**  
- Vi lærte hvordan KI løser arkitektur, logikk og design. 
- Økt forståelse for hvordan man må "snakke KI-språket" for å få resultater.

**Kvalitet på koden:**  
- Koden fungerte rett ut av boksen i mange tilfeller . 
- KI foreslo god struktur, grei UX og forklarte hva den gjorde.

### 4.2 Begrensninger og ulemper

**Kvalitet og pålitelighet:**  
- Kontekst, som at vi benyttet BMAD-rammeverk ble glemt, og nødvendige filer og mapper ble overskrevet.
- Hastigheten på respons gikk ned når vi gikk tom for tokens, noe som opplevdes litt frustrerende.


**Avhengighet og forståelse:**  
- Lærer lite om kode når KI gjør alt, på godt og vondt.
- Vi måtte lære oss å kjenne "KI-språket" og hvor tydelige vi måtte være i hva vi ba om.

**Kreativitet og problemløsning:**  
- KI løste problemer ut fra hva vi i prompter anga vi fikk av feil.  
- Tidvist føltes det som KI leste tankene våre, da vi flere ganger diskuterte muntlig tillegg vi burde ha med, og den i neste steg foreslo akkurat det.

### 4.3 Sammenligning: Med og uten KI
- Uten KI: Vi måtte skrevet hele løsningen selv, og dermed brukt mye lengre tid. 
- Med KI: Ferdig kode og UI på kortere tid, men krever prompt-ferdigheter og tålmodighet.
- Sluttresultatet er nok raskere, men løsningen hadde kanskje vært mer tilpasset uten KI.
- Den viktigste lærdommen var likevel hvor mye aktiv styring og kontroll som faktisk kreves for å lykkes med en KI-drevet utviklingsprosess. Det holder ikke å skrive en enkel prompt og lene seg tilbake – vi måtte være tydelige, konkrete og ofte korrigere underveis. KI følger ikke nødvendigvis beste praksis, og tok seg av og til friheter som vi ikke hadde godkjent. Dette stilte krav til vår evne til å forstå det som ble produsert, og å tenke kritisk hele veien.
- Likevel er det ingen tvil om at prosjektet hadde blitt både tyngre og tregere uten KI. Det var spennende å jobbe med verktøy som Gemini og BMAD, og prosjektet ga oss god innsikt i hvordan fremtidens utviklingsprosesser kan se ut – med mennesker som kreative og strategiske drivere, og KI som den operative utviklingskraften.


### 4.4 Samlet vurdering
- KI var totalt sett en svært positiv og effektiv bidragsyter i prosjektet. Vi klarte å utvikle en fungerende og nyttig applikasjon på relativt kort tid – noe som ville vært langt mer tidkrevende om alt skulle vært manuelt kodet og designet. Ved å bruke agenter med ulike roller opplevde vi at prosjektet ble langt mer strukturert enn vi først så for oss. 
- Den største lærdommen var hvor mye kontroll vi faktisk må ha – selv om KI gjør jobben.

---

## 2. Utviklingsprosessen

### 2.1 Oversikt over prosjektet
Vi har utviklet **QuizZum** – en webbasert KI-drevet applikasjon som hjelper studenter å repetere fagstoff på en strukturert og engasjerende måte. Applikasjonen tar imot forelesningsnotater i både tekst og PDF-format, og omformer dette innholdet til:
- Sammendrag i tre nivåer (enkel, middels, avansert)
- Quiz-spørsmål med flervalg og tilhørende fasit.
- Oppfølgingsquiz som automatisk fokuserer på områder man har scoret svakt på.


Løsningen gir studenten umiddelbar tilbakemelding, og analyserer hvilke temaer som er godt forstått og hvilke som trenger mer øving. Basert på dette foreslås nye spørsmål i relevante fagområder. På denne måten fungerer applikasjonen ikke bare som en tradisjonell quizgenerator, men som en intelligent læringsassistent som følger opp brukerens progresjon.
Designet er enkelt og brukervennlig, med visuelle indikatorer (f.eks. statusbar) som viser fremgang for hver vanskelighetsgrad. Dette gjør at studenten enkelt kan følge med på egen læring og repetisjon over tid.
Formålet med løsningen er å gjøre læring mer effektiv, morsommere og mer tilpasset den enkeltes behov og nivå – uavhengig av fag eller bakgrunn.
Prosjektet er utviklet i tråd med målsetningene i IBE160: Vi har brukt KI ikke bare til koding, men til hele utviklingsprosessen. Gjennom BMAD-rammeverket har vi fungert som “kunden” i prosjektet, mens KI-agentene har hatt rollene som forretningsanalytiker, utvikler, arkitekt, UX-designer, prosjektleder, testansvarlig og mer. Prosjektet viser hvordan det er mulig å bygge en fullverdig applikasjon ved hjelp av generativ KI og riktig prompt-strategi – uten at man selv skriver en eneste linje kode manuelt.


### 2.2 Arbeidsmetodikk
Vi brukte BMAD-rammeverket (Behov, Mål, Analyse, Design) i kombinasjon med ulike KI-agenter, styrt gjennom prompts i Visual Studio Code. Dette rammeverket var ryggraden i hele utviklingsprosessen og sørget for at vi fulgte en strukturert og metodisk tilnærming – fra idé til ferdig applikasjon.
- Alle steg i prosjektet ble styrt gjennom dialog med agentene, hvor vi formulerte tydelige og målrettede prompts basert på BMAD-modellen.
- Vi fungerte som kunder og koordinatorer, og brukte agenter som analyst, architect, dev, qa, ux og pm som våre "digitale medarbeidere" – hver med sitt ansvarsområde.
- Vi jobbet iterativt og bygget gradvis ut løsningen ved å gå frem og tilbake mellom planlegging, utvikling og testing.
- Underveis måtte vi ofte tilpasse promptene våre for å sikre at agentene holdt seg til konteksten og prosjektets rammer – spesielt viktig for architect og dev, som noen ganger tok seg litt kunstnerisk friheter.
- Vi benyttet GitHub til versjonskontroll, lagring av prompt-historikk og samarbeidsfiler. Kommunikasjon og planlegging ble koordinert gjennom uformelle arbeidsmøter og jevnlig sparring mellom gruppemedlemmene.

Ved å bruke BMAD som metode og Gemini som verktøy, fikk vi ikke bare utviklet selve applikasjonen – vi fikk også erfaring med hvordan man leder og strukturerer et prosjekt der KI har ansvar for alt det tekniske. Vår rolle var å være tydelige, reflekterte og kritiske – hele veien.

**Fordeling:**
- Vi jobbet hovedsakelig synkront gjennom felles økter.
- Brukte GitHub til versjonskontroll og felles mappe for dokumentasjon og prompts.
- Arbeidet ble fordelt flytende – vi hadde begge ansvar for prompts, testing, dokumentasjon og rapportskriving.

**KI-bruk:**
- KI-agentplattform: Gemini CLI via BMAD-orchestrator i VS Code
- Alt arbeid – fra arkitektur til kode – ble utført av agenter, basert på våre prompter

### 2.3 Teknologi og verktøy
- **Frontend:** HTML/CSS + KI-generert JavaScript + React
- **Backend:** KI-generert Python og fast API
- **KI-verktøy:** Gemini via BMAD i VS Code  
- **Andre verktøy:** Visual Studio Code, Git, Markdown, BMAD-rammeverket

### 2.4 Utviklingsfaser

**Fase 1: Planlegging**  
- Vi startet med `bmad-orchestrator` og definerte behov og mål  
- Vi fikk da oversikt over nødvendige agenter
- Vi fikk agentene til å utforme en Product Requirements Document (PRD) gjennom analyst, pm og architect. 
- Fikk anbefalt mappestruktur, teknologivalg, og hvilke agenter vi skulle bruke  
- Basert på input fra analyst og tech writer, identifiserte vi funksjonelle og ikke-funksjonelle krav til løsningen.  
- UX designer foreslo hvordan brukergrensesnittet kunne se ut, samt hvilke steg som inngår i brukerreisen.

**Fase 2: Utvikling**  
- `architect`- agenten foreslo struktur, hvilke mapper og filer vi trenge, og hvilke teknologier som skulle brukes. Vi brukte blant annet forslag om React i frontend og FastAPI i backend.
- `dev`-agent genererte frontend- og backendkode gjennom brukerhistorier. Hver gang en story var ferdig utviklet, ble den sendt videre til qa (quality assurance) og test for code review og test. 
- `pm` brøt ned funksjonene i epics og user stories, som ble delt inn i oppgaver til ulike agenter.
- `qa` testet koden og foreslo forbedringer.  
- `ux` laget forslag til visning og flyt (statusbar + interaktiv quiz).

---
## 5. Etiske implikasjoner

### 5.1 Ansvar og eierskap
- Vi står ansvarlige for alt som leveres, også KI-generert kode  
- Kvalitet ble sikret ved manuell sjekk og test

### 5.2 Transparens
- Vi dokumenterer all KI-bruk i rapport og GitHub  
- KI-bruk bør oppgis, særlig i utdanningsløp

### 5.3 Påvirkning på læring og kompetanse
- Risiko for å bli "promptere" og ikke utviklere  
- Men også økt forståelse for systemutvikling som prosess
- Samhandling mellom KI og menneske er viktig kompetanse

### 5.4 Arbeidsmarkedet
- KI kan erstatte enkelte oppgaver, men ikke kritisk tenking  
- Fremtidens utviklere må kunne samhandle med KI

### 5.5 Datasikkerhet og personvern 
- Vi delte ingen sensitive data med KI (Måtte dog ha API-nøkkel fra en av oss for å få kjørt kall).  
- Så lenge KI lager all kode kan vi ikke være sikre på at utviklingen skjer i henhold til gjeldende retningslinjer og lovverk for personvern og datasikkerhet.
- Vi har begge brukt private Github repositories.

---

## 6. Teknologiske implikasjoner

### 6.1 Kodekvalitet og vedlikehold
- KI-generert kode kan ofte være funksjonell og godt strukturert, men vi er usikre på hvor god dokumentasjonen er, noe som potensielt kan gjøre vedlikehold utfordrende – spesielt i større prosjekter.
- Kodekvaliteten virker god, da vi får en fungerende løsning rimelig kjapt.

### 6.2 Standarder og beste praksis
- Vi opplevde at KI i de fleste tilfeller følger moderne utviklingsstandarder, både når det gjelder filstruktur, navngivning og komponentorganisering. 
- Likevel måtte vi justere utdaterte eller dårlig optimaliserte løsninger, for eksempel at den installerer gamle versjoner av pakker. Det er derfor avgjørende å ha kritisk blikk og dobbeltsjekke installasjonsvalg og versjoner.

### 6.3 Fremtidig utvikling
- KI kommer til å endre måten vi utvikler programvare på. Det som tidligere krevde timer med manuell koding, kan nå løses med et godt formulert prompt – gitt at man vet hva man spør om.
- Viktigste ferdighetene fremover vil være:
- Prompt engineering - å vite hva du skal spørre om og hvordan du spør.
- Systemforståelse - å se helheten i løsningen og hvordan komponentene henger sammen.
- Kreativitet – for å kunne forme funksjonalitet og brukeropplevelse.
- Tålmodighet – da KI ikke alltid forstår første forsøk, og justeringer er en del av prosessen.
- Vår erfaring er at den som mestrer samspillet mellom KI og menneskelig vurdering, får et enormt fortrinn i fremtidens utviklingslandskap.
---

## 7. Konklusjon og læring

### 7.1 Viktigste lærdommer
1. Gode promtper gir god kode - kvaliteten på output henger tett sammen med hvor presist og tydelig vi beskrev behovet.
2. KI gjør deg ikke overflødig - det gjør deg raskere - man sparer mye tid, men må fortsatt styre og kvalitetssikre prosessen.
3. Du må forstå hva du ber om - det holder ikke å kopiere forslag fra nettet eller skrive korte kommandoer. Kontekst, intensjon og struktur teller.
4. KI er nyttig i planlegging og struktur - spesielt i tidlige faser (arkitektur, TODO-lister, UX-flyt).
5. Du lærer masse bare ved å lede agentene riktig - selv uten å skrive kode selv, får man innsikt i arkitektur, utviklingsvalg og systemforståelse.

### 7.2 Hva ville dere gjort annerledes?
- Hyppigere bruk av versjonskontroll (Github): Vi brukte Git, men ikke ofte nok. Hadde vi gjort commits oftere, kunne vi rullet tilbake endringer enklere.
- Bedre promptlogging underveis (vi trodde .gemini-mappen logget prompter) 
- Mer tid på frontend og UX: Vi fokuserte mest på funksjonalitet. Resultatet fungerte godt, men hadde hatt nytte av mer visuell polering og bedre tilrettelegging for brukerflyt.
- Mer struktur i samarbeidet med agentene: Vi kunne med fordel hatt en intern plan for når vi skulle bruke hvilke agenter, og hva som var definert som "godt nok" svar fra hver.

### 7.3 Anbefalinger
- Jobb strukturert - Følg BMAD-modellen stegvis, og la agentene gjøre det de er laget for. Dokumenter alt du gjør.
- Ikke stol blindt på KI  
- Bruk versjonskontroll - Det gir trygghet underveis og lar deg teste uten frykt for å miste noe.
- Tilpass promptene underveis: Ikke gi opp hvis første svar ikke er bra. Prøv å justere kontekst, formulering eller del opp i mindre oppgaver.

### 7.4 Personlig refleksjon

**Eline:**  
Jeg synes det var fascinerende å se hvordan de enkelte agentene utfylte hverandre og at det til slutt faktisk kunne kjøres en fungerende applikasjon – uten at vi skrev en eneste linje kode selv. Jeg har brukt generativ KI som ChatGPT en del før, og kjente igjen viktigheten av å forklare både kontekst og ønsket løsning grundig. Det ble ekstra tydelig i dialogen med Gemini – jo mer presis og tydelig vi var, jo bedre ble resultatet.
Det som kanskje overrasket meg mest, var hvor "menneskelige" agentene virket i sin respons – på godt og vondt. Noen ganger føltes det som å jobbe i et team med flere meninger og initiativ, og det krevde faktisk ledelse og koordinering for å holde alt på sporet. Det var gøy å se resultatene vokse fram, og veldig lærerikt å forstå hvordan systemutvikling kan skje gjennom AI-ledede prosesser. Jeg sitter igjen med større respekt for prompt engineering – og en nysgjerrighet på hvordan dette vil endre arbeidslivet framover.


**Sindre:**  
Å se de ulike rollene agentene hadde var både lærerikt og interessant. Det føltes som å jobbe med et slags virtuelt utviklingsteam, og jeg ble mer bevisst på hvor viktig kommunikasjon faktisk er – også når den skjer gjennom tekst til KI. Jeg opplevde at når man ga tydelig tilbakemelding i promptene, for eksempel på feilmeldinger eller ting vi ikke var fornøyd med, så kom det ofte forbedringer med én gang.
Samtidig var det frustrerende til tider. Vi hadde flere øyeblikk der noe så enkelt som en knapp eller visning i frontend plutselig sluttet å fungere, fordi KI hadde gjort større endringer enn vi ba om. Det ble en påminnelse om at man aldri helt kan slippe kontrollen, selv om man har "KI-utviklere" på laget. Likevel synes jeg det var utrolig spennende å jobbe på denne måten. Jeg føler jeg har fått en ny forståelse for systemutvikling som handler mer om styring og forståelse – og ikke bare koding.


---

## 8. Vedlegg (valgfritt) 
- Lenke til GitHub-repo: https://github.com/IBE160/SG-Driftige


---

**Ordantall:** Ca. 3061  
**Forventet lengde:** Innenfor 3000–5000 ord
 