import { describe, it, expect } from "vitest";
import GameModel from "../../src/logic/model";
import Question from "../../src/logic/question";
import { generateTrip } from "../../src/logic/QuestionGenerator";
import * as ScoreTracker from "../../src/logic/scoreTracker";

// A trip with fixed questions: easy (7), medium (10), hard (14).
function makeModel(): GameModel {
  const model = new GameModel();
  model.setQuestions([
    new Question(1, "Shop", "Easy question", 10, 7),
    new Question(2, "Shop", "Medium question", 10, 10),
    new Question(3, "Shop", "Hard question", 10, 14),
  ]);
  return model;
}

describe("ScoreTracker: answers", () => {
  it("starts a trip at 100 shown and 0 earned", () => {
    const model = makeModel();
    expect(ScoreTracker.currentScore(model)).toBe(100);
    expect(ScoreTracker.finalScore(model)).toBe(0);
  });

  it("gives a correct answer the question's full points", () => {
    const model = makeModel();
    ScoreTracker.recordCorrect(model);
    expect(ScoreTracker.finalScore(model)).toBe(7);
    expect(ScoreTracker.currentScore(model)).toBe(100);
  });

  it("counts wrong tries without losing points", () => {
    const model = makeModel();
    ScoreTracker.recordWrongTry(model);
    ScoreTracker.recordWrongTry(model);
    ScoreTracker.recordCorrect(model);
    expect(model.getCurrentRecord().wrongTries).toBe(2);
    expect(ScoreTracker.finalScore(model)).toBe(7);
    expect(ScoreTracker.currentScore(model)).toBe(100);
  });

  it("ignores answers after the question is finished", () => {
    const model = makeModel();
    ScoreTracker.recordCorrect(model);
    ScoreTracker.recordCorrect(model);
    ScoreTracker.recordWrongTry(model);
    expect(model.getCurrentRecord().wrongTries).toBe(0);
    expect(ScoreTracker.finalScore(model)).toBe(7);
  });

  it("scores each question separately", () => {
    const model = makeModel();
    ScoreTracker.recordCorrect(model);
    model.nextQuestion();
    model.nextQuestion();
    ScoreTracker.recordCorrect(model);
    expect(ScoreTracker.finalScore(model)).toBe(7 + 14);
  });

  it("gives a perfect trip exactly 100", () => {
    const model = new GameModel();
    model.setQuestions(generateTrip(() => 0));
    for (let i = 0; i < model.questions.length; i++) {
      ScoreTracker.recordCorrect(model);
      model.nextQuestion();
    }
    expect(ScoreTracker.finalScore(model)).toBe(100);
    expect(ScoreTracker.currentScore(model)).toBe(100);
  });
});