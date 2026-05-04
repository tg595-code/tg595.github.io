let appData = null;

async function init() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) throw new Error("JSON Fetch Failed");
        appData = await response.json();
        renderResources();
    } catch (e) {
        console.error("Initialization error:", e);
    }
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

function printRemainingPDF() {
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
        <html><head><title>Remaining Requirements</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 50px; }
            h1 { color: #cc0033; border-bottom: 2px solid #cc0033; }
            li { margin: 12px 0; font-size: 1.1rem; }
            .date { color: #666; margin-bottom: 20px; }
        </style></head>
        <body>
            <h1>Remaining Accounting Requirements</h1>
            <p class="date">Target Graduation: ${document.getElementById('grad-date').value}</p>
            <ul>${count > 0 ? remainingHTML : "<li>All classes completed!</li>"}</ul>
        </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 500);
}

function renderResources() {
    const branding = document.getElementById('branding-list');
    const tools = document.getElementById('tools-list');
    const clubs = document.getElementById('clubs-list');

    if (branding) branding.innerHTML = appData.branding.map(i => `<div class="resource-card"><a href="${i.url}" target="_blank">${i.name} ↗</a></div>`).join('');
    if (tools) tools.innerHTML = appData.cpaTools.map(i => `<div class="resource-card"><a href="${i.url}" target="_blank">${i.name} ↗</a></div>`).join('');
    if (clubs) clubs.innerHTML = appData.clubs.map(i => `<div class="resource-card"><a href="${i.url}" target="_blank">${i.name} ↗</a></div>`).join('');
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

window.onload = init;
