import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  view: {
    updateText: vi.fn(),
    show: vi.fn(),
    hide: vi.fn(),
  },
  callbacks: {
    onPlayAgainClick: () => {},
    onMainMenuClick: () => {},
  },
}));

vi.mock("../../../../src/screens/Minigame/MinigameEnd/MinigameEndView", () => ({
  default: class {
    constructor(onPlayAgainClick: () => void, onMainMenuClick: () => void) {
      mocks.callbacks.onPlayAgainClick = onPlayAgainClick;
      mocks.callbacks.onMainMenuClick = onMainMenuClick;
      return mocks.view;
    }
  },
}));

import MinigameEndController from "../../../../src/screens/Minigame/MinigameEnd/MinigameEndController";
import GameModel from "../../../../src/model/GameModel";

function setup() {
  const screenSwitcher = { switchToScreen: vi.fn() };
  const controller = new MinigameEndController(new GameModel(), screenSwitcher, 1000, 800);
  return { controller, screenSwitcher };
}

describe("MinigameEndController show", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows the completed text and time", () => {
    const { controller } = setup();
    controller.show({ completed: true, timeTaken: 42 });
    expect(mocks.view.updateText).toHaveBeenCalledWith(
      "Congratulations!", "You completed the minigame in 42 seconds!");
    expect(mocks.view.show).toHaveBeenCalled();
  });

  it("shows the ran out of time text with no message", () => {
    const { controller } = setup();
    controller.show({ completed: false, timeTaken: 60 });
    expect(mocks.view.updateText).toHaveBeenCalledWith("You ran out of time", "");
  });

  it("sets the text before showing the view", () => {
    const { controller } = setup();
    controller.show({ completed: true, timeTaken: 10 });
    const textOrder = mocks.view.updateText.mock.invocationCallOrder[0];
    const showOrder = mocks.view.show.mock.invocationCallOrder[0];
    expect(textOrder).toBeLessThan(showOrder);
  });

  it("hides the view", () => {
    const { controller } = setup();
    controller.hide();
    expect(mocks.view.hide).toHaveBeenCalled();
  });
});

describe("MinigameEndController navigation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("starts a new minigame on Play Again", () => {
    const { screenSwitcher } = setup();
    mocks.callbacks.onPlayAgainClick();
    expect(screenSwitcher.switchToScreen).toHaveBeenCalledWith({ type: "minigame" });
  });

  it("goes to the main menu on Main Menu", () => {
    const { screenSwitcher } = setup();
    mocks.callbacks.onMainMenuClick();
    expect(screenSwitcher.switchToScreen).toHaveBeenCalledWith({ type: "menu" });
  });
});
