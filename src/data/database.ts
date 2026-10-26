import { DatabaseSync } from "node:sqlite";

const schema = `
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );
`;

export function openDatabase(path = "game.sqlite") {
  const db = new DatabaseSync(path);
  db.exec(schema);
  return db;
}
