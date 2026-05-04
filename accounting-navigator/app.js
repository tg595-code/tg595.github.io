let appData = null;

async function init() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) throw new Error("Could not load data");
        appData = await response.json();
        // Render Branding, Tools, and Clubs immediately on load
        renderResources();
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

// Navigates between survey steps
function nextStep(current) {
    document.getElementById(`step${current}`).classList.add('hidden');
    document.getElementById(`step${current + 1}`).classList.remove('hidden');
}

// Filters classes and builds the interactive checklist
function generateRoadmap() {
    const year = document.getElementById('user-year').value;
    const path = document.getElementById('cpa-path').value;
    const grad = document.getElementById('grad-date').value;

    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');
    
    document.getElementById('display-summary').innerHTML = 
        `<strong>Status:</strong> ${year.toUpperCase()} | <strong>Plan:</strong> ${path} | <strong>Graduation:</strong> ${grad}`;

    const checklistContainer = document.getElementById('checklist-area');
    checklistContainer.innerHTML = ""; // Clear old results

    // LOGIC: Filter based on student year
    if (year === "freshman" || year === "sophomore") {
        renderSection("Foundational Core", appData.curriculum.foundationalCore);
        renderSection("Business Core", appData.curriculum.businessCore);
        renderSection("SAS Core Requirements", appData.curriculum.sasCore);
    } else {
        renderSection("Business Core", appData.curriculum.businessCore);
        renderSection("SAS Core Requirements", appData.curriculum.sasCore);
        renderSection("Accounting Major Requirements", appData.curriculum.accountingMajor);
    }
}

function renderSection(title, items) {
    const container = document.getElementById('checklist-area');
    const box = document.createElement('div');
    box.className = "result-box";
    box.innerHTML = `<h3>${title}</h3>`;
    
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = "check-item";
        itemDiv.innerHTML = `<input type="checkbox"> <span>${item}</span>`;
        box.appendChild(itemDiv);
    });
    container.appendChild(box);
}

function renderResources() {
    // Fill Branding Tab
    document.getElementById('branding-list').innerHTML = appData.branding.map(b => 
        `<div class="resource-card"><a href="${b.url}" target="_blank">${b.name} ↗</a></div>`).join('');
    
    // Fill Study Tools Tab
    document.getElementById('tools-list').innerHTML = appData.cpaTools.map(t => 
        `<div class="resource-card"><a href="${t.url}" target="_blank">${t.name} ↗</a></div>`).join('');
    
    // Fill Clubs Tab
    document.getElementById('clubs-list').innerHTML = appData.clubs.map(c => 
        `<div class="resource-card"><a href="${c.url}" target="_blank">${c.name} ↗</a></div>`).join('');
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

window.onload = init;
