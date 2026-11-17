import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mocks = vi.hoisted(() => ({
  view: {
    questionCardSelected: vi.fn(),
    questionCardDeselected: vi.fn(),
    answerCardSelected: vi.fn(),
    answerCardDeselected: vi.fn(),
    setCards: vi.fn(),
    setButtonText: vi.fn(),
    lockQuestionCard: vi.fn(),
    lockAnswerCard: vi.fn(),
    lockAllCards: vi.fn(),
    setTime: vi.fn(),
    show: vi.fn(),
    hide: vi.fn(),
  },
}));

vi.mock("../../../src/screens/Minigame/MinigameView", () => ({
  default: class {
    constructor() {
      return mocks.view;
    }
  },
}));

import MinigameController, { MINIGAME_TIME } from "../../../src/screens/Minigame/MinigameController";
import GameModel from "../../../src/model/GameModel";

function setup() {
  const model = new GameModel();
  const screenSwitcher = { switchToScreen: vi.fn() };
  const controller = new MinigameController(model, screenSwitcher, 1000, 800);
  controller.show();
  const solns = controller.minigameModel.getSolutions();
  const wrongAnswer = (i: number) => solns[(i + 1) % solns.length].a;
  return { model, screenSwitcher, controller, solns, wrongAnswer };
}

describe("MinigameController selecting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it("selects a question and an answer", () => {
    const { controller } = setup();
    controller.handleQuestionClick(2);
    controller.handleAnswerClick(4);
    expect(controller.selected_question).toBe(2);
    expect(controller.selected_answer).toBe(4);
    expect(mocks.view.questionCardSelected).toHaveBeenCalledWith(2);
    expect(mocks.view.answerCardSelected).toHaveBeenCalledWith(4);
  });

  it("replaces the selection in the same column", () => {
    const { controller } = setup();
    controller.handleQuestionClick(0);
    controller.handleQuestionClick(1);
    expect(controller.selected_question).toBe(1);
    expect(mocks.view.questionCardDeselected).toHaveBeenCalledWith(0);
  });

  it("deselects a card clicked twice", () => {
    const { controller } = setup();
    controller.handleAnswerClick(3);
    controller.handleAnswerClick(3);
    expect(controller.selected_answer).toBeNull();
    expect(mocks.view.answerCardDeselected).toHaveBeenCalledWith(3);
  });
});

describe("MinigameController submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it("does nothing without a full pair selected", () => {
    const { controller } = setup();
    controller.handleQuestionClick(0);
    controller.handleSubmitClick();
    expect(controller.selected_question).toBe(0);
    expect(controller.wrong_pair).toBeNull();
    expect(controller.minigameModel.amount_answered).toBe(0);
  });

  it("only adds a pair to the model on submit", () => {
    const { controller, solns } = setup();
    controller.handleQuestionClick(solns[0].q);
    controller.handleAnswerClick(solns[0].a);
    expect(controller.minigameModel.amount_answered).toBe(0);
    controller.handleSubmitClick();
    expect(controller.minigameModel.amount_answered).toBe(1);
    expect(controller.minigameModel.player_answers[0]).toEqual(
      { q: solns[0].q, a: solns[0].a });
  });

  it("locks the cards of a correct pair", () => {
    const { controller, solns } = setup();
    controller.handleQuestionClick(solns[0].q);
    controller.handleAnswerClick(solns[0].a);
    controller.handleSubmitClick();
    expect(mocks.view.lockQuestionCard).toHaveBeenCalledWith(solns[0].q);
    expect(mocks.view.lockAnswerCard).toHaveBeenCalledWith(solns[0].a);
  });

  it("colors a correct pair green and stores it", () => {
    const { controller, solns } = setup();
    controller.handleQuestionClick(solns[0].q);
    controller.handleAnswerClick(solns[0].a);
    controller.handleSubmitClick();
    expect(mocks.view.questionCardSelected).toHaveBeenLastCalledWith(solns[0].q, "green");
    expect(mocks.view.answerCardSelected).toHaveBeenLastCalledWith(solns[0].a, "green");
    expect(controller.minigameModel.amount_answered).toBe(1);
    expect(controller.selected_question).toBeNull();
  });

  it("colors a wrong pair red and does not store it", () => {
    const { controller, solns, wrongAnswer } = setup();
    controller.handleQuestionClick(solns[0].q);
    controller.handleAnswerClick(wrongAnswer(0));
    controller.handleSubmitClick();
    expect(mocks.view.questionCardSelected).toHaveBeenLastCalledWith(solns[0].q, "red");
    expect(mocks.view.answerCardSelected).toHaveBeenLastCalledWith(wrongAnswer(0), "red");
    expect(controller.wrong_pair).toEqual({ q: solns[0].q, a: wrongAnswer(0) });
    expect(controller.minigameModel.amount_answered).toBe(0);
  });

  it("ignores clicks on green cards", () => {
    const { controller, solns } = setup();
    controller.handleQuestionClick(solns[0].q);
    controller.handleAnswerClick(solns[0].a);
    controller.handleSubmitClick();
    vi.clearAllMocks();
    controller.handleQuestionClick(solns[0].q);
    controller.handleAnswerClick(solns[0].a);
    expect(controller.selected_question).toBeNull();
    expect(controller.selected_answer).toBeNull();
    expect(mocks.view.questionCardSelected).not.toHaveBeenCalled();
  });
});

