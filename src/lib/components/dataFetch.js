import * as d3 from "d3";

// data fetchen via zoeken voor elke naam in "trilogyTitles" en vervolgens voor elke film opnieuw data fetchen
// om de informatie van de film te verkrijgen en op te slaan

export async function fetchMovies(trilogyTitles) {

    const apiKey = import.meta.env.VITE_OMDB_API_KEY; 

    const movieData = [];
    for (const trilogy of trilogyTitles) {
    
        // asynchroon data fetchen 
        // bron: werkgroep Berry (notion)
        const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(trilogy)}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === "True") {
            for (const movie of data.Search) {
        
                const detailsResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
                const detailsData = await detailsResponse.json();

                movieData.push({
                title: movie.Title,
                year: parseInt(movie.Year), 
                genre: detailsData.Genre,
                poster: movie.Poster,
                rating: detailsData.imdbRating * 10 ? detailsData.imdbRating * 10 : Math.floor(Math.random() * 50) + 50, 
                series: trilogy,  
                });
            }
        }
  }
// alles sorteren op jaartal zodat de numering is op chronologische volgorde
movieData.sort((a, b) => a.year - b.year);

// de films die bij elkaar horen grouperen op triologie
const seriesGroups = d3.groups(movieData, d => d.series);

// elke film in elke triologie een nummer geven op basis van het jaartal
seriesGroups.forEach(([series, movies]) => {
    movies.forEach((movie, index) => {
      movie.number = index + 1;});
  });

return movieData;
}

// --------------------------------