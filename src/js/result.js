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
        <p><strong>Tiempo de memorización:</strong> ${memoTime}s</p>
        <p><strong>Pares correctos:</strong> ${correct} de ${generatedPairs.length}</p>
        <p><strong>Has escrito:</strong>${userPairs.join(", ")}</p>
        <p><strong>Originales:</strong> ${generatedPairs.join(", ")}</p>
        `
        ;

    document.getElementById("section-results").classList.remove("hidden");
    document.getElementById("inputPhase").classList.add("hidden");
}

function again() {
    window.location.href = "../html/memo.html";
}

function resetApp() {
    window.location.href = "../../index.html";
}


async function compartirEnWhatsapp() {
    const button = document.getElementById('capture-btn');
    // Cambia 'section-results' al id correcto de la sección que quieres capturar
    const nodo = document.getElementById("capture"); 
    if (!nodo) {
        alert("No se encontró el elemento para capturar. Revisa el id.");
        return;
    }
    try {
        // Capturar el nodo con html2canvas
        const canvas = await html2canvas(nodo, { scrollY: -window.scrollY });
        // Convertir canvas a blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        if (!blob) {
            throw new Error("No se pudo convertir el canvas a imagen blob.");
        }
        const file = new File([blob], 'captura.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'Resultados del juego',
                text: '¡Mira cómo me fue!',
            });
        } else {
            alert('Tu navegador no permite compartir imágenes directamente. Usa un dispositivo móvil.');
        }
    } catch (error) {
        console.error('Error al capturar o compartir', error);
        alert('Ocurrió un error al capturar la imagen: ' + error.message);
    }
}

