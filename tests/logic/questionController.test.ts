import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  view: {
    showInvalid: vi.fn(),
    clearInvalid: vi.fn(),
    showResult: vi.fn(),
    showNext: vi.fn(),
    showQuestion: vi.fn(),
    updateScoreAndProgress: vi.fn(),
    show: vi.fn(),
    hide: vi.fn(),
  },
  checkAnswer: vi.fn(),
}));

vi.mock("../../src/presentation/questionView", () => ({
  default: class {
    constructor() {
      return mocks.view;
    }
  },
}));
vi.mock("../../src/logic/answerChecker", () => ({ checkAnswer: mocks.checkAnswer }));

import QuestionController from "../../src/logic/questionController";
import GameModel from "../../src/logic/model";
import * as ScoreTracker from "../../src/logic/scoreTracker";

function setup() {
  const model = new GameModel();
  const screenSwitcher = { switchToScreen: vi.fn() };
  const controller = new QuestionController(model, screenSwitcher, 1000, 800);
  return { model, screenSwitcher, controller };
}

describe("QuestionController submit", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows invalid and does not complete on invalid input", () => {
    mocks.checkAnswer.mockReturnValue({ status: "invalid", message: "x" });
    const { model, controller } = setup();
    controller.handleSubmitClick("abc");
    expect(mocks.view.showInvalid).toHaveBeenCalled();
    expect(ScoreTracker.isFinished(model.getCurrentRecord())).toBe(false);
  });

  it("clears the previous result message on invalid input", () => {
    mocks.checkAnswer.mockReturnValue({ status: "invalid", message: "x" });
    const { controller } = setup();
    controller.handleSubmitClick("abc");
    expect(mocks.view.showResult).toHaveBeenCalledWith("");
  });

  it("wrong answer shows retry message and stays unlocked", () => {
    mocks.checkAnswer.mockReturnValue({ status: "incorrect" });
    const { model, controller } = setup();
    controller.handleSubmitClick("1");
    expect(mocks.view.showResult).toHaveBeenCalledWith("Incorrect, try again.");
    expect(mocks.view.showNext).not.toHaveBeenCalled();
    expect(ScoreTracker.isFinished(model.getCurrentRecord())).toBe(false);
  });

  it("allows retry after a wrong answer", () => {
    mocks.checkAnswer.mockReturnValue({ status: "incorrect" });
    const { controller } = setup();
    controller.handleSubmitClick("1");
    controller.handleSubmitClick("2");
    expect(mocks.view.showResult).toHaveBeenCalledTimes(2);
  });

  it("stores the parsed answer", () => {
    mocks.checkAnswer.mockReturnValue({ status: "incorrect" });
    const { model, controller } = setup();
    controller.handleSubmitClick("12.5");
    expect(model.playerAnswer).toBe(12.5);
  });

  it("correct answer completes the question and shows Next", () => {
    mocks.checkAnswer.mockReturnValue({ status: "correct" });
    const { model, controller } = setup();
    controller.handleSubmitClick("5");
    expect(mocks.view.showResult).toHaveBeenCalledWith("Correct");
    expect(mocks.view.showNext).toHaveBeenCalled();
    expect(ScoreTracker.isFinished(model.getCurrentRecord())).toBe(true);
  });

  it("ignores submits after the question is completed", () => {
    mocks.checkAnswer.mockReturnValue({ status: "correct" });
    const { controller } = setup();
    controller.handleSubmitClick("5");
    mocks.checkAnswer.mockClear();
    controller.handleSubmitClick("5");
    expect(mocks.checkAnswer).not.toHaveBeenCalled();
  });
});

describe("QuestionController next", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads the next question and unlocks submit", () => {
    mocks.checkAnswer.mockReturnValue({ status: "correct" });
    const { model, controller, screenSwitcher } = setup();
    controller.handleSubmitClick("5");
    controller.handleNextClick();
    expect(mocks.view.showQuestion).toHaveBeenCalled();
    expect(model.questionIndex).toBe(1);
    expect(ScoreTracker.isFinished(model.getCurrentRecord())).toBe(false);
    expect(screenSwitcher.switchToScreen).not.toHaveBeenCalled();
  });

  it("ends the game on the last question", () => {
    const { model, controller, screenSwitcher } = setup();
    model.questionIndex = model.questions.length - 1;
    controller.handleNextClick();
    expect(screenSwitcher.switchToScreen).toHaveBeenCalledWith(
      { type: "result", data: ScoreTracker.getResults(model) });
  });
});


describe("QuestionController scoring", () => {
  beforeEach(() => vi.clearAllMocks());

  it("counts a wrong try without changing the score", () => {
    mocks.checkAnswer.mockReturnValue({ status: "incorrect" });
    const { model, controller } = setup();
    controller.handleSubmitClick("1");
    expect(model.getCurrentRecord().wrongTries).toBe(1);
    expect(ScoreTracker.currentScore(model)).toBe(100);
  });

  it("shows the new score after a hint", () => {
    const { model, controller } = setup();
    controller.handleHintClick();
    expect(mocks.view.updateScoreAndProgress).toHaveBeenLastCalledWith(
      98, 1, model.questions.length);
  });
});