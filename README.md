# IMDb Trilogie Data-visualisatie

## Inhoudsopgave
1. [Projectbeschrijving](#projectbeschrijving)
2. [Functionaliteiten](#functionaliteiten)
3. [Installatie](#installatie)
4. [Gebruik](#gebruik)
5. [Bestandsstructuur](#bestandsstructuur)
6. [Technologieën](#technologieën)
7. [Auteurs](#auteur)
8. [Licentie](#licentie)

---

## Projectbeschrijving

Dit project visualiseert de IMDb-scores van bekende filmtrilogieën. Door interactieve grafieken en tooltips wordt inzichtelijk gemaakt hoe de scores binnen een filmreeks zich tot elkaar verhouden:
- Is de eerste film altijd de beste?
- Worden sequels met de tijd beter of slechter beoordeeld?

Het project maakt gebruik van data van de [OMDb API](https://www.omdbapi.com/) en is ontwikkeld als onderdeel van minor Information Design van CMD Amsterdam.

---

## Functionaliteiten

- **Data ophalen en verwerken**: Data wordt dynamisch geladen van de OMDb API op basis van vooraf gedefinieerde filmtitels.
- **Interactiviteit**:
  - Hover over grafieken om extra informatie te zien.
  - Filter films op genre met interactieve knoppen.
- **Visualisatie**:
  - IMDb-scores worden gevisualiseerd met behulp van D3.js.
  - Filmgegevens zoals posters en genres worden weergegeven.
- **Gebruiksvriendelijk**: Een introductie-tutorial leidt gebruikers door de belangrijkste functies van de applicatie.

---

## Installatie

1. **Clone het project**:
   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository
2. **Installeer afhankelijkheden**:
   ```bash
   npm install
3. **Voeg een .env-bestand toe**:
   Maak een .env-bestand aan in de root van het project en voeg jouw OMDb API-sleutel toe:
   ```bash
   VITE_OMDB_API_KEY=your_api_key
4. **Start de server**:
   ```bash
   npm run dev
5. **Open de applicatie**:
   Ga naar http://localhost:5173 in je browser.

---

## Gebruik 

Na het starten van de server kun je de volgende stappen volgend: 
1. Bekijk de introductie-tutorial voor een overzicht van de applicatie.
2. Gebruik de filteropties bovenaan de pagina om te wisselen tussen genres.
3. Beweeg met de muis over de grafieken om details van specifieke films te zien.

---

## Bestandsstructuur
 ```bash
src/
├── components/        # Herbruikbare Svelte-componenten
├── routes/            # Pagina's en hun logica
├── lib/
│   ├── fetchMovies.js # API-aanroepen en data-verwerking
│   └── utils.js       # Hulpmiddelen en helperfuncties
├── styles/            # Globale en component-specifieke stijlen
├── main.js            # Applicatie-entrypoint
```
---

## Technologieën 

- **SvelteKit:** Frontend framework voor componentgebaseerde ontwikkeling.
- **D3.js:** Voor krachtige en dynamische datavisualisaties.
- **OMDb API:** Externe data provider voor filminformatie.
- **Vercel:** Voor hosting en deployment.

---

## Auteur 

- **Naam:** Niels Bakker
- **Studentnummer:** 500906088
- **Opleiding:** Communicatie en Multimedia Design | Information Design 
- **Inleverdatum** 28 november 2024

---

## Licentie 

Dit project is gelicentieerd onder de MIT-licentie. Zie het LICENSE-bestand voor meer informatie.
