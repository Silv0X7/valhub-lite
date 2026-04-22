const API = "http://localhost:3000";

let players = [];
let logs = [];

// ===== LOAD =====
async function loadData() {
  const res = await fetch(API + "/data");
  const data = await res.json();

  players = data.players;
  logs = data.logs;

  renderPlayers();
  renderLogs();
}

// ===== SAVE =====
async function saveData() {
  await fetch(API + "/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ players, logs })
  });
}

// ===== ADD PLAYER =====
function addPlayerSimple(player) {
  players.push(player);
  saveData();
  renderPlayers();
}

// ===== ADD LOG =====
function addLogSimple(log) {
  logs.unshift(log);
  saveData();
  renderLogs();
}

// ===== MAPAS =====
async function loadMaps() {
  const res = await fetch(API + "/maps");
  const data = await res.json();

  console.log(data.data); // aqui ligas ao teu renderMaps()
}

// iniciar
loadData();
loadMaps();
