document.getElementById("searchForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const team = document.getElementById("team").value;
  const role = document.getElementById("role").value;

  const params = new URLSearchParams();

  if (team) params.append("team", team);
  if (role) params.append("role", role);

  const url = `http://localhost:8000/api/players?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (data.length === 0) {
      resultsDiv.innerHTML = "<p class='text-red-500 text-center'>No players found matching your criteria.</p>";
      return;
    }

    data.forEach(player => {
      const card = document.createElement("div");
      card.className = "bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg border border-purple-200 shadow-md";

      card.innerHTML = `
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-purple-800 mb-2">${player.name}</h2>
            <p class="text-gray-600 mb-1"><strong>Real Name:</strong> ${player.realName}</p>
            <p class="text-gray-600 mb-1"><strong>Team:</strong> <span class="text-blue-600 font-semibold">${player.team}</span></p>
            <p class="text-gray-600 mb-1"><strong>Role:</strong> <span class="text-green-600 font-semibold">${player.role}</span></p>
            <p class="text-gray-600 mb-1"><strong>Country:</strong> ${player.country} (${player.region})</p>
            <p class="text-gray-600 mb-3"><strong>Age:</strong> ${player.age}</p>
            
            <div class="mb-3">
              <p class="text-gray-600 mb-1"><strong>Agents:</strong></p>
              <div class="flex flex-wrap gap-2">
                ${player.agents.map(agent => `<span class="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm">${agent}</span>`).join('')}
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-3">
              <div class="bg-white p-3 rounded border">
                <p class="text-sm text-gray-500">Average Combat Score</p>
                <p class="text-lg font-bold text-purple-600">${player.stats.averageCombatScore}</p>
              </div>
              <div class="bg-white p-3 rounded border">
                <p class="text-sm text-gray-500">K/D Ratio</p>
                <p class="text-lg font-bold text-green-600">${player.stats.killDeathRatio}</p>
              </div>
              <div class="bg-white p-3 rounded border">
                <p class="text-sm text-gray-500">Headshot %</p>
                <p class="text-lg font-bold text-blue-600">${player.stats.headshotPercentage}%</p>
              </div>
              <div class="bg-white p-3 rounded border">
                <p class="text-sm text-gray-500">Avg Damage/Round</p>
                <p class="text-lg font-bold text-red-600">${player.stats.averageDamagePerRound}</p>
              </div>
            </div>

            <div class="mb-3">
              <p class="text-gray-600 mb-1"><strong>Achievements:</strong></p>
              <div class="flex flex-wrap gap-2">
                ${player.achievements.map(achievement => `<span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">🏆 ${achievement}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      resultsDiv.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("results").innerHTML = "<p class='text-red-500 text-center'>Something went wrong! Please try again.</p>";
  }
});
