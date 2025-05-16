let countdownInterval;
let timeoutId;
let remaining; // Tiempo en segundos
let generatedPairs = [];
let time; // Tiempo en segundos


function generateLetterPairs(count, omitted, omittedPair) {
    const baseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //omitimos las letras que el usuario no quiere
    const allowed = baseLetters.split("").filter(l => !omitted.includes(l));
    const pairs = new Set();
    //const omittedPairSet = new Set(omittedPair);
    let invertedPairs = omittedPair.map(omittedPair => omittedPair.split("").reverse().join(""));
    console.log(omittedPair);
    console.log(invertedPairs);

      //aqui generamos las combinaciones de letras
    while (pairs.size < count) {
        const a = allowed[Math.floor(Math.random() * allowed.length)];
        const b = allowed[Math.floor(Math.random() * allowed.length)];

        if (a !== b && !pairs.has(b + a) && !omittedPair.includes(a + b) && !omittedPair.includes(b + a) ) {
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


function initMemo(){
    const timerDisplay = document.getElementById("timer");
    const tickSound = document.getElementById("tickSound");


    timerDisplay.textContent = `Tiempo restante: ${remaining} segundos`;

    countdownInterval = setInterval(() => {
        remaining --;
        console.log(remaining);
        timerDisplay.textContent = `Tiempo restante: ${remaining} segundos`;

        if (remaining <= 5) {
            timerDisplay.classList.add("low-time");
        }if (remaining == 5) {
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

function finishMemorization() {
    clearInterval(countdownInterval);
    clearTimeout(timeoutId);
    moveToInputPhase();
    
}

function moveToInputPhase() {
    localStorage.setItem("memo-time", time - remaining);
    window.location.href = "../html/result.html";
}