let countdownInterval;
let pairCount = document.getElementById("pairCount");
let time = document.getElementById("timeLimit");
let omitLetters = document.getElementById("omitLetters");
let omitPairs = document.getElementById("omitPairs");

document.addEventListener("DOMContentLoaded", () => {
    const omitted = localStorage.getItem("omitted");
    const omittedPair = JSON.parse(localStorage.getItem("omittedPairs"));
    const count = localStorage.getItem("count");
    const timeLimit = localStorage.getItem("time");

    if (omitted) {
        omitLetters.value = omitted;
    }
    if (omittedPair) {
        omitPairs.value = omittedPair.join(" ");
    }
    if (count) {
        pairCount.value = count;
    }
    if (timeLimit) {
        time.value = timeLimit;
    }
});


function startTest() {
    const count = parseInt(document.getElementById("pairCount").value);
    const time = parseInt(document.getElementById("timeLimit").value);
    const omitted = document.getElementById("omitLetters").value.toUpperCase().replace(/[^A-Z]/g, "").split("");
    const omittedPair = document.getElementById("omitPairs").value.toUpperCase().replace(/[^A-Z\s]/g, "").split(" ").filter(pair => pair.length === 2);
    
    localStorage.setItem("omittedPairs", JSON.stringify(omittedPair));
    localStorage.setItem("omitted", omitted.join(""));
    localStorage.setItem("count", count);
    localStorage.setItem("time", time);

    window.location.href = "./src/html/memo.html";
}