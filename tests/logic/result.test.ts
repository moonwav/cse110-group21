import { describe, it, expect } from "vitest";
import { ResultModel, ResultData } from "../../src/data/resultModel";

function makeResults(percent: number): ResultData { 
    return { percent, wrongAnswers: 0, hintsUsed: 0 }
}

function modelWith(percent: number): ResultModel {
  const model = new ResultModel();
  model.setResults(makeResults(percent));
  return model;
}

describe("ResultModel.getGrade", () => {
  it.each([
    [100, "A"], [90, "A"],
    [89, "B"], [80, "B"],
    [79, "C"], [70, "C"],
    [69, "D"], [60, "D"],
    [59, "F"], [0, "F"],
  ])("%i%% earns %s", (percent, letter) => {
    expect(modelWith(percent).getGrade().letter).toBe(letter);
  });

  it("handles a decimal just below a cutoff", () => {
    expect(modelWith(89.9).getGrade().letter).toBe("B");
  });

  it("falls back to F for a negative percent", () => {
    expect(modelWith(-5).getGrade().letter).toBe("F");
  });

  it("gives A for a percent over 100", () => {
    expect(modelWith(110).getGrade().letter).toBe("A");
  });

  it("returns the title and message that match the letter", () => {
    const gradeA = modelWith(91).getGrade();
    const gradeC = modelWith(72).getGrade();
    expect(gradeA).toMatchObject({ letter: "A", title: "PERCENTAGE EXPERT!", 
        message: "Budgeted like a pro, great job! Keep practicing to stay sharp." });
    expect(gradeC).toMatchObject({ letter: "C", title: "GETTING THERE!", 
        message: "Solid effort. Review the answer key to see where points went." });
  });
});