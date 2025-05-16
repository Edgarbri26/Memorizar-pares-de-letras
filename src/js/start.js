let countdownInterval;


function startTest() {
    console.log("Test started");
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