const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "data", "painel.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS numbers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT NOT NULL,
    label TEXT,
    is_active INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE UNIQUE INDEX IF NOT EXISTS idx_one_active ON numbers(is_active) WHERE is_active = 1;
`);

// Usuário padrão: admin / admin123 (hash bcrypt-like simples para demo; em produção use bcrypt)
const defaultPassword = "admin123";
const simpleHash = (s) => require("crypto").createHash("sha256").update(s).digest("hex");
const adminHash = simpleHash(defaultPassword);

const stmt = db.prepare("SELECT id FROM users WHERE username = ?");
if (!stmt.get("admin")) {
  db.prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)").run("admin", adminHash);
}

module.exports = db;
