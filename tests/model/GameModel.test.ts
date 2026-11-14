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

describe("GameModel choosing the next stop", () => {
  it("offers four different questions that have not been played", () => {
    const model = new GameModel();
    model.questionIndex = 3;
    const options = model.getOptions();
    expect(options).toHaveLength(4);
    expect(new Set(options).size).toBe(4);
    for (const option of options) {
      expect(model.questions.indexOf(option)).toBeGreaterThanOrEqual(3);
    }
  });

  it("offers only the last question at the end", () => {
    const model = new GameModel();
    model.questionIndex = model.questions.length - 1;
    expect(model.getOptions()).toEqual([model.questions[model.questions.length - 1]]);
  });

  it("moves the chosen question into the current slot", () => {
    const model = new GameModel();
    model.questionIndex = 2;
    const chosen = model.questions[7];
    const replaced = model.questions[2];
    model.chooseQuestion(chosen);
    expect(model.getCurrentQuestion()).toBe(chosen);
    expect(model.questions[7]).toBe(replaced);
    expect(model.questions).toHaveLength(10);
    expect(chosen.getQuestionNumber()).toBe(3);
  });

  it("ignores a question that was already played", () => {
    const model = new GameModel();
    model.questionIndex = 5;
    const played = model.questions[1];
    model.chooseQuestion(played);
    expect(model.questions[1]).toBe(played);
  });
});