export type MinigameEndData = {
  completed: boolean;
  timeTaken: number;
};

const placeholderData: MinigameEndData = {
  completed: false,
  timeTaken: 0,
};

export class MinigameEndModel {
  private data: MinigameEndData = placeholderData;

  setData(data: MinigameEndData) {
    this.data = data;
  }

  getData(): MinigameEndData {
    return this.data;
  }

  getTitle(): string {
    return this.data.completed ? "Congratulations!" : "You ran out of time";
  }

  getMessage(): string {
    return this.data.completed
      ? `You completed the minigame in ${this.data.timeTaken} seconds!`
      : "";
  }
}
