import { describe, it, expect } from "vitest";
import { MinigameEndModel } from "../../../../src/screens/Minigame/MinigameEnd/MinigameEndModel";

function modelWith(completed: boolean, timeTaken: number): MinigameEndModel {
  const model = new MinigameEndModel();
  model.setData({ completed, timeTaken });
  return model;
}

describe("MinigameEndModel completed in time", () => {
  it("congratulates the player", () => {
    expect(modelWith(true, 42).getTitle()).toBe("Congratulations!");
  });

  it("says how many seconds it took", () => {
    expect(modelWith(true, 42).getMessage())
      .toBe("You completed the minigame in 42 seconds!");
  });
});

describe("MinigameEndModel ran out of time", () => {
  it("says the player ran out of time", () => {
    expect(modelWith(false, 60).getTitle()).toBe("You ran out of time");
  });

  it("has no second line", () => {
    expect(modelWith(false, 60).getMessage()).toBe("");
  });
});

describe("MinigameEndModel data", () => {
  it("returns the data it was given", () => {
    expect(modelWith(true, 17).getData()).toEqual({ completed: true, timeTaken: 17 });
  });

  it("replaces old data when given new data", () => {
    const model = modelWith(true, 17);
    model.setData({ completed: false, timeTaken: 60 });
    expect(model.getTitle()).toBe("You ran out of time");
  });

  it("starts as ran out of time before any data is set", () => {
    const model = new MinigameEndModel();
    expect(model.getTitle()).toBe("You ran out of time");
    expect(model.getMessage()).toBe("");
  });
});
