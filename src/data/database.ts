import { drizzle } from "drizzle-orm/node-sqlite";
import { migrate } from "drizzle-orm/node-sqlite/migrator";
import { DatabaseSync } from "node:sqlite";
import type { ResultData } from "./resultModel";
import * as schema from "./schema";

export function openDatabase(path = "game.sqlite") {
  const sqlite = new DatabaseSync(path);
  sqlite.exec("PRAGMA foreign_keys = ON");
  const db = drizzle({ client: sqlite });
  migrate(db, { migrationsFolder: "drizzle" });
  return db;
}

export function saveScore(
  db: ReturnType<typeof openDatabase>,
  playerId: number,
  result: ResultData,
) {
  db.insert(schema.scores)
    .values({
      playerId,
      percent: result.percent,
      wrongAnswers: result.wrongAnswers,
      hintsUsed: result.hintsUsed,
    })
    .run();
}
