let countdownInterval;
let timeoutId;
let remaining; // Tiempo en segundos
let generatedPairs = [];
let time; // Tiempo en segundos
let ultimoPar = [];


function generateLetterPairs(count, omitted, omittedPair) {
    const baseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //omitimos las letras que el usuario no quiere
    const allowed = baseLetters.split("").filter(l => !omitted.includes(l));
    const pairs = new Set();
    //const omittedPairSet = new Set(omittedPair);
    let invertedPairs = omittedPair.map(omittedPair => omittedPair.split("").reverse().join(""));
    //console.log(omittedPair);
    //console.log(invertedPairs);

      //aqui generamos las combinaciones de letras
    while (pairs.size < count) {
        const a = allowed[Math.floor(Math.random() * allowed.length)];
        const b = allowed[Math.floor(Math.random() * allowed.length)];

        if (a !== b && !pairs.has(b + a) && !omittedPair.includes(a + b) && !omittedPair.includes(b + a) && !ultimoPar.includes(a) && !ultimoPar.includes(b) && !invertedPairs.includes(a + b) && !invertedPairs.includes(b + a)) {
            //penultimoPar = ultimoPar;
            ultimoPar = [a, b];
            pairs.add(a + b);  
        }
    }

    return Array.from(pairs);
}

document.addEventListener("DOMContentLoaded", () => {
    const omitted = localStorage.getItem("omitted");
    const omittedPair = JSON.parse(localStorage.getItem("omittedPairs"));
    time = localStorage.getItem("time");
    remaining = time;
    const count = localStorage.getItem("count");

    generatedPairs = generateLetterPairs(count, omitted, omittedPair);
    localStorage.setItem("pares", JSON.stringify(generatedPairs));
    //muestra los pares generados
    const letterPairsDisplay = document.getElementById("letterPairs");
    letterPairsDisplay.textContent = generatedPairs.join(" ");
    initMemo();
});


function initMemo() {
    const timerDisplay = document.getElementById("timer");
    const tickSound = document.getElementById("tickSound");

    let totalMilliseconds = time * 100;

    countdownInterval = setInterval(() => {
        totalMilliseconds -= 1; // Decremento de 10ms por ciclo (~100fps)

        // Calcular segundos y milisegundos restantes
        let segundos = Math.floor(totalMilliseconds / 100);
        let milisegundos = totalMilliseconds % 100;

        // Formato fijo de 3 dígitos para ms (ej. 090, 005)
        timerDisplay.textContent = `Tiempo restante: ${segundos}.${milisegundos.toString().padStart(2, '0')} segundos`;

        if (segundos === 5 && milisegundos >= 90 && milisegundos <= 99) {
            tickSound.play();
            timerDisplay.classList.add("low-time");
        }

  
        if (totalMilliseconds <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = `¡Tiempo terminado!`;
            moveToInputPhase();
        }
    }, 10); // Cada 10ms (centésima de segundo)
}


function finishMemorization() {
    clearInterval(countdownInterval);
    clearTimeout(timeoutId);
    moveToInputPhase();
    
}

function moveToInputPhase() {
    localStorage.setItem("memo-time", time - remaining);
    window.location.href = "../html/result.html";
}