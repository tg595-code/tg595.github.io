let appData = null;

async function init() {
    try {
        const response = await fetch('./questions.json');
        appData = await response.json();
        renderResources();
    } catch (e) { console.error("Load error", e); }
}

function nextStep(step) {
    document.getElementById(`step${step}`).classList.add('hidden');
    document.getElementById(`step${step+1}`).classList.remove('hidden');
}

function generateRoadmap() {
    const year = document.getElementById('user-year').value;
    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');
    
    const container = document.getElementById('checklist-area');
    container.innerHTML = "";

    if (year === "freshman" || year === "sophomore") {
        renderChecklist("Foundational Core", appData.curriculum.foundationalCore);
    }
    renderChecklist("Business Core", appData.curriculum.businessCore);
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

function downloadRemainingPDF() {
    const checks = document.querySelectorAll('.course-check');
    let remaining = "--- REMAINING CLASSES TO COMPLETE ---\n\n";
    let count = 0;

    checks.forEach(c => {
        if (!c.checked) {
            remaining += `- [ ] ${c.getAttribute('data-name')}\n`;
            count++;
        }
    });

    if (count === 0) remaining += "Congratulations! All classes are checked off.";

    const blob = new Blob([remaining], { type: "text/plain" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "My_Remaining_Accounting_Classes.txt";
    link.click();
}

function renderResources() {
    const mapLinks = (data, id) => {
        document.getElementById(id).innerHTML = data.map(item => 
            `<div class="resource-card"><a href="${item.url}" target="_blank">${item.name} ↗</a></div>`).join('');
    };
    mapLinks(appData.branding, 'branding-list');
    mapLinks(appData.cpaTools, 'tools-list');
    mapLinks(appData.clubs, 'clubs-list');
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

window.onload = init;
