// Global variable to hold the data once loaded
let appData = null;

async function init() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) throw new Error("Could not load data file.");
        appData = await response.json();

        // Populate the static tabs (Branding, Tools, Clubs)
        renderStaticTabs();
    } catch (error) {
        console.error("Initialization Error:", error);
        document.getElementById('plan-list').innerHTML = `<p style="color:red">Error: Could not load data. Ensure questions.json is in the folder!</p>`;
    }
}

function renderStaticTabs() {
    // Branding
    const brandingDiv = document.getElementById('branding-guide');
    appData.branding.forEach(item => {
        brandingDiv.innerHTML += `<div class="guide-block"><strong>${item.platform}</strong><p>${item.advice}</p></div>`;
    });

    // Tools
    const toolsDiv = document.getElementById('prep-tools-list');
    appData.cpaTools.forEach(tool => {
        toolsDiv.innerHTML += `<div class="tool-card"><h4>${tool.name}</h4><p>${tool.desc}</p></div>`;
    });

    // Clubs
    const clubDiv = document.getElementById('clubs-list');
    appData.clubs.forEach(c => {
        clubDiv.innerHTML += `<div class="guide-block"><strong>${c.name}</strong><p>${c.desc}</p></div>`;
    });
}

function generateRoadmap() {
    if (!appData) return;

    // 1. Hide the survey form and show results
    document.getElementById('survey-container').style.display = 'none';
    document.getElementById('personalized-results').classList.remove('hidden');

    // 2. Clear old lists
    const sasList = document.getElementById('sas-list');
    const rbsList = document.getElementById('rbs-list');
    const accList = document.getElementById('acc-list');
    
    sasList.innerHTML = "";
    rbsList.innerHTML = "";
    accList.innerHTML = "";

    // 3. Populate lists from JSON
    appData.curriculum.sasCore.forEach(course => {
        sasList.innerHTML += `<li>${course}</li>`;
    });

    appData.curriculum.rbsCore.forEach(course => {
        rbsList.innerHTML += `<li>${course}</li>`;
    });

    appData.curriculum.accountingMajor.forEach(course => {
        accList.innerHTML += `<li>${course}</li>`;
    });
}

function resetSurvey() {
    document.getElementById('survey-container').style.display = 'block';
    document.getElementById('personalized-results').classList.add('hidden');
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

window.onload = init;
