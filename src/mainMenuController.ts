import MainMenuView from './mainMenuView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "./types";

//will define the MainMenuController
export default class MainMenuController extends Controller{
    model: GameModel;
    view: MainMenuView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher) {
        super();
        this.model = model;
        this.view = new MainMenuView(() => this.handleStartClick(), 
                                        () => this.handleInfoClick(), 
                                        () => this.handleMinigameClick());
        this.screenSwitcher = screenSwitcher;
    }

    handleStartClick() {
        this.hide();
        this.model.setPlayer(this.view.enterName());
        console.log(this.model.getPlayer());
        this.model.setStateQuestion();
        this.screenSwitcher.switchToScreen({type: "question"});
    }

    handleInfoClick() {
        this.hide();
        this.model.setStateInfo();
        this.screenSwitcher.switchToScreen({type: "info"});
    }

    handleMinigameClick() {
        this.hide();
        this.model.setStateMinigame();
        this.screenSwitcher.switchToScreen({type: "minigame"});
    }
    
    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): MainMenuView {
        return this.view;
    }
}