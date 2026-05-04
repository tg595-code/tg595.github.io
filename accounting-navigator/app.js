let appData = null;

async function init() {
    const res = await fetch('./questions.json');
    appData = await res.json();
    renderResources();
}

function nextStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.add('hidden'));
    document.getElementById(`step${step}`).classList.remove('hidden');
}

function generateRoadmap() {
    const year = document.getElementById('user-year').value;
    const grad = document.getElementById('grad-date').value;
    
    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');
    document.getElementById('display-grad').innerText = `Target Graduation: ${grad}`;

    const container = document.getElementById('checklist-area');
    container.innerHTML = "";

    // LOGIC: Filter based on status
    if (year === 'freshman' || year === 'sophomore') {
        addCategory(container, "Foundational Core", appData.curriculum.foundationalCore);
        addCategory(container, "Business Core", appData.curriculum.businessCore);
        addCategory(container, "SAS Core Requirements", appData.curriculum.sasCore);
    } else {
        addCategory(container, "Business Core", appData.curriculum.businessCore);
        addCategory(container, "SAS Core Requirements", appData.curriculum.sasCore);
        addCategory(container, "Accounting Major Requirements", appData.curriculum.accountingMajor);
    }
}

function addCategory(parent, title, items) {
    const section = document.createElement('div');
    section.className = "result-box";
    section.innerHTML = `<h3>${title}</h3>`;
    items.forEach(item => {
        section.innerHTML += `
            <div class="check-item">
                <input type="checkbox"> <label>${item}</label>
            </div>`;
    });
    parent.appendChild(section);
}

function renderResources() {
    document.getElementById('branding-list').innerHTML = appData.branding.map(b => 
        `<div class="guide-block"><a href="${b.url}" target="_blank">${b.name} ↗</a></div>`).join('');
    
    document.getElementById('tools-list').innerHTML = appData.cpaTools.map(t => 
        `<div class="tool-card"><a href="${t.url}" target="_blank">${t.name} CPA Review ↗</a></div>`).join('');
    
    document.getElementById('clubs-list').innerHTML = appData.clubs.map(c => 
        `<div class="guide-block"><a href="${c.url}" target="_blank">${c.name} ↗</a></div>`).join('');
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

window.onload = init;
