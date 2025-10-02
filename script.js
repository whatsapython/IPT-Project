function categoryToClass(category) {
    switch (category) {
        case "Alkali metals": return "alkali-metal";
        case "Alkaline earth metals": return "alkaline-earth-metal";
        case "Transition metals": return "transition-metal";
        case "Post-transition metals": return "post-transition-metal";
        case "Metalloids": return "metalloid";
        case "Reactive nonmetals": return "reactive-nonmetal";
        case "Noble gases": return "noble-gas";
        case "Lanthanides": return "lanthanide";
        case "Actinides": return "actinide";
        default: return "unknown";
    }
}

const table = document.getElementById("table");
const infoBox = document.getElementById("info");
const legendBox = document.getElementById("legend");

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
    slot.className = `element ${categoryToClass(el.category)}`;
    slot.innerHTML = `<strong>${el.symbol}</strong><br>${el.number}`;
    slot.onclick = () => showElementInfo(el);
});

function showElementInfo(el) {
    infoBox.style.display = "block";
    infoBox.innerHTML = `
        <h2>${el.name} (${el.symbol})</h2>
        <p><strong>Atomic Number:</strong> ${el.number}</p>
        <p><strong>Group:</strong> ${el.group} &nbsp; <strong>Period:</strong> ${el.period}</p>
        <p><strong>Category:</strong> ${el.category}</p>
        <p>${el.info}</p>
    `;
}

// Add legend
const legend = [
    {name: "Alkali metals", class: "alkali-metal"},
    {name: "Alkaline earth metals", class: "alkaline-earth-metal"},
    {name: "Transition metals", class: "transition-metal"},
    {name: "Post-transition metals", class: "post-transition-metal"},
    {name: "Metalloids", class: "metalloid"},
    {name: "Reactive nonmetals", class: "reactive-nonmetal"},
    {name: "Noble gases", class: "noble-gas"},
    {name: "Lanthanides", class: "lanthanide"},
    {name: "Actinides", class: "actinide"},
    {name: "Unknown properties", class: "unknown"},
];

legendBox.innerHTML = `
    <div><strong>Legend:</strong></div>
    <div class="legend-list">
        ${legend.map(l =>
            `<span class="legend-item"><span class="legend-color ${l.class}"></span>${l.name}</span>`
        ).join("")}
    </div>
`;
