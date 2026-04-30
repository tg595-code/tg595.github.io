async function init() {
    try {
        const response = await fetch('./questions.json');
        
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();

        // 1. Render Academic Plan
        const planDiv = document.getElementById('plan-list');
        planDiv.innerHTML = ""; 
        data.academicPlan.forEach(p => {
            planDiv.innerHTML += `
                <div class="year-block">
                    <h3>${p.year}</h3>
                    <p><strong>Focus:</strong> ${p.focus}</p>
                </div>`;
        });

        // 2. Render CPA Tools
        const toolsDiv = document.getElementById('prep-tools-list');
        data.cpaTools.forEach(tool => {
            toolsDiv.innerHTML += `
                <div class="tool-card">
                    <h4>${tool.name}</h4>
                    <p>${tool.desc}</p>
                </div>`;
        });

        // 3. Render Branding
        const brandingDiv = document.getElementById('branding-guide');
        data.branding.forEach(item => {
            brandingDiv.innerHTML += `
                <div class="guide-block">
                    <strong>${item.platform}</strong>
                    <p>${item.advice}</p>
                </div>`;
        });

        // 4. Render Clubs
        const clubDiv = document.getElementById('clubs-list');
        data.clubs.forEach(c => {
            clubDiv.innerHTML += `<p><strong>${c.name}:</strong> ${c.desc}</p>`;
        });

    } catch (error) {
        console.error("App Error:", error);
        document.getElementById('plan-list').innerHTML = 
            `<p style="color:red">Error: Failed to fetch. This is normal on local files; upload to GitHub to fix!</p>`;
    }
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    const target = document.getElementById(id);
    if (target) target.classList.remove('hidden');
}

window.onload = init;