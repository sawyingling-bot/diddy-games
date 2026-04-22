let gamesData = [];

function safeText(str) {
  return String(str).replaceAll("]]>", "]]&gt;");
}

// Load games.json
fetch("games.json")
  .then(res => res.json())
  .then(data => {
    gamesData = data;
    renderGames(data);
  });

function renderGames(games) {
  const container = document.getElementById("games");
  container.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${safeText(game.name)}</h3>
      <p>${safeText(game.category || "game")}</p>
      <button>Play</button>
    `;

    card.onclick = () => openGame(game);

    container.appendChild(card);
  });
}

// Search
document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = gamesData.filter(g =>
    g.name.toLowerCase().includes(q)
  );
  renderGames(filtered);
});

function openGame(game) {
  const modal = document.getElementById("gameModal");
  const frame = document.getElementById("gameFrame");
  const title = document.getElementById("gameTitle");

  title.textContent = game.name;

  frame.src = game.url; // IMPORTANT: must be direct playable link

  modal.classList.remove("hidden");
}

function closeGame() {
  const modal = document.getElementById("gameModal");
  const frame = document.getElementById("gameFrame");

  frame.src = ""; // stop game
  modal.classList.add("hidden");
}
