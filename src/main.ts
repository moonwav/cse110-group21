import { showQuestionScreen } from "./presentation/questionScreen";

const root = document.querySelector("#game");
if (root instanceof HTMLDivElement) showQuestionScreen(root);
