<script>

import { onMount } from "svelte";
import * as d3 from "d3";
import { fetchMovies } from '$lib/components/dataFetch.js';
import { trilogiesNames } from '$lib/components/trilogyList.js';


// vanaf hier is het aanmaken van de grafiek

onMount(async() => {
    const movies = await fetchMovies(trilogiesNames) // datafetch met de lijst uit trilogiesNames

    const marginBox = 50;
    const marginInline = 75;
      
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
  
    const maxNumberMovies = d3.max(movies, d => d.number);    // max aantal films in een trilogie meten

    // xScale = schaal van 1 tot maxNumberMovies (hoogste aantal films)   
    const xScale = d3
        .scalePoint()
        .domain(d3.range(1, maxNumberMovies + 1))
        .range([marginInline, width - marginInline]);

    // yScale = schaal van 0 tot 100 voor IMDB rating
    const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height - marginBox, marginBox]);
  
    // grafiek selecteren uit de DOM
    const svg = d3.select("#parallel-plot")
        .attr("width", width)
        .attr("height", height);
  
    // hier maak ik de lijnen aan op de x-as, waarbij x positie 
    // gelijk is aan de nummer van de film en de y is gelijk aan 'height'
    svg.selectAll("#x-lines")
        .data(movies)
        .join("line")
        .attr("x1", d => xScale(d.number))
        .attr("y1", marginBox)
        .attr("x2", d => xScale(d.number))
        .attr("y2", height - marginBox)
        .attr("stroke", "grey")
        .attr("stroke-opacity", 0.25)
        .attr("stroke-width", 1);
  
    // x-as toevoegen onderaan de grafiek met witte tekst
    // bron : https://d3js.org/d3-axis
    svg.append("g")
        .call(d3.axisBottom(xScale))
        .attr("transform", `translate(0,${height - marginBox})`)
        .attr("color", "grey")
  
    // y-as toevoegen op dezelfde manier maar met 3 ticks
    svg.append("g")
        .call(d3.axisLeft(yScale).ticks(3))
        .attr("transform", `translate(${marginInline},0)`)
        .attr("color", "grey")

    // x-as label (nummmer van de film binnen de trilogie):
    svg.append("text")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .attr("x", width - marginInline)
        .attr("y", height - marginBox + 40)
        .text("Film nummer →")
        .style("font-size", "10px")
        .style("opacity", .30)

    // y-as label (de IMDB rating):
    svg.append("text")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", marginInline - 40)
        .attr("x", -marginBox)
        .text("IMDB-rating →")
        .style("font-size", "10px")
        .style("opacity", .30)

        
    // de lijnen tekenen waarbij de x positie gelijk is aan de film 
    // nummer en de y positie gelijk is aan de rating van de film
    const line = d3.line()
        .x(d => xScale(d.number))
        .y(d => yScale(d.rating));
  

    // film objecten groeperen op trilogie
    const trilogies = d3.groups(movies, d => d.series);
    
    console.log(trilogies)


    // naam trilogie (string) omzetten naar een geldige classnaam: leestekens verwijderen, geen spaties, etc.
    // zodat de elementen die bij elkaar horen op dezelfde manier kunnen worden aangesproken
    // bron:    https://gist.github.com/dbowling/2589645
    //          https://stackoverflow.com/questions/7627000/javascript-convert-string-to-safe-class-name-for-css 

    function formatClassName(series) {
        return series.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\-]/g, "").toLowerCase();
    }


    
    // filter functie met genre die kijkt of de genre is gedefinieerd en overeenkomt met de selectedGenre
    function filterByGenre(selectedGenre) {
        return trilogies.filter(([series, movies]) =>
        movies.some(movie => movie.genre && movie.genre.includes(selectedGenre)));    }

    // grafiek opnieuw renderen met update van de dataset
    function updateChartWithGenre(selectedGenre) {
        const filteredTrilogies = filterByGenre(selectedGenre);
        drawChart(filteredTrilogies);
    }




    // ------ DRAW CHART -----------

    // in deze functie wordt: 
    // - voor elke trilogie een lijn aangemaakt in de grafiek
    // - voor elke triolgoie de eerste filmposter weergegeven
    // - voor elke film binnen de trilogie een bolletje in de grafiek aangemaakt


    function drawChart(trilogies){

    // alle onderdelen verwijderen zodat bij het filteren er geen elementen blijven staan
        d3.select("#poster-list").selectAll("img").remove(); 
        svg.selectAll("[class^='circle-']").remove();
        svg.selectAll("[class^='path-']").remove();
        svg.selectAll("[class^='title-']").remove();

        trilogies.forEach(([series, movies]) => {
        
        const posterList = d3.select("#poster-list"); 
        const tooltip = d3.select("#tooltip");

        const formattedSeries = formatClassName(series); 

        // FILMPOSTERS
        posterList.append("img")
            .attr("src", movies[0].poster) 
            .attr("class", `img-${formattedSeries}`)
            .attr("width", 2 * 40)
            .attr("height", 3 * 40)
            .style("cursor", "pointer")
            // poster - mouseover
            .on("mouseover", () => {
                tooltip.style("visibility", "visible")
                        .text(series);

                d3.selectAll("path")
                    .attr("stroke-opacity", 0.5)
                    .attr("stroke", "grey");

                d3.selectAll("img")
                    .style("opacity", 0.25)

                d3.select(`.img-${formattedSeries}`)
                    .style("opacity", 1)

                d3.select(`.path-${formattedSeries}`)
                    .attr("stroke-opacity", 1)
                    .attr("stroke", "yellow")
                    .attr("stroke-width", 2)

                d3.selectAll(`.title-${formattedSeries}`)
                  .attr("visibility", "visible")   
                
                d3.selectAll(`.circle-${formattedSeries}`)
                    .attr("visibility", "visible");})

            // poster - mousemove
            .on("mousemove", (e) => {
                tooltip.style("top", e.pageY - 10 + "px")
                        .style("left", e.pageX + 10 + "px")})

            // poster - mouseout        
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");

                d3.selectAll("path")
                    .attr("stroke-opacity", 1)
                    .attr("stroke", "white")
                    .attr("stroke-width", .5)

                d3.selectAll(`.circle-${formattedSeries}`)
                    .attr("visibility", "hidden");

                d3.selectAll(`.title-${formattedSeries}`)
                    .attr("visibility", "hidden")
                    
                d3.selectAll("img")
                    .style("opacity", 1)  
    

            });


        // BOLLETJES VOOR ELKE FILM
        movies.forEach(movie => {
            svg.append("circle")
                .attr("cx", xScale(movie.number))
                .attr("cy", yScale(movie.rating))
                .attr("r", 3)
                .attr("fill", "white")
                .attr("class", `circle-${formattedSeries}`)
                .attr("visibility", "hidden")

            svg.append("text")
                .attr("class", `title-${formattedSeries}`)
                .attr("x", xScale(movie.number)) 
                .attr("y", marginBox - 15)           
                .attr("text-anchor", "start")     
                .attr("fill", "grey")       
                .attr("font-size", "8")
                .text(movie.title.length > 25 ? movie.title.slice(0, 25) + "..." : movie.title) // max aantal tekens zodat de titels niet overlappen
                .attr("visibility", "hidden")         
        });


        // LIJN IN DE GRAFIEK VOOR ELKE TRILOGIE
        svg.append("path")
            .datum(movies)
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("class", `path-${formattedSeries}`)
            .attr("stroke-width", .5)
            .attr("d", line)
        
            // lijn - mouseover 
            .on("mouseover", function () {
            tooltip.style("visibility", "visible")
                    .text(`${series}`);
  
            svg.selectAll("path")
                .attr("stroke-opacity", 0.5)
                .attr("stroke-width", .5)
                .attr("stroke", "white");
  
            d3.select(this)
                .attr("stroke-opacity", 1)
                .attr("stroke-width", 2)
                .attr("stroke", "yellow");

            d3.selectAll(`.circle-${formattedSeries}`)
                .attr("visibility", "visible");

            d3.selectAll(`.title-${formattedSeries}`)
                  .attr("visibility", "visible")     
            
            d3.selectAll("img")
                .style("opacity", .25)
            d3.selectAll(`.img-${formattedSeries}`)
                .style("opacity", 1)})

             // lijn - mousemove  (tooltip positioneren naast je cursor)
             // bron: https://medium.com/@mila_frerichs/how-to-create-a-simple-tooltip-in-d3-js-45040afada07
            .on("mousemove", (e) => {
                tooltip.style("top", e.pageY - 10 + "px")
                        .style("left", e.pageX + 10 + "px")})

            // lijn - mouseout 
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
                svg.selectAll("path")
                    .attr("stroke-opacity", 1)
                    .attr("stroke-width", .5)
                    .attr("stroke", "white");
                d3.selectAll(`.circle-${formattedSeries}`)
                    .attr("visibility", "hidden")
                d3.selectAll("img")
                    .style("opacity", 1)
                d3.selectAll(`.title-${formattedSeries}`)
                .attr("visibility", "hidden")})
                
            // lijn animeren van links naar rechts met transition
            // bron: https://observablehq.com/@onoratod/animate-a-path-in-d3 
            //       https://medium.com/@sahilaug/line-graphs-using-d3-animating-the-line-f82a1dfc3c91
            .attr("stroke-dasharray", function () {
                const totalLength = this.getTotalLength() 
                return totalLength})
            .attr("stroke-dashoffset", function () {
                return this.getTotalLength()})
            .transition()
            .duration(2000)
            .attr("stroke-dashoffset", 0)
    });
        
    }



    // FILTER KNOPPEN DEFINIEREN
    const buttonAlle = document.querySelector("#button-all")
    const button1 = document.querySelector("#button-1");
    const button2 = document.querySelector("#button-2");
    const button3 = document.querySelector("#button-3");
    const button4 = document.querySelector("#button-4");
    const button5 = document.querySelector("#button-5");
    const button6 = document.querySelector("#button-6");
    

    // filter knopppen koppelen aan update functie met de desbetreffende genre
    buttonAlle.addEventListener("click", () => {
            updateChartWithGenre("");
    });

    button1.addEventListener("click", () => {
        updateChartWithGenre("Thriller");
    });

    button2.addEventListener("click", () => {
        updateChartWithGenre("Thriller");
    });

    button3.addEventListener("click", () => {
        updateChartWithGenre("Comedy");
    });

    button4.addEventListener("click", () => {
        updateChartWithGenre("Docu");
    });

    button5.addEventListener("click", () => {
        updateChartWithGenre("Drama");
    });

    button6.addEventListener("click", () => {
        updateChartWithGenre("Animation");
    });


    // CHART LADEN 

    window.addEventListener('DOMContentLoaded', () => {
        drawChart(trilogies)
    });
});


