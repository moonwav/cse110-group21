import { describe, it, expect, vi } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { eq } from "drizzle-orm";
import { openDatabase, saveCompletedGame, saveScore, scoresForPlayer, topScoresForPlayer } from "../../src/backend/database";
import { players, scores } from "../../src/backend/schema";

describe("saveScore", () => {
  it("stores a finished game for a player", () => {
    const db = openDatabase(":memory:");
    const player = db.insert(players).values({ name: "Sam" }).returning({ id: players.id }).get();

    saveScore(db, player.id, {
      percent: 95,
      wrongAnswers: 1,
      hintsUsed: 2,
    });

    const row = db
      .select({
        playerId: scores.playerId,
        percent: scores.percent,
        wrongAnswers: scores.wrongAnswers,
        hintsUsed: scores.hintsUsed,
      })
      .from(scores)
      .where(eq(scores.playerId, player.id))
      .get();
    expect(row).toEqual({
      playerId: player.id,
      percent: 95,
      wrongAnswers: 1,
      hintsUsed: 2,
    });
    db.$client.close();
  });

  it("rejects a score for an unknown player", () => {
    const db = openDatabase(":memory:");
    expect(() =>
      saveScore(db, 999, { percent: 10, wrongAnswers: 0, hintsUsed: 0 }),
    ).toThrow();
    db.$client.close();
  });
});

describe("scoresForPlayer", () => {
  it("returns the saved games for a player and none for an unknown name", () => {
    const dir = mkdtempSync(join(tmpdir(), "scores-"));
    const path = join(dir, "game.sqlite");
    saveCompletedGame("Sam", { percent: 80, wrongAnswers: 2, hintsUsed: 1 }, path);
    saveCompletedGame("Sam", { percent: 70, wrongAnswers: 3, hintsUsed: 0 }, path);

    expect(scoresForPlayer("Sam", path)).toEqual([
      { percent: 80, wrongAnswers: 2, hintsUsed: 1 },
      { percent: 70, wrongAnswers: 3, hintsUsed: 0 },
    ]);
    expect(scoresForPlayer("Nobody", path)).toEqual([]);
    rmSync(dir, { recursive: true });
  });
});

describe("topScoresForPlayer", () => {
  it("returns the player's five highest scores with timestamps", () => {
    vi.useFakeTimers();
    const dir = mkdtempSync(join(tmpdir(), "scores-"));
    const path = join(dir, "game.sqlite");
    const saved = [
      { percent: 40, at: "2026-11-10T01:00:00.000Z" },
      { percent: 90, at: "2026-11-10T02:00:00.000Z" },
      { percent: 70, at: "2026-11-10T03:00:00.000Z" },
      { percent: 90, at: "2026-11-10T04:00:00.000Z" },
      { percent: 50, at: "2026-11-10T05:00:00.000Z" },
      { percent: 10, at: "2026-11-10T06:00:00.000Z" },
    ];
    for (const game of saved) {
      vi.setSystemTime(new Date(game.at));
      saveCompletedGame("Sam", { percent: game.percent, wrongAnswers: 0, hintsUsed: 0 }, path);
    }

    expect(topScoresForPlayer("Sam", path)).toEqual([
      { percent: 90, playedAt: "2026-11-10T04:00:00.000Z" },
      { percent: 90, playedAt: "2026-11-10T02:00:00.000Z" },
      { percent: 70, playedAt: "2026-11-10T03:00:00.000Z" },
      { percent: 50, playedAt: "2026-11-10T05:00:00.000Z" },
      { percent: 40, playedAt: "2026-11-10T01:00:00.000Z" },
    ]);
    expect(topScoresForPlayer("Nobody", path)).toEqual([]);
    vi.useRealTimers();
    rmSync(dir, { recursive: true });
  });
});
