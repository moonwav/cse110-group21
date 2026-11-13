import { describe, it, expect } from "vitest";
import Question from "../../src/logic/question";
import { checkAnswer } from "../../src/logic/answerChecker";

function check(input: string, answer: number) {
  const question = new Question(1, "Shop", "What do you pay?", answer, 7);
  return checkAnswer(input, question);
}

describe("checkAnswer", () => {
  it.each([
    ["20", 20],
    ["20.00", 20],
    ["$20", 20],
    ["1,200", 1200],
    ["$1,200.50", 1200.5],
    [".5", 0.5],
    ["  20  ", 20],
  ])("treats %j as correct for an answer of %s", (input, answer) => {
    expect(check(input, answer)).toEqual({ status: "correct" });
  });

  it.each([
    ["21", 20],
    ["0", 20],
    ["19.99", 20],
    ["20.01", 20],
  ])("treats %j as incorrect for an answer of %s", (input, answer) => {
    expect(check(input, answer)).toEqual({ status: "incorrect" });
  });

  it.each([
    [""],
    ["   "],
    ["abc"],
    ["12abc"],
    ["1.2.3"],
    ["-5"],
    ["1.234"],
  ])("treats %j as invalid, not as a wrong answer", (input) => {
    expect(check(input, 20).status).toBe("invalid");
  });

  it("gives the same message the view shows for invalid input", () => {
    expect(check("abc", 20)).toEqual({ status: "invalid", message: "Enter a number." });        
  });

  it("compares to the cent, so float noise does not make a right answer wrong", () => {
    expect(check("0.3", 0.1 + 0.2)).toEqual({ status: "correct" });
  });
});