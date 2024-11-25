<script>
    import ParallelPlot from "$lib/components/parallelPlot.svelte";
    import GraphTooltip from "../lib/components/graphTooltip.svelte";
    import TutorialOverlay from "../lib/components/tutorialOverlay.svelte";
</script>












<main>

<TutorialOverlay/> 
    <section class="introduction">
        <h1><span>Filmseries</span> in Beeld</h1>
        <p>IMDB is een platform waar films worden beoordeeld door miljoenen kijkers over de hele wereld. Maar hoe verhouden de scores van films binnen een reeks zich tot elkaar? Is de eerste film altijd het beste, of worden ze juist beter naarmate de reeks vordert? In deze visualisatie worden de ratings van bekende trilogieën geanalyseerd en in beeld gebracht.</p>
        <h4>1. Kies een genre of bekijk alle trilogieën</h4>
        <GraphTooltip/>
    </section>

<ParallelPlot/>

</main>






<style>


    main{
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            color: white;
            height: 100vh;
            width: 100vw;
            background-color: black;
            margin: 0;
            padding: 0;
    }

    .introduction{
        margin-left: 75px;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
    }

    p{
        font-family: "Libre Franklin";
        font-size: .70rem;
        font-weight: 200;
        color: whitesmoke;
        max-width: 50%;
        margin-bottom: 25px;
    }

    h1, h4{
        margin: 0;
        padding: 0;
        font-family: "Libre Franklin";
    }

    h1 {
        font-weight: 500;
    }

    span{
        color: #FFF224;
    }

    h4 {
        font-weight: 200;
        font-size: .8rem;
        color: grey;
    }

</style>