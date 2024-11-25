<script>
    import { onMount } from "svelte";
  
    let stepTutorial = 0; 

    const tutorialSteps = [
      { top: "0%", left: "0%", height: "18%", width: "100%" }, // over de titel en introductietekst
      { top: "18%", left: "0%", height: "20%", width: "100%" }, // over de filterknoppen
      { top: "40%", left: "0%", height: "60%", width: "100%" }, // over de grafiek
    ]

    const nextStep = () => {
      if (stepTutorial < tutorialSteps.length - 1) {
        stepTutorial += 1;
      } else {
        stepTutorial = null;
      }
    };
  
    // dit zorgt ervoor dat je niet kunt scrollen tijdens de tutorial
    onMount(() => {
      document.body.style.overflow = "hidden"; 
    });
</script>
  
  
<!----- HTML ----->

{#if stepTutorial !== null}
    <div class="overlay">
      <div class="highlight" style="top: {tutorialSteps[stepTutorial].top}; left: {tutorialSteps[stepTutorial].left}; width: {tutorialSteps[stepTutorial].width}; height: {tutorialSteps[stepTutorial].height};"></div>
      <div class="tooltip">
        {#if stepTutorial === 0}
        Welkom! Hier lees je de introductie van de visualisatie.
        {:else if stepTutorial === 1}
        Dit zijn de filterknoppen waarmee je specifieke genres kunt selecteren.
        {:else if stepTutorial === 2}
        Bekijk de visualisatie van filmratings hier.
        {/if}
      </div>
  
      <button class="tooltip-button" on:click={nextStep}> Volgende </button>
    </div>
{/if}

  

<!---- CSS ----->

<style>
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .highlight {
      position: absolute;
      background: transparent;
      z-index: 10000;
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
      
    }
  
    .tooltip {
      position: absolute;
      bottom: 50px;
      background: white;
      color: black;
      font-family:"Libre Franklin";
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      text-align: center;
      z-index: 10001;
    }
  
    .tooltip-button {
      position: absolute;
      bottom: 50px;
      right: 70px;
      z-index: 10002;
      background: #FFF224;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 16px;
      font-family: "Libre Franklin";
    }
  
    .tooltip-button:hover {
      background: #e3ce0f;
    }
</style>