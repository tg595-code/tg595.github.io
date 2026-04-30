function generateRoadmap() {
    if (!appData) return;

    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('personalized-results').classList.remove('hidden');

    const sasList = document.getElementById('sas-list');
    const rbsList = document.getElementById('rbs-list');
    const accList = document.getElementById('acc-list');

    // 1. Render SAS Core
    sasList.innerHTML = appData.curriculum.sasCore.map(c => `<li>${c}</li>`).join('');

    // 2. Render RBS Requirements (Foundational + Business Core)
    const foundationalHTML = appData.curriculum.foundationalCore.map(c => `<li><strong>[Foundational]</strong> ${c}</li>`).join('');
    const coreHTML = appData.curriculum.businessCore.map(c => `<li><strong>[Core]</strong> ${c}</li>`).join('');
    
    rbsList.innerHTML = foundationalHTML + coreHTML;

    // 3. Render Accounting Major
    accList.innerHTML = appData.curriculum.accountingMajor.map(c => `<li>${c}</li>`).join('');
}
