const table = document.getElementById("table");
const infoBox = document.getElementById("info");

// Create empty grid (7 periods x 18 groups)
for (let i = 0; i < 7 * 18; i++) {
    const slot = document.createElement("div");
    slot.className = "element-slot";
    table.appendChild(slot);
}

// Place elements in their grid positions
elements.forEach(el => {
    const idx = (el.period - 1) * 18 + (el.group - 1);
    const slot = table.children[idx];
    slot.className = "element";
    slot.innerHTML = `<strong>${el.symbol}</strong><br>${el.number}`;
    slot.onclick = () => showElementInfo(el);
});

function showElementInfo(el) {
    infoBox.style.display = "block";
    infoBox.innerHTML = `
        <h2>${el.name} (${el.symbol})</h2>
        <p><strong>Atomic Number:</strong> ${el.number}</p>
        <p><strong>Group:</strong> ${el.group} &nbsp; <strong>Period:</strong> ${el.period}</p>
        <p>${el.info}</p>
    `;
}
