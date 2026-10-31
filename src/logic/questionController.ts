import QuestionView from '../presentation/questionView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";
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
                    this.model.currentScore, () => this.handleSubmitClick(), 
                    () => this.handleHintClick(), 
                    () => this.handleRevealClick(), stage_width, stage_height);
        this.screenSwitcher = screenSwitcher;
    }
    handleSubmitClick() {
        const answer = this.view.getPlayerAnswer();
        this.model.submitAnswer(answer);
        if (answer === null) this.view.showInvalid();
        else this.view.clearInvalid();
    }

    handleHintClick() {
        //tell view to show hint
        //tell model to update score
    }

    handleRevealClick() {
        //tell view to reveal
        //tell model to update score
    }
    
    newQuestion() {
        this.view.showQuestion(this.model.nextQuestion());
    }

    show() {
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