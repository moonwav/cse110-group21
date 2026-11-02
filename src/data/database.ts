import { DatabaseSync } from "node:sqlite";

export interface PlayerRow{ 
  id: number; 
  name: string 
};

const schema = `
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )
`;

export function openDatabase(path = 'game.db'): DatabaseSync {
  const db = new DatabaseSync(path);
  db.exec(schema);
  return db;
}

export  function isInDatabase(playerName: string, db: DatabaseSync) {
  const existsStmt = db.prepare('SELECT EXISTS( SELECT 1 FROM players WHERE name = ?) AS user_exists');
  const result = existsStmt.get(playerName);
  if (result === undefined) {
    return false;
  }
  return result.user_exists === 1;
  
}


export function findInDatabase(playerName: string, db: DatabaseSync) {
  const query = db.prepare('SELECT * FROM players WHERE name = ?');
  return query.get(playerName);
}

export function addToDatabase(playerName: string, db: DatabaseSync) {
  if (isInDatabase(playerName, db)) {
    return 0;
  }
  const insertStmt = db.prepare('INSERT INTO players (name) VALUES (?)');
  insertStmt.run(playerName);
  return 1;
}



