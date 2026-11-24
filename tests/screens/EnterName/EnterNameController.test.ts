import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  view: {
    showInvalid: vi.fn(),
    displayWelcomeMessage: vi.fn(),
    reset: vi.fn(),
    show: vi.fn(),
    hide: vi.fn(),
  },
  // The onConfirmClick callback the controller hands to the view
  onConfirmClick: null as null | ((nameText: string) => void),
}));

vi.mock("../../../src/screens/EnterName/EnterNameView", () => ({
  default: class {
    constructor(_model: unknown, _w: number, _h: number, onConfirmClick: (nameText: string) => void) {
      mocks.onConfirmClick = onConfirmClick;
      return mocks.view;
    }
  },
}));

import EnterNameController from "../../../src/screens/EnterName/EnterNameController";
import GameModel from "../../../src/model/GameModel";

function setup() {
  const model = new GameModel();
  const screenSwitcher = { switchToScreen: vi.fn() };
  const controller = new EnterNameController(model, screenSwitcher, 1000, 800);
  return { model, screenSwitcher, controller };
}

describe("EnterNameController confirm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows invalid and does not set the player for an empty name", () => {
    const { model, controller } = setup();
    const before = model.getPlayer();
    controller.handleConfirmClick("");
    expect(mocks.view.showInvalid).toHaveBeenCalled();
    expect(mocks.view.displayWelcomeMessage).not.toHaveBeenCalled();
    expect(model.getPlayer()).toBe(before);
  });

  it("treats a whitespace-only name as invalid", () => {
    const { controller } = setup();
    controller.handleConfirmClick("   ");
    expect(mocks.view.showInvalid).toHaveBeenCalled();
    expect(mocks.view.displayWelcomeMessage).not.toHaveBeenCalled();
  });

  it("sets the trimmed name and shows the welcome message for a valid name", () => {
    const { model, controller } = setup();
    controller.handleConfirmClick("  Akari  ");
    expect(model.getPlayer()).toBe("Akari");
    expect(mocks.view.showInvalid).not.toHaveBeenCalled();
    expect(mocks.view.displayWelcomeMessage).toHaveBeenCalledTimes(1);
  });

  it("accepts a valid name after an invalid try", () => {
    const { model, controller } = setup();
    controller.handleConfirmClick("");
    controller.handleConfirmClick("Sam");
    expect(mocks.view.showInvalid).toHaveBeenCalledTimes(1);
    expect(model.getPlayer()).toBe("Sam");
    expect(mocks.view.displayWelcomeMessage).toHaveBeenCalledTimes(1);
  });

  it("passes the typed name from the view's Confirm button to the controller", () => {
    const { model } = setup();
    mocks.onConfirmClick!("Lee");
    expect(model.getPlayer()).toBe("Lee");
  });

  it("the Ready button starts the game and goes to the options screen", () => {
    const { model, screenSwitcher, controller } = setup();
    const beginGame = vi.spyOn(model, "beginGame");
    controller.handleConfirmClick("Akari");
    const onReadyClick = mocks.view.displayWelcomeMessage.mock.calls[0][0];
    onReadyClick();
    expect(beginGame).toHaveBeenCalled();
    expect(screenSwitcher.switchToScreen).toHaveBeenCalledWith({ type: "options" });
  });
});

describe("EnterNameController show/hide", () => {
  beforeEach(() => vi.clearAllMocks());

  it("resets the view before showing it", () => {
    const { controller } = setup();
    controller.show();
    expect(mocks.view.reset).toHaveBeenCalled();
    expect(mocks.view.show).toHaveBeenCalled();
    expect(mocks.view.reset.mock.invocationCallOrder[0])
      .toBeLessThan(mocks.view.show.mock.invocationCallOrder[0]);
  });

  it("hide hides the view", () => {
    const { controller } = setup();
    controller.hide();
    expect(mocks.view.hide).toHaveBeenCalled();
  });
});
