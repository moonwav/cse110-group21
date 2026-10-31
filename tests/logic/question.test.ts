import { describe, it, expect } from "vitest";
import { questionTemplates } from "../../src/data/questionTemplates";
import { generateQuestion, generateTrip } from "../../src/logic/QuestionGenerator";
import GameModel from "../../src/logic/model";
import Question, { parsePlayerAnswer } from "../../src/logic/question";

describe("question generation", () => {
  it("builds a 10-question trip from the first value of each template", () => {
    const trip = generateTrip(() => 0);

    expect(trip.map((question) => question.getQuestionNumber())).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(trip.map((question) => question.getAnswer())).toEqual([
      1, 1, 1, 1, 19, 21, 21, 10, 11.5, 12.42,
    ]);
  });

  it("fills the spending scenario and the prompt", () => {
    const question = generateQuestion(questionTemplates[0], 1, () => 0);

    expect(question.getLocation()).toBe("Souvenir shop");
    expect(question.getQuestion()).toBe(
      "You set aside $10 for souvenirs. You want to spend 10% of that on a gift. What is the most you can spend?",
    );
  });

  it("leaves no placeholders and keeps every answer to cents", () => {
    for (const question of generateTrip(() => 0)) {
      expect(question.getQuestion()).not.toMatch(/\{[a-zA-Z]+\}/);
      expect(question.getAnswer()).toBeGreaterThanOrEqual(0);
      expect(question.getAnswer()).toBe(Math.round(question.getAnswer() * 100) / 100);
    }
  });

  it("picks a later number when the random value changes", () => {
    const question = generateQuestion(questionTemplates[0], 1, () => 0.999);

    expect(question.getAnswer()).toBe(50);
    expect(question.getQuestion()).toContain("$100");
    expect(question.getQuestion()).toContain("50%");
  });
});

describe("input validation", () => {
  it.each([
    ["", null],
    ["   ", null],
    ["abc", null],
    ["12abc", null],
    ["1.2.3", null],
    ["-5", null],
    ["1.234", null],
    ["8", 8],
    ["8.5", 8.5],
    ["8.50", 8.5],
    [".50", 0.5],
    ["$12", 12],
    ["$12.50", 12.5],
    ["1,200", 1200],
    ["$1,200.50", 1200.5],
  ])("parses %j as %s", (text, parsed) => {
    expect(parsePlayerAnswer(text)).toBe(parsed);
  });
});

describe("answer submission", () => {
  function modelWith(answer: number) {
    const model = new GameModel();
    model.questions = [new Question(1, "Shop", "What do you pay?", answer)];
    model.questionIndex = 0;
    return model;
  }

  it("leaves an invalid answer unchecked", () => {
    const model = modelWith(20);

    model.submitAnswer(null);
    expect(model.playerAnswer).toBe(null);
  });

  it("clears the submitted answer when the question changes", () => {
    const model = modelWith(20);
    model.submitAnswer(20);

    model.nextQuestion();

    expect(model.playerAnswer).toBe(null);
  });
});
