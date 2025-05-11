let generatedPairs = [];
    let countdownInterval;
    let timeoutId;

    function generateLetterPairs(count, omitted) {
      const baseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const allowed = baseLetters.split("").filter(l => !omitted.includes(l));
      const pairs = new Set();

      while (pairs.size < count) {
        const a = allowed[Math.floor(Math.random() * allowed.length)];
        const b = allowed[Math.floor(Math.random() * allowed.length)];
        if (a !== b) {
          pairs.add(a + b);
        }
      }

      return Array.from(pairs);
    }

    function startTest() {
      const count = parseInt(document.getElementById("pairCount").value);
      const time = parseInt(document.getElementById("timeLimit").value);
      const omitted = document.getElementById("omitLetters").value.toUpperCase().replace(/[^A-Z]/g, "").split("");

      generatedPairs = generateLetterPairs(count, omitted);
      document.getElementById("letterPairs").textContent = generatedPairs.join(" ");
      document.getElementById("setup").classList.add("hidden");
      document.getElementById("memorizePhase").classList.remove("hidden");

      const timerDisplay = document.getElementById("timer");
      let remaining = time;

      const tickSound = document.getElementById("tickSound");
      const urgentSound = document.getElementById("urgentSound");

      timerDisplay.textContent = `Tiempo restante: ${remaining} segundos`;

      countdownInterval = setInterval(() => {
        remaining--;
        timerDisplay.textContent = `Tiempo restante: ${remaining} segundos`;

        if (remaining <= 5) {
          timerDisplay.classList.add("low-time");
          urgentSound.play();
        } else {
          tickSound.play();
        }

        if (remaining <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);

      timeoutId = setTimeout(() => {
        moveToInputPhase();
      }, time * 1000);
    }

    function endMemorizationEarly() {
      clearInterval(countdownInterval);
      clearTimeout(timeoutId);
      moveToInputPhase();
    }

    function moveToInputPhase() {
      document.getElementById("memorizePhase").classList.add("hidden");
      document.getElementById("inputPhase").classList.remove("hidden");
    }

    function checkAnswers() {
      const userText = document.getElementById("userInput").value.trim().toUpperCase();
      const userPairs = userText.split(/\s+|\n/).filter(p => p.length === 2);
      let correct = 0;

      const seen = new Set();
      userPairs.forEach(pair => {
        if (!seen.has(pair) && generatedPairs.includes(pair)) {
          correct++;
          seen.add(pair);
        }
      });

document.getElementById("results").innerHTML = /*html*/`
        <h2>Resultados</h2>
        <p>Pares correctos: ${correct} de ${generatedPairs.length}</p>
        <p>Originales: ${generatedPairs.join(", ")}</p>
        <button onclick="resetApp()">Volver al inicio</button>`;
      document.getElementById("results").classList.remove("hidden");
      document.getElementById("inputPhase").classList.add("hidden");
    }

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