describe("MinigameController wrong pair", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  function submitWrong() {
    const result = setup();
    const { controller, solns, wrongAnswer } = result;
    controller.handleQuestionClick(solns[0].q);
    controller.handleAnswerClick(wrongAnswer(0));
    controller.handleSubmitClick();
    vi.clearAllMocks();
    return result;
  }

  it("turns white when its question is clicked", () => {
    const { controller, solns, wrongAnswer } = submitWrong();
    controller.handleQuestionClick(solns[0].q);
    expect(controller.wrong_pair).toBeNull();
    expect(controller.selected_question).toBeNull();
    expect(mocks.view.questionCardDeselected).toHaveBeenCalledWith(solns[0].q);
    expect(mocks.view.answerCardDeselected).toHaveBeenCalledWith(wrongAnswer(0));
  });

  it("turns white when its answer is clicked", () => {
    const { controller, wrongAnswer } = submitWrong();
    controller.handleAnswerClick(wrongAnswer(0));
    expect(controller.wrong_pair).toBeNull();
    expect(controller.selected_answer).toBeNull();
  });

  it("turns white and selects the card when another card is clicked", () => {
    const { controller, solns } = submitWrong();
    controller.handleQuestionClick(solns[1].q);
    expect(controller.wrong_pair).toBeNull();
    expect(controller.selected_question).toBe(solns[1].q);
    expect(mocks.view.questionCardSelected).toHaveBeenCalledWith(solns[1].q);
  });

  it("stays red when a green card is clicked", () => {
    const { controller, solns, wrongAnswer } = setup();
    controller.handleQuestionClick(solns[2].q);
    controller.handleAnswerClick(solns[2].a);
    controller.handleSubmitClick();
    controller.handleQuestionClick(solns[0].q);
    controller.handleAnswerClick(wrongAnswer(0));
    controller.handleSubmitClick();
    controller.handleQuestionClick(solns[2].q);
    expect(controller.wrong_pair).not.toBeNull();
  });
});

describe("MinigameController timer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it("counts down and stops at zero", () => {
    const { controller } = setup();
    expect(mocks.view.setTime).toHaveBeenLastCalledWith(MINIGAME_TIME);
    vi.advanceTimersByTime(1000);
    expect(mocks.view.setTime).toHaveBeenLastCalledWith(MINIGAME_TIME - 1);
    vi.advanceTimersByTime(MINIGAME_TIME * 1000);
    expect(controller.time_left).toBe(0);
    expect(controller.ended).toBe(true);
    expect(controller.timer).toBeNull();
  });

  it("locks the cards and shows Main Menu when time runs out", () => {
    const { controller } = setup();
    vi.advanceTimersByTime(MINIGAME_TIME * 1000);
    controller.handleQuestionClick(0);
    expect(controller.selected_question).toBeNull();
    expect(mocks.view.lockAllCards).toHaveBeenCalled();
    expect(mocks.view.setButtonText).toHaveBeenLastCalledWith("Main Menu");
  });

  it("stops and shows Main Menu when every pair is correct", () => {
    const { controller, solns } = setup();
    for (const { q, a } of solns) {
      controller.handleQuestionClick(q);
      controller.handleAnswerClick(a);
      controller.handleSubmitClick();
    }
    expect(controller.ended).toBe(true);
    expect(mocks.view.setButtonText).toHaveBeenLastCalledWith("Main Menu");
    const left = controller.time_left;
    vi.advanceTimersByTime(5000);
    expect(controller.time_left).toBe(left);
  });

  it("stops when the screen is hidden", () => {
    const { controller } = setup();
    controller.hide();
    expect(controller.timer).toBeNull();
  });
});

describe("MinigameController navigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it("does not leave the screen before the round ends", () => {
    const { controller, screenSwitcher } = setup();
    controller.handleSubmitClick();
    expect(screenSwitcher.switchToScreen).not.toHaveBeenCalled();
  });

  it("goes back to the main menu after the round ends", () => {
    const { controller, screenSwitcher } = setup();
    vi.advanceTimersByTime(MINIGAME_TIME * 1000);
    controller.handleSubmitClick();
    expect(screenSwitcher.switchToScreen).toHaveBeenCalledWith({ type: "menu" });
  });

  it("starts a fresh round each time the screen is shown", () => {
    const { controller, solns } = setup();
    controller.handleQuestionClick(solns[0].q);
    controller.handleAnswerClick(solns[0].a);
    controller.handleSubmitClick();
    vi.advanceTimersByTime(MINIGAME_TIME * 1000);
    controller.hide();
    controller.show();
    expect(controller.minigameModel.amount_answered).toBe(0);
    expect(controller.correct_questions.size).toBe(0);
    expect(controller.time_left).toBe(MINIGAME_TIME);
    expect(controller.ended).toBe(false);
    expect(mocks.view.setButtonText).toHaveBeenLastCalledWith("Submit Answers");
    expect(mocks.view.setCards).toHaveBeenLastCalledWith(controller.minigameModel);
  });
});
