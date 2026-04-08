const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const db = require("./db");

const app = express();

const ALLOWED_ORIGINS = [
  "https://omnyx.site",
  "https://www.omnyx.site",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:5173",
];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());

const SESSION_SECRET = process.env.SESSION_SECRET || "sparkling-painel-secret";
const sessions = new Map();

function simpleHash(s) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "") || req.query.token;
  if (!token || !sessions.get(token)) {
    return res.status(401).json({ error: "Não autorizado" });
  }
  req.user = sessions.get(token);
  next();
}

// —— Login ——
app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  const hash = simpleHash(password || "");
  const user = db.prepare("SELECT id, username FROM users WHERE username = ? AND password_hash = ?").get(username, hash);
  if (!user) {
    return res.status(401).json({ error: "Usuário ou senha inválidos" });
  }
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, user);
  res.json({ token, user: { id: user.id, username: user.username } });
});

// —— Logout ——
app.post("/api/logout", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token) sessions.delete(token);
  res.json({ ok: true });
});

// —— Números (admin) ——
app.get("/api/numbers", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT id, number, label, is_active, click_count, created_at FROM numbers ORDER BY created_at DESC").all();
  res.json(rows);
});

app.post("/api/numbers", requireAuth, (req, res) => {
  const { number, label } = req.body || {};
  if (!number || !String(number).trim()) {
    return res.status(400).json({ error: "Número é obrigatório" });
  }
  const id = db.prepare("INSERT INTO numbers (number, label) VALUES (?, ?)").run(String(number).trim(), label || null).lastInsertRowid;
  const row = db.prepare("SELECT id, number, label, is_active, click_count, created_at FROM numbers WHERE id = ?").get(id);
  res.status(201).json(row);
});

app.patch("/api/numbers/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const { is_active } = req.body ?? {};
  const row = db.prepare("SELECT id, is_active FROM numbers WHERE id = ?").get(id);
  if (!row) return res.status(404).json({ error: "Número não encontrado" });

  const newActive = is_active === true || is_active === 1 ? 1 : 0;
  db.prepare("UPDATE numbers SET is_active = 0").run();
  db.prepare("UPDATE numbers SET is_active = ? WHERE id = ?").run(newActive, id);
  const updated = db.prepare("SELECT id, number, label, is_active, click_count, created_at FROM numbers WHERE id = ?").get(id);
  res.json(updated);
});

app.delete("/api/numbers/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const r = db.prepare("DELETE FROM numbers WHERE id = ?").run(id);
  if (r.changes === 0) return res.status(404).json({ error: "Número não encontrado" });
  res.json({ ok: true });
});

// —— Público: número ativo e link ——
app.get("/api/active-number", (req, res) => {
  const row = db.prepare("SELECT id, number, label FROM numbers WHERE is_active = 1 LIMIT 1").get();
  if (!row) {
    return res.json({ active: null, url: null });
  }
  const num = String(row.number).replace(/\D/g, "");
  const url = `https://wa.me/55${num}`;
  res.json({ active: { id: row.id, number: row.number, label: row.label }, url });
});

// —— Público: registrar clique e retornar link do ativo ——
app.post("/api/click", (req, res) => {
  const row = db.prepare("SELECT id, number FROM numbers WHERE is_active = 1 LIMIT 1").get();
  if (!row) {
    return res.status(404).json({ error: "Nenhum número ativo" });
  }
  db.prepare("UPDATE numbers SET click_count = click_count + 1 WHERE id = ?").run(row.id);
  const num = String(row.number).replace(/\D/g, "");
  const url = `https://wa.me/55${num}`;
  res.json({ url, number: row.number });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
