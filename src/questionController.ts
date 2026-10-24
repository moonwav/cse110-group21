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
        this.view = new QuestionView(() => this.handleSubmitClick(), () => this.handleHintClick(), () => this.handleRevealClick());
        this.screenSwitcher = screenSwitcher;
    }

    handleStartClick() {
        this.view.hide();
        this.model.setPlayer(this.view.enterName());
        this.model.setStateQuestion();
        this.screenSwitcher.switchToScreen({type: "game"});
    }
    handleInfoClick() {
        this.view.hide();
        this.model.setStateInfo();
        this.screenSwitcher.switchToScreen({type: "info"});
    }

    handleMinigameClick() {
        this.view.hide();
        this.model.setStateMinigame();
        
    }
    
    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    handleSubmitClick() {

    }

    handleHintClick() {

    }

    handleRevealClick() {

    }
    
    getView(): QuestionView {
        return this.view;
    }
}