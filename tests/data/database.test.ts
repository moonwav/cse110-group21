import { describe, it, expect } from "vitest";
import { eq } from "drizzle-orm";
import { openDatabase, saveScore } from "../../src/data/database";
import { players, scores } from "../../src/data/schema";

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
