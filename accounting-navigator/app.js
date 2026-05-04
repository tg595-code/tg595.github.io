let appData = null;

async function init() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) throw new Error("Data fetch failed");
        appData = await response.json();
        renderStaticTabs();
    } catch (error) {
        console.error("Initialization error:", error);
    }
}

function nextStep(currentStep) {
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    document.getElementById(`step${currentStep + 1}`).classList.remove('hidden');
}

function generateRoadmap() {
    const year = document.getElementById('user-year').value;
    const grad = document.getElementById('grad-date').value;
    const path = document.getElementById('cpa-path').value;

    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');
    
    document.getElementById('display-summary').innerHTML = 
        `<strong>Plan:</strong> ${path} | <strong>Target Grad:</strong> ${grad}`;

    const checklistContainer = document.getElementById('checklist-area');
    checklistContainer.innerHTML = "";

    // Logic: Freshmen/Sophomores get Foundational + Business + SAS
    // Juniors/Seniors get Business + SAS + Major
    if (year === "freshman" || year === "sophomore") {
        renderChecklistSection("Foundational Core Requirements", appData.curriculum.foundationalCore);
    }
    
    renderChecklistSection("Business Core Requirements", appData.curriculum.businessCore);
    renderChecklistSection("SAS Core Requirements", appData.curriculum.sasCore);

    if (year === "junior" || year === "senior") {
        renderChecklistSection("Accounting Major Requirements", appData.curriculum.accountingMajor);
    }
}

function renderChecklistSection(title, items) {
    const container = document.getElementById('checklist-area');
    const box = document.createElement('div');
    box.className = "result-box";
    box.innerHTML = `<h3>${title}</h3>`;
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = "check-item";
        div.innerHTML = `<input type="checkbox"> <span>${item}</span>`;
        box.appendChild(div);
    });
    container.appendChild(box);
}

function renderStaticTabs() {
    document.getElementById('branding-list').innerHTML = appData.branding.map(b => 
        `<div class="guide-block"><a href="${b.url}" target="_blank">${b.name} ↗</a></div>`).join('');
    
    document.getElementById('tools-list').innerHTML = appData.cpaTools.map(t => 
        `<div class="tool-card"><a href="${t.url}" target="_blank">${t.name} ↗</a></div>`).join('');
    
    document.getElementById('clubs-list').innerHTML = appData.clubs.map(c => 
        `<div class="guide-block"><a href="${c.url}" target="_blank">${c.name} ↗</a></div>`).join('');
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

window.onload = init;
