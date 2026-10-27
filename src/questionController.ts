import QuestionView from './questionView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "./types";

//will define the MainMenuController
export default class QuestionController extends Controller{
    model: GameModel;
    view: QuestionView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher) {
        super();
        this.model = model;
        this.view = new QuestionView(() => this.handleSubmitClick(), 
                    () => this.handleHintClick(), 
                    () => this.handleRevealClick());
        this.screenSwitcher = screenSwitcher;
    }
    handleSubmitClick() {
        //tell model to check submission?
        //display if the answer is correct or not
        //
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
        //model to make new question instance?
        //update current question.

    }

    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): QuestionView {
        return this.view;
    }
}