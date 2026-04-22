const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ficheiros "database"
const usersFile = "users.json";
const dataFile = "data.json";

// criar ficheiros se não existirem
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "[]");
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({ players: [], logs: [] }));

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.username === req.body.username && u.password === req.body.password);

  if (!user) return res.status(400).send("Erro login");

  res.json({ username: user.username });
});

// ===== REGISTER =====
app.post("/register", (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile));
  users.push(req.body);
  fs.writeFileSync(usersFile, JSON.stringify(users));
  res.send("ok");
});

// ===== GET DATA =====
app.get("/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile));
  res.json(data);
});

// ===== SAVE DATA =====
app.post("/data", (req, res) => {
  fs.writeFileSync(dataFile, JSON.stringify(req.body));
  res.send("saved");
});

// ===== MAPAS API =====
app.get("/maps", async (req, res) => {
  const r = await fetch("https://valorant-api.com/v1/maps");
  const data = await r.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server ON http://localhost:3000"));
