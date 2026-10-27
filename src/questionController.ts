import QuestionView from './questionView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "./types";
import Question from './question';

//will define the MainMenuController
export default class QuestionController extends Controller{
    model: GameModel;
    view: QuestionView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new QuestionView(this.model, new Question(3, 
                    'Souvenir Shop', 'a really good question here', 15), 
                    20, () => this.handleSubmitClick(), 
                    () => this.handleHintClick(), 
                    () => this.handleRevealClick(), stage_width, stage_height);
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