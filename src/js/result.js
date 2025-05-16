let generatedPairs = [];
let memoTime;

document.addEventListener("DOMContentLoaded", () => {
    generatedPairs = JSON.parse(localStorage.getItem("pares"));
    memoTime = localStorage.getItem("memo-time");
    
    const letterPairsDisplay = document.getElementById("letterPairs");
    letterPairsDisplay.textContent = pares.join(" ");

});

function checkAnswers() {
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

    document.getElementById("results").innerHTML = /*html*/`
        <h2>Resultados</h2>
        <p>Tiempo de memorización: ${memoTime} segundos</p>
        <p>Pares correctos: ${correct} de ${generatedPairs.length}</p>
        <p>Has escrito: ${userPairs.join(", ")}</p>
        <p>Originales: ${generatedPairs.join(", ")}</p>
        <button onclick="resetApp()" class="button" >Inicio</button>
        <button onclick="again()" class="button" >Otra vez</button>`;

    document.getElementById("results").classList.remove("hidden");
    document.getElementById("inputPhase").classList.add("hidden");
}

function again() {
    window.location.href = "../html/memo.html";
}

function resetApp() {
    window.location.href = "./index.html";
}
