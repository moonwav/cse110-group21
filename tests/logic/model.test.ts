import { describe, it, expect } from "vitest";
import GameModel from "../../src/logic/model";

describe("GameModel.questionCompleted", () => {
  it("starts false", () => {
    expect(new GameModel().questionCompleted).toBe(false);
  });

  it("resets on nextQuestion", () => {
    const model = new GameModel();
    model.questionCompleted = true;
    model.nextQuestion();
    expect(model.questionCompleted).toBe(false);
  });

  it("resets on beginGame", () => {
    const model = new GameModel();
    model.questionCompleted = true;
    model.beginGame();
    expect(model.questionCompleted).toBe(false);
  });
});
