import QuestionView from '../presentation/questionView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";
import { checkAnswer } from './answerChecker';
import { parsePlayerAnswer } from './question';
//will define the MainMenuController
export default class QuestionController extends Controller{
    model: GameModel;
    view: QuestionView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new QuestionView(this.model, this.model.getCurrentQuestion(), 
                    this.model.currentScore, 
                    (answerText) => this.handleSubmitClick(answerText), 
                    () => this.handleHintClick(), 
                    () => this.handleRevealClick(),
                    () => this.handleNextClick(),
                    stage_width, stage_height);

        this.screenSwitcher = screenSwitcher;
    }

    handleSubmitClick(answerText: string) {
        if (this.model.questionCompleted) return;
        const result = checkAnswer(answerText, this.model.getCurrentQuestion());
        if (result.status === "invalid") {
            this.view.showResult("");
            this.view.showInvalid();
            return;
        }
        this.view.clearInvalid();
        this.model.submitAnswer(parsePlayerAnswer(answerText));
        if (result.status === "correct") {
            this.model.questionCompleted = true;
            this.view.showResult("Correct");
            this.view.showNext();
        } else {
            this.view.showResult("Incorrect, try again.");
        }                                        
    }

    handleNextClick() {
        if (this.model.isLastQuestion()) {
            this.endGame();
        } else {
            this.newQuestion();
        }
    }

    handleHintClick() {
        //tell view to show hint
        //tell model to update score
        this.model.incrementHintsUsed();
    }

    handleRevealClick() {
        //tell view to reveal
        //tell model to update score
    }
    
    newQuestion() {
        this.view.showQuestion(this.model.nextQuestion());
    }

    endGame() {
        this.screenSwitcher.switchToScreen({ type: "result", 
                                             data: this.model.getResults() });
    }

    show() {
        this.model.beginGame();
        this.view.showQuestion(this.model.getCurrentQuestion());
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): QuestionView {
        return this.view;
    }
}