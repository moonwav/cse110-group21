import { desc, eq } from "drizzle-orm";
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
      playedAt: new Date().toISOString(),
    })
    .run();
}

export function saveCompletedGame(
  playerName: string,
  result: ResultData,
  path = "game.sqlite",
) {
  const db = openDatabase(path);
  const existing = db
    .select({ id: schema.players.id })
    .from(schema.players)
    .where(eq(schema.players.name, playerName))
    .get();
  const playerId = existing
    ? existing.id
    : db.insert(schema.players).values({ name: playerName }).returning({ id: schema.players.id }).get().id;
  saveScore(db, playerId, result);
  db.$client.close();
}

export function scoresForPlayer(playerName: string, path = "game.sqlite"): ResultData[] {
  const db = openDatabase(path);
  const player = db
    .select({ id: schema.players.id })
    .from(schema.players)
    .where(eq(schema.players.name, playerName))
    .get();
  if (!player) {
    db.$client.close();
    return [];
  }
  const rows = db
    .select({
      percent: schema.scores.percent,
      wrongAnswers: schema.scores.wrongAnswers,
      hintsUsed: schema.scores.hintsUsed,
    })
    .from(schema.scores)
    .where(eq(schema.scores.playerId, player.id))
    .all();
  db.$client.close();
  return rows;
}

export type SavedScore = { percent: number; playedAt: string };

export function topScoresForPlayer(playerName: string, path = "game.sqlite"): SavedScore[] {
  const db = openDatabase(path);
  const player = db
    .select({ id: schema.players.id })
    .from(schema.players)
    .where(eq(schema.players.name, playerName))
    .get();
  if (!player) {
    db.$client.close();
    return [];
  }
  const rows = db
    .select({
      percent: schema.scores.percent,
      playedAt: schema.scores.playedAt,
    })
    .from(schema.scores)
    .where(eq(schema.scores.playerId, player.id))
    .orderBy(desc(schema.scores.percent), desc(schema.scores.playedAt))
    .limit(5)
    .all();
  db.$client.close();
  return rows;
}