// ---------------------------------
</script>
  


  

<!-- HTML -->
<svg id="parallel-plot"></svg>
<div id="tooltip"></div>
<div id="button-wrap">
    <form>
      <input type="radio" name="filter" id="button-all" value="Alle" >
      <label for="button-all">Alles</label>
  
      <input type="radio" name="filter" id="button-1" value="Action">
      <label for="button-1">Action</label>
  
      <input type="radio" name="filter" id="button-2" value="Thriller">
      <label for="button-2">Thriller</label>
  
      <input type="radio" name="filter" id="button-3" value="Comedy">
      <label for="button-3">Comedy</label>
  
      <input type="radio" name="filter" id="button-4" value="Docu">
      <label for="button-4">Docu</label>
  
      <input type="radio" name="filter" id="button-5" value="Drama">
      <label for="button-5">Drama</label>
  
      <input type="radio" name="filter" id="button-6" value="Animation">
      <label for="button-6">Animation</label>
    </form>
  </div>
  
  
<div id="poster-list"></div>



<!-- CSS -->
  <style>
    #poster-list {
    display: flex;
    margin-left: 75px;
    overflow-x: scroll;
    }

    #poster-list img {
        padding-right: 50px;
    }
    
    #parallel-plot {
        position: absolute;
        bottom: 0;
    }

    #tooltip {
      position: absolute;
      visibility: hidden;
      background: #333;
      color: #fff;
      padding: 5px;
      border-radius: 4px;
      pointer-events: none;
      font-size: 12px;
      font-family: Arial;
    }

    .label{
        fill: white;
        font-size: 0.6rem;
    }


    /* BUTTONS */

    #button-wrap{
        margin: 10px 0px 15px 75px;

    }

    input[type="radio"] {
        display: none;
    }

    label {
        background-color: black;
        cursor: pointer;
        box-shadow: none;
        border: none;
        stroke: none;
        padding: 5px 15px;
        outline: rgb(53, 52, 52) 1px solid;
        color: rgb(157, 157, 157);
        font-size: 10px;
        font-family: "Libre Franklin";
    }

    label:hover{
        box-shadow: rgba(255, 238, 0, 0.5) 0px 0px 12px;
        color: white;
        }

    input[type="radio"]:checked + label{
        color: white;
        outline: #FFF224 solid .5px;
        box-shadow: rgba(255, 238, 0, 0.5) 0px 0px 12px;
    }

  </style>
  