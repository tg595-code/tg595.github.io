async function init() {
    const planDiv = document.getElementById('plan-list');
    const brandingDiv = document.getElementById('branding-guide');
    const toolsDiv = document.getElementById('prep-tools-list');
    const clubDiv = document.getElementById('clubs-list');

    try {
        // Use relative path for GitHub Subfolders
        const response = await fetch('./questions.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 1. Render Academic Plan
        planDiv.innerHTML = ""; 
        data.academicPlan.forEach(p => {
            planDiv.innerHTML += `
                <div class="year-block">
                    <h3>${p.year}</h3>
                    <p>${p.focus}</p>
                </div>`;
        });

        // 2. Render Branding (Handshake/LinkedIn)
        brandingDiv.innerHTML = "";
        data.branding.forEach(item => {
            brandingDiv.innerHTML += `
                <div class="guide-block">
                    <strong>${item.platform}</strong>
                    <p>${item.advice}</p>
                </div>`;
        });

        // 3. Render Study Tools (Becker/uWorld)
        toolsDiv.innerHTML = "";
        data.cpaTools.forEach(tool => {
            toolsDiv.innerHTML += `
                <div class="tool-card">
                    <h4>${tool.name}</h4>
                    <p>${tool.desc}</p>
                </div>`;
        });

        // 4. Render Clubs
        clubDiv.innerHTML = "";
        data.clubs.forEach(c => {
            clubDiv.innerHTML += `
                <div class="guide-block">
                    <strong>${c.name}</strong>
                    <p>${c.desc}</p>
                </div>`;
        });

    } catch (error) {
        console.error("App Error:", error);
        planDiv.innerHTML = `<p style="color:red">Error: Failed to fetch. Ensure questions.json is in the same folder on GitHub!</p>`;
    }
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    const target = document.getElementById(id);
    if (target) target.classList.remove('hidden');
}

// Start the app when the page loads
window.onload = init;
