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
        <div style="display: flex; gap: 32px; align-items: center;">
            <div>
                <h2>${el.name} (${el.symbol})</h2>
                <p><strong>Atomic Number:</strong> ${el.number}</p>
                <p><strong>Group:</strong> ${el.group} &nbsp; <strong>Period:</strong> ${el.period}</p>
                <p><strong>Category:</strong> ${el.category}</p>
                <p>${el.info}</p>
                <p><strong>Atomic Radius:</strong> ${el.atomicRadius ? el.atomicRadius + " pm" : "N/A"}</p>
                <p><strong>Electronegativity:</strong> ${el.electronegativity ?? "N/A"}</p>
            </div>
            <div>${bohrModelSVG(el.number)}</div>
        </div>
    `;
    animateBohrModel();
}

function bohrModelSVG(atomicNumber) {
    // Bohr shell configuration (maximum electrons per shell)
    const shells = [2, 8, 18, 32, 32, 18, 8];
    let electrons = atomicNumber;
    let shellCounts = [];
    for (let i = 0; i < shells.length && electrons > 0; i++) {
        let count = Math.min(shells[i], electrons);
        shellCounts.push(count);
        electrons -= count;
    }
    let svg = `<svg id="bohr-model" width="110" height="110" viewBox="0 0 110 110">`;
    svg += `<circle cx="55" cy="55" r="15" stroke="#fff" stroke-width="2" fill="#222"/>`; // Nucleus
    // Draw shells
    shellCounts.forEach((count, i) => {
        let r = 28 + i * 12;
        svg += `<circle cx="55" cy="55" r="${r}" stroke="#fff" stroke-width="1" fill="none"/>`;
        for (let j = 0; j < count; j++) {
            let angle = (j / count) * 2 * Math.PI;
            let x = 55 + r * Math.cos(angle);
            let y = 55 + r * Math.sin(angle);
            svg += `<g class="electron electron-shell${i}" style="transform-origin:55px 55px;"><circle cx="${x}" cy="${y}" r="6" fill="#111" stroke="#fff" stroke-width="1"/><text x="${x-4}" y="${y+4}" font-size="13" fill="#fff">−</text></g>`;
        }
    });
    svg += `</svg>`;
    return svg;
}

function animateBohrModel() {
    const electrons = document.querySelectorAll('.electron');
    let t = 0;
    function step() {
        t += 0.04;
        electrons.forEach((el, i) => {
            let shell = +el.classList[1].replace('electron-shell', '');
            let speed = 0.7 + shell * 0.3;
            el.style.transform = `rotate(${t * speed * 60}deg)`;
        });
        requestAnimationFrame(step);
    }
    step();
}

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
