let appData = null;

async function init() {
    try {
        const response = await fetch('./questions.json');
        appData = await response.json();
        renderResources();
    } catch (e) { console.error("Initialization Error:", e); }
}

function nextStep(step) {
    document.getElementById(`step${step}`).classList.add('hidden');
    document.getElementById(`step${step + 1}`).classList.remove('hidden');
}

function generateRoadmap() {
    const year = document.getElementById('user-year').value;
    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');
    
    const container = document.getElementById('checklist-area');
    container.innerHTML = "";

    if (year === "freshman" || year === "sophomore") {
        renderChecklist("Foundational Core Requirements", appData.curriculum.foundationalCore);
    }
    renderChecklist("Business Core Requirements", appData.curriculum.businessCore);
    renderChecklist("SAS Core Requirements", appData.curriculum.sasCore);
    if (year === "junior" || year === "senior") {
        renderChecklist("Accounting Major Requirements", appData.curriculum.accountingMajor);
    }
}

function renderChecklist(title, items) {
    const box = document.createElement('div');
    box.className = "result-box";
    box.innerHTML = `<h3>${title}</h3>`;
    items.forEach(item => {
        box.innerHTML += `<div class="check-item"><input type="checkbox" class="course-check" data-name="${item}"> <span>${item}</span></div>`;
    });
    document.getElementById('checklist-area').appendChild(box);
}

function printChecklist() {
    const checks = document.querySelectorAll('.course-check');
    let remaining = "";
    checks.forEach(c => {
        if (!c.checked) {
            remaining += `<li>${c.getAttribute('data-name')}</li>`;
        }
    });

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>My Remaining Requirements</title>
        <style>
            body { font-family: sans-serif; padding: 40px; }
            h1 { color: #cc0033; border-bottom: 2px solid #cc0033; }
            li { margin: 10px 0; font-size: 1.1rem; }
        </style></head>
        <body>
            <h1>Remaining Accounting Requirements</h1>
            <p>Target Graduation: ${document.getElementById('grad-date').value}</p>
            <ul>${remaining || "<li>All requirements completed!</li>"}</ul>
        </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function renderResources() {
    const fill = (data, id) => {
        document.getElementById(id).innerHTML = data.map(i => 
            `<div class="resource-card"><a href="${i.url}" target="_blank">${i.name} ↗</a></div>`).join('');
    };
    fill(appData.branding, 'branding-list');
    fill(appData.cpaTools, 'tools-list');
    fill(appData.clubs, 'clubs-list');
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

window.onload = init;
