import { showQuestionScreen } from "./presentation/questionScreen";

const root = document.querySelector("#game");
if (root instanceof HTMLElement) showQuestionScreen(root);
