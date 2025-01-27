import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the database
// Store the database file in a permanent location
const dbPath = join(__dirname, '..', '..', 'data', 'messages.sqlite');

// Ensure the data directory exists
if (!existsSync(dirname(dbPath))) {
  mkdirSync(dirname(dbPath), { recursive: true });
}

const db = new Database(dbPath);

// Create messages table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL
  )
`);

// Database operations
export const getMessages = () => {
  const stmt = db.prepare('SELECT * FROM messages ORDER BY date DESC');
  return stmt.all();
};

export const addMessage = (message: { name: string; email: string; message: string }) => {
  const stmt = db.prepare('INSERT INTO messages (name, email, message, date) VALUES (?, ?, ?, ?)');
  const date = new Date().toISOString();
  const result = stmt.run(message.name, message.email, message.message, date);
  return {
    id: result.lastInsertRowid,
    ...message,
    date,
  };
};
