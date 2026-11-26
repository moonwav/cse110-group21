import { describe, it, expect } from "vitest";
import GameModel from "../../src/model/GameModel";
import Question from "../../src/model/Question";
import * as HintProvider from "../../src/model/hintProvider";
import * as ScoreTracker from "../../src/model/scoreTracker";

describe("HintProvider: hints", () => {
  it("returns the question's hint", () => {
    const question = new Question(1, "Shop", "Q", 10, 7, "Find 10% of $40.", "");
    expect(HintProvider.getHint(question)).toBe("Find 10% of $40.");
  });

  it("falls back to a general hint when the question has none", () => {
    const emptyHint = new Question(1, "Shop", "Q", 10, 7, "", "");
    const blankHint = new Question(1, "Shop", "Q", 10, 7, "   ","");
    expect(HintProvider.getHint(emptyHint)).toBe(HintProvider.FALLBACK_HINT);
    expect(HintProvider.getHint(blankHint)).toBe(HintProvider.FALLBACK_HINT);
  });

  it("does not change the score", () => {
    const model = new GameModel();
    HintProvider.getHint(model.getCurrentQuestion());
    HintProvider.getRevealedAnswer(model.getCurrentQuestion());
    expect(model.getCurrentRecord().hintUsed).toBe(false);
    expect(ScoreTracker.currentScore(model)).toBe(100);
  });
});

describe("HintProvider: revealed answer", () => {
  it.each([
    [40, "$40.00"],
    [12.5, "$12.50"],
    [12.42, "$12.42"],
    [0.5, "$0.50"],
  ])("shows %s as %s", (answer, shown) => {
    const question = new Question(1, "Shop", "Q", answer, 7, "Hint", "");
    expect(HintProvider.getRevealedAnswer(question)).toBe(shown);
  });
});