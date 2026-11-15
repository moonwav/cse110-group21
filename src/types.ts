import type { Group } from "konva/lib/Group";
import { ResultData } from "./screens/Result/ResultModel";

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
 *   - data: Final numerical results to display on results screen
 * - "info": The how to play instructions screen
 * - "minigame": The minigame screen
 * - "answer": The answer key screen
 * - "options": The options screen in between questions for story progression
 */
export type Screen =
	| { type: "menu" }
	| { type: "question" }
	| { type: "result"; data?: ResultData }
    | { type: "minigame" }
	| { type: "enter name"}
    | { type: "info" }
	| { type: "answer" }
	| { type: "options" };

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