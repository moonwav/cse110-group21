import { showQuestionScreen } from "./presentation/IndividualProblem";

const root = document.querySelector("#game");
if (root instanceof HTMLDivElement) showQuestionScreen(root);
