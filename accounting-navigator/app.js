let appData = null;

async function init() {
    try {
        // Adding a timestamp to the URL forces the browser to fetch the freshest JSON
        const response = await fetch('./questions.json?v=' + Date.now());
        if (!response.ok) throw new Error("JSON fail");
        appData = await response.json();
        renderResources();
    } catch (e) {
        console.error("Initialization Error:", e);
    }
}

function nextStep(step) {
    document.getElementById(`step${step}`).classList.add('hidden');
    document.getElementById(`step${step + 1}`).classList.remove('hidden');
}

// Renamed and updated logic to ensure strict ordering
function runNavigatorV2() {
    const year = document.getElementById('user-year').value;
    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');
    
    const container = document.getElementById('checklist-area');
    container.innerHTML = "";

    console.log("Generating roadmap for:", year); // For debugging

    if (year === "freshman" || year === "sophomore") {
        // ORDER: SAS -> Foundational -> Business Core
        renderChecklist("SAS Core Requirements", appData.curriculum.sasCore);
        renderChecklist("RBS Foundational Core", appData.curriculum.foundationalCore);
        renderChecklist("RBS Business Core Requirements", appData.curriculum.businessCore);
    } else {
        // JUNIOR OR SENIOR ORDER: SAS -> Business Core -> Accounting Major
        renderChecklist("SAS Core Requirements", appData.curriculum.sasCore);
        renderChecklist("RBS Business Core Requirements", appData.curriculum.businessCore);
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

function generatePDF() {
    const checks = document.querySelectorAll('.course-check');
    let remainingHTML = "";
    let count = 0;

    checks.forEach(c => {
        if (!c.checked) {
            remainingHTML += `<li>${c.getAttribute('data-name')}</li>`;
            count++;
        }
    });

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>Remaining Classes</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 40px; }
            h1 { color: #cc0033; border-bottom: 2px solid #cc0033; }
            li { margin: 10px 0; font-size: 1.1rem; }
        </style></head>
        <body>
            <h1>Classes Needed for Completion</h1>
            <p>Target Graduation: ${document.getElementById('grad-date').value}</p>
            <ul>${count > 0 ? remainingHTML : "<li>All classes marked as complete!</li>"}</ul>
        </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
}

function renderResources() {
    const fill = (data, id) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = data.map(i => `<div class="resource-card"><a href="${i.url}" target="_blank">${i.name} ↗</a></div>`).join('');
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
