async function init() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) throw new Error("Could not load data");
        window.appData = await response.json(); // Store data globally for the survey

        // Load content for static tabs immediately
        renderStaticTabs();
    } catch (error) {
        console.error(error);
    }
}

function renderStaticTabs() {
    const data = window.appData;
    
    // Branding
    const brandingDiv = document.getElementById('branding-guide');
    data.branding.forEach(item => {
        brandingDiv.innerHTML += `<div class="guide-block"><strong>${item.platform}</strong><p>${item.advice}</p></div>`;
    });

    // Tools
    const toolsDiv = document.getElementById('prep-tools-list');
    data.cpaTools.forEach(tool => {
        toolsDiv.innerHTML += `<div class="tool-card"><h4>${tool.name}</h4><p>${tool.desc}</p></div>`;
    });

    // Clubs
    const clubDiv = document.getElementById('clubs-list');
    data.clubs.forEach(c => {
        clubDiv.innerHTML += `<p><strong>${c.name}:</strong> ${c.desc}</p>`;
    });
}

function generateRoadmap() {
    const year = document.getElementById('user-year').value;
    const data = window.appData.curriculum;

    // Show results, hide survey
    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');

    // Fill SAS Core
    const sasList = document.getElementById('sas-list');
    sasList.innerHTML = data.sasCore.map(item => `<li>${item}</li>`).join('');

    // Fill RBS Core
    const rbsList = document.getElementById('rbs-list');
    rbsList.innerHTML = data.rbsCore.map(item => `<li>${item}</li>`).join('');

    // Fill Accounting Core
    const accList = document.getElementById('acc-list');
    accList.innerHTML = data.accountingMajor.map(item => `<li>${item}</li>`).join('');
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
