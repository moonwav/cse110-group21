import { describe, it, expect } from "vitest";
import Question from "../../src/logic/question";
import { AnswerChecker } from "../../src/logic/answerChecker";

describe("AnswerChecker", () => {
  it("Correct when input matches answer", () => {
    const question = new Question(1, "Beach", "25% of 80 is?", 20);
    const checker = new AnswerChecker();

    expect(checker.check("20", question)).toEqual({ status: "correct" });
  });
});