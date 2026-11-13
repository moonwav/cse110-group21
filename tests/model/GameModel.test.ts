import { describe, it, expect } from "vitest";
import GameModel from "../../src/model/GameModel";
import * as ScoreTracker from "../../src/model/scoreTracker";

const finished = (model: GameModel) => ScoreTracker.isFinished(model.getCurrentRecord());

describe("GameModel question completion", () => {
  it("starts with the question not finished", () => {
    expect(finished(new GameModel())).toBe(false);
  });

  it("is not finished on the next question", () => {
    const model = new GameModel();
    ScoreTracker.recordCorrect(model);
    model.nextQuestion();
    expect(finished(model)).toBe(false);
  });

  it("is not finished after beginGame", () => {
    const model = new GameModel();
    ScoreTracker.recordCorrect(model);
    model.beginGame();
    expect(finished(model)).toBe(false);
  });
});