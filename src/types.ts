import type { Group } from "konva/lib/Group";

export interface View {
	getGroup(): Group;
	show(): void;
	hide(): void;
}

/**
 * Screen types for navigation
 *
 * - "menu": Main menu screen
 * - "question": Main gameplay question screen
 * - "result": Results screen with final score
 *   - score: Final score to display on results screen
 * - "info": The how to play instructions screen
 * - "minigame": The minigame screen
 */
export type Screen =
	| { type: "menu" }
	| { type: "question" }
	| { type: "result"; score: number }
    | { type: "minigame" }
<<<<<<< HEAD
    | { type: "info" }
	| { type: "enter name"};
=======
    | { type: "info" };
>>>>>>> e6f8cb43442b60a166c5a042af603d10f4ffaeab

export abstract class Controller {
	abstract getView(): View;

	show(): void {
		this.getView().show();
	}

	hide(): void {
		this.getView().hide();
	}
}

export interface ScreenSwitcher {
	switchToScreen(screen: Screen): void;
}