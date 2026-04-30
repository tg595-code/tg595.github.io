let appData = null;

async function init() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) throw new Error("Data fetch failed");
        appData = await response.json();
        renderStaticTabs();
    } catch (error) {
        console.error(error);
    }
}

function renderStaticTabs() {
    document.getElementById('branding-guide').innerHTML = appData.branding.map(i => 
        `<div class="guide-block"><strong>${i.platform}</strong><p>${i.advice}</p></div>`).join('');
    
    document.getElementById('prep-tools-list').innerHTML = appData.cpaTools.map(t => 
        `<div class="tool-card"><h4>${t.name}</h4><p>${t.desc}</p></div>`).join('');
    
    document.getElementById('clubs-list').innerHTML = appData.clubs.map(c => 
        `<div class="guide-block"><strong>${c.name}</strong><p>${c.desc}</p></div>`).join('');
}

function generateRoadmap() {
    if (!appData) return;
    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');

    // Combine Foundational and Business cores for the RBS section
    const fullCore = [...appData.curriculum.foundationalCore, ...appData.curriculum.businessCore];

    document.getElementById('sas-list').innerHTML = appData.curriculum.sasCore.map(c => `<li>${c}</li>`).join('');
    document.getElementById('rbs-list').innerHTML = fullCore.map(c => `<li>${c}</li>`).join('');
    document.getElementById('acc-list').innerHTML = appData.curriculum.accountingMajor.map(c => `<li>${c}</li>`).join('');
}

function resetSurvey() {
    document.getElementById('survey-container').classList.remove('hidden');
    document.getElementById('personalized-results').classList.add('hidden');
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

window.onload = init;
