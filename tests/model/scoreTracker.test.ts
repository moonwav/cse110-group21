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

describe("ScoreTracker: hints and reveals", () => {
  it("takes 2 off the shown score as soon as a hint is used", () => {
    const model = makeModel();
    ScoreTracker.applyHint(model);
    expect(ScoreTracker.currentScore(model)).toBe(98);
    expect(ScoreTracker.finalScore(model)).toBe(0);
  });

  it("earns the question's points minus 2 after a hint", () => {
    const model = makeModel();
    ScoreTracker.applyHint(model);
    ScoreTracker.recordCorrect(model);
    expect(ScoreTracker.finalScore(model)).toBe(5);
    expect(ScoreTracker.currentScore(model)).toBe(98);
  });

  it("charges a hint only once per question", () => {
    const model = makeModel();
    ScoreTracker.applyHint(model);
    ScoreTracker.applyHint(model);
    expect(ScoreTracker.currentScore(model)).toBe(98);
  });

  it("ignores a hint after the question is answered", () => {
    const model = makeModel();
    ScoreTracker.recordCorrect(model);
    ScoreTracker.applyHint(model);
    expect(model.getCurrentRecord().hintUsed).toBe(false);
    expect(ScoreTracker.finalScore(model)).toBe(7);
  });

  it("ignores a reveal before a hint", () => {
    const model = makeModel();
    ScoreTracker.applyReveal(model);
    expect(model.getCurrentRecord().revealed).toBe(false);
    expect(ScoreTracker.currentScore(model)).toBe(100);
  });

  it("makes a revealed question earn 0 with no extra penalty", () => {
    const model = makeModel();
    ScoreTracker.applyHint(model);
    ScoreTracker.applyReveal(model);
    ScoreTracker.applyReveal(model);
    expect(ScoreTracker.currentScore(model)).toBe(93);
    expect(ScoreTracker.finalScore(model)).toBe(0);
  });

  it("ignores a correct answer after a reveal", () => {
    const model = makeModel();
    ScoreTracker.applyHint(model);
    ScoreTracker.applyReveal(model);
    ScoreTracker.recordCorrect(model);
    expect(ScoreTracker.finalScore(model)).toBe(0);
  });

  it("adds up the points lost across questions", () => {
    const model = makeModel();
    ScoreTracker.applyHint(model);
    ScoreTracker.recordCorrect(model);
    model.nextQuestion();
    ScoreTracker.recordCorrect(model);
    model.nextQuestion();
    ScoreTracker.applyHint(model);
    ScoreTracker.applyReveal(model);
    expect(ScoreTracker.currentScore(model)).toBe(100 - 2 - 14);
    expect(ScoreTracker.finalScore(model)).toBe(5 + 10 + 0);
  });

  it("ends a full trip with the shown score equal to the final score", () => {
    const model = new GameModel();
    model.setQuestions(generateTrip(() => 0));
    for (let i = 0; i < model.questions.length; i++) {
      if (i === 0) ScoreTracker.applyHint(model);
      if (i === model.questions.length - 1) {
        ScoreTracker.applyHint(model);
        ScoreTracker.applyReveal(model);
      }
      ScoreTracker.recordCorrect(model);
      model.nextQuestion();
    }
    // Hint on the first (easy) question, reveal on the last (hard) one.
    expect(ScoreTracker.finalScore(model)).toBe(100 - 2 - 14);
    expect(ScoreTracker.currentScore(model)).toBe(ScoreTracker.finalScore(model));
  });

  it("counts a hint followed by a reveal as one hint", () => {
    const model = makeModel();
    ScoreTracker.applyHint(model);
    ScoreTracker.applyReveal(model);
    model.nextQuestion();
    ScoreTracker.applyHint(model);
    expect(ScoreTracker.hintsUsed(model)).toBe(2);
  });
});


describe("ScoreTracker: results", () => {
  it("gives the results screen the final score, wrong tries, and hints", () => {
    const model = makeModel();
    ScoreTracker.recordWrongTry(model);
    ScoreTracker.recordCorrect(model);
    model.nextQuestion();
    ScoreTracker.applyHint(model);
    ScoreTracker.recordWrongTry(model);
    ScoreTracker.recordWrongTry(model);
    ScoreTracker.recordCorrect(model);
    expect(ScoreTracker.getResults(model)).toEqual({
      percent: 7 + 8,
      wrongAnswers: 3,
      hintsUsed: 1,
    });
  });

  it("starts a new trip with a clean slate", () => {
    const model = makeModel();
    ScoreTracker.applyHint(model);
    ScoreTracker.recordWrongTry(model);
    model.beginGame();
    expect(ScoreTracker.getResults(model)).toEqual({ percent: 0, wrongAnswers: 0, hintsUsed: 0 });
    expect(ScoreTracker.currentScore(model)).toBe(100);
  });
});