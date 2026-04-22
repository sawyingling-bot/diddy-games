let gamesData = [];

function safeText(str) {
  return String(str).replaceAll("]]>", "]]&gt;");
}

// wait for DOM so buttons exist
window.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("gameModal");
  const frame = document.getElementById("gameFrame");
  const title = document.getElementById("gameTitle");
  const closeBtn = document.getElementById("closeBtn");

  // ✅ CLOSE BUTTON FIX
  closeBtn.addEventListener("click", () => {
    frame.src = "";
    modal.classList.add("hidden");
  });

  // load games
  fetch("games.json")
    .then(res => res.json())
    .then(data => {
      gamesData = data;
      renderGames(data);
    });

  // search
  document.getElementById("search").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    renderGames(
      gamesData.filter(g => g.name.toLowerCase().includes(q))
    );
  });

  function renderGames(games) {
    const container = document.getElementById("games");
    container.innerHTML = "";

    games.forEach(game => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${safeText(game.name)}</h3>
        <p>${game.category || ""}</p>
        <button>Play</button>
      `;

      card.addEventListener("click", () => {
        title.textContent = game.name;
        frame.src = game.url;

        modal.classList.remove("hidden");
      });

      container.appendChild(card);
    });
  }

});
