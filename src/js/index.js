export const globalData = {
    pares: [],
    time: 5
};

let generatedPairs = [];
    let countdownInterval;
    let timeoutId;

    

    function startTest() {
      console.log("Test started");
      
      globalData.time = time;
      const omitted = document.getElementById("omitLetters").value.toUpperCase().replace(/[^A-Z]/g, "").split("");

      
      generatedPairs = generateLetterPairs(count, omitted);
      globalData.pares = generatedPairs.join(" ");
      window.location.href = "/src/html/memo.html";
      //document.getElementById("letterPairs").textContent = generatedPairs.join(" ");
      
      //document.getElementById("setup").classList.add("hidden");
      //document.getElementById("memorizePhase").classList.remove("hidden");

      //const timerDisplay = document.getElementById("timer");
  
      /*let remaining = time;

      const tickSound = document.getElementById("tickSound");
      const urgentSound = document.getElementById("urgentSound");

      timerDisplay.textContent = `Tiempo restante: ${remaining} segundos`;

      countdownInterval = setInterval(() => {
        remaining--;
        timerDisplay.textContent = `Tiempo restante: ${remaining} segundos`;

        if (remaining <= 5) {
          timerDisplay.classList.add("low-time");
        }

        if (remaining <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);*/

      timeoutId = setTimeout(() => {
        moveToInputPhase();
      }, time * 1000);
    }

    /*function finishMemorization() {
      clearInterval(countdownInterval);
      clearTimeout(timeoutId);
      moveToInputPhase();
      
    }

    /*function moveToInputPhase() {
      document.getElementById("memorizePhase").classList.add("hidden");
      document.getElementById("inputPhase").classList.remove("hidden");
      document.getElementById("userInput").focus();
      document.getElementById("timer").textContent = "";
      document.getElementById("timer").classList.remove("low-time");
    }*/

   /* function checkAnswers() {
      const userText = document.getElementById("userInput").value.trim().toUpperCase();
      const userPairs = userText.split(/\s+|\n/).filter(p => p.length === 2);
      let correct = 0;
      let i = 0;

      const seen = new Set();
      userPairs.forEach(pair => {
        if (!seen.has(pair) && generatedPairs[i] == pair) {
          correct++;
          seen.add(pair);
        }
        i++;
      });

document.getElementById("results").innerHTML = /*html`
        <h2>Resultados</h2>
        <p>Pares correctos: ${correct} de ${generatedPairs.length}</p>
        <p>Originales: ${generatedPairs.join(", ")}</p>
        <button onclick="resetApp()" class="button" >Volver al inicio</button>`;
      document.getElementById("results").classList.remove("hidden");
      document.getElementById("inputPhase").classList.add("hidden");
    }*/

function resetApp() {
    document.getElementById("pairCount").value = 5;
    document.getElementById("timeLimit").value = 10;
    document.getElementById("omitLetters").value = "";
    document.getElementById("userInput").value = "";
    document.getElementById("letterPairs").textContent = "";
    document.getElementById("timer").textContent = "";
    document.getElementById("timer").classList.remove("low-time");
    document.getElementById("results").classList.add("hidden");

    document.getElementById("setup").classList.remove("hidden");
}
