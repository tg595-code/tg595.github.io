let appData = null;

async function init() {
    try {
        const response = await fetch('./questions.json');
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

function generateRoadmap() {
    const year = document.getElementById('user-year').value;
    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');
    
    const container = document.getElementById('checklist-area');
    container.innerHTML = "";

    // Conditional Ordering Logic
    if (year === "freshman" || year === "sophomore") {
        renderChecklist("SAS Core Requirements", appData.curriculum.sasCore);
        renderChecklist("RBS Foundational Core", appData.curriculum.foundationalCore);
        renderChecklist("RBS Core Requirements", appData.curriculum.businessCore);
    } else {
        // Junior or Senior
        renderChecklist("SAS Core Requirements", appData.curriculum.sasCore);
        renderChecklist("RBS Core Requirements", appData.curriculum.businessCore);
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
            <h1>My Remaining Accounting Coursework</h1>
            <p>Target Graduation: ${document.getElementById('grad-date').value}</p>
            <ul>${count > 0 ? remainingHTML : "<li>All courses completed! Great job.</li>"}</ul>
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
