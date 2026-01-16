const products = [
    { name: "Landing Page", val: 2 }, { name: "Corporate Site", val: 3 },
    { name: "Creative Portfolio", val: 5 }, { name: "Hospitality Site", val: 8 },
    { name: "E-commerce (Basic)", val: 10 }, { name: "SaaS MVP", val: 15 },
    { name: "Booking Engine", val: 12 }, { name: "Real Estate Portal", val: 14 }
    // Add remaining from catalog...
];

const stacks = [
    { name: "WordPress", val: 2 }, { name: "Shopify", val: 4 },
    { name: "React + Vite", val: 10 }, { name: "Laravel", val: 12 },
    { name: "Headless CMS", val: 11 }, { name: "Next.js", val: 10 }
];

// Save form data to sessionStorage
function saveFormData() {
    const formData = {
        q1: document.getElementById('q1-input').value,
        q2: Array.from(document.querySelectorAll('#q2-grid .active')).map(btn => btn.innerText),
        q3: document.getElementById('q3-select').value,
        q4: document.getElementById('q4-select').value,
        q5: document.getElementById('q5-select').value
    };
    sessionStorage.setItem('gaiaFormData', JSON.stringify(formData));
}

// Restore form data from sessionStorage
function restoreFormData() {
    const saved = sessionStorage.getItem('gaiaFormData');
    if (!saved) return;

    const formData = JSON.parse(saved);

    // Restore textarea
    document.getElementById('q1-input').value = formData.q1 || '';

    // Restore selected buttons
    if (formData.q2 && formData.q2.length) {
        document.querySelectorAll('#q2-grid .selectable-btn').forEach(btn => {
            if (formData.q2.includes(btn.innerText)) {
                btn.classList.add('active');
            }
        });
    }

    // Restore dropdowns
    if (formData.q3) document.getElementById('q3-select').value = formData.q3;
    if (formData.q4) document.getElementById('q4-select').value = formData.q4;
    if (formData.q5) document.getElementById('q5-select').value = formData.q5;
}

// Initialize Buttons
function initGrid(gridId, data) {
    const grid = document.getElementById(gridId);
    data.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'selectable-btn';
        btn.innerText = item.name;
        btn.dataset.value = item.val;
        btn.onclick = () => {
            btn.classList.toggle('active');
            saveFormData();
        };
        grid.appendChild(btn);
    });
}

// Initialize Dropdown
function initDropdown(selectId, data) {
    const select = document.getElementById(selectId);
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.val;
        option.innerText = item.name;
        select.appendChild(option);
    });
}

function calculateResults() {
    const why = document.getElementById('q1-input').value;
    const q2Btns = document.querySelectorAll('#q2-grid .active');

    let score = 0;
    
    // Average complexity of selected products/stacks
    if(q2Btns.length) {
        let q2Total = 0;
        q2Btns.forEach(b => q2Total += parseInt(b.dataset.value));
        score += (q2Total / q2Btns.length);
    }

    score += parseInt(document.getElementById('q3-select').value);
    score += parseInt(document.getElementById('q4-select').value);
    score += parseInt(document.getElementById('q5-select').value);

    let level = "";
    let desc = "";

    if (score < 12) {
        level = "Standard (Out of the Box)";
        desc = "Fast deployment using premium Gaia templates and core optimized settings.";
    } else if (score < 22) {
        level = "Visual Customization";
        desc = "Tailored UI/UX design components layered onto high-performance frameworks.";
    } else if (score < 35) {
        level = "Functional Extension";
        desc = "Integration of complex 3rd party APIs and custom plugin development.";
    } else if (score < 48) {
        level = "Advanced Hybrid";
        desc = "Bespoke frontend components with a scalable CMS backend architecture.";
    } else {
        level = "Full Bespoke";
        desc = "Ground-up engineering. Zero templates. Pure technical innovation.";
    }

    // Keep form visible, just show results below
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    
    document.getElementById('result-content').innerHTML = `
        <p><strong>Client Need:</strong> ${why}</p>
        <hr>
        <h3>Recommended Level: <span style="color:var(--primary)">${level}</span></h3>
        <p>${desc}</p>
        <p><em>Complexity Score: ${Math.round(score)}</em></p>
    `;
}

// Time & Location
setInterval(() => {
    const now = new Date();
    document.getElementById('current-time').innerText = now.toLocaleTimeString();
}, 1000);

initGrid('q2-grid', products);
initDropdown('q3-select', stacks);

// Add event listeners for saving form data
document.getElementById('q1-input').addEventListener('input', saveFormData);
document.getElementById('q3-select').addEventListener('change', saveFormData);
document.getElementById('q4-select').addEventListener('change', saveFormData);
document.getElementById('q5-select').addEventListener('change', saveFormData);

// Restore saved data on page load
restoreFormData();