import MainMenuView from '../presentation/mainMenuView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";

//will define the MainMenuController
export default class MainMenuController extends Controller{
    model: GameModel;
    view: MainMenuView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new MainMenuView(() => this.handleStartClick(), 
                                        () => this.handleInfoClick(), 
                                        () => this.handleMinigameClick(),
                                        stage_width, stage_height);
        this.screenSwitcher = screenSwitcher;
    }

    handleStartClick() {
        this.screenSwitcher.switchToScreen({type: "enter name"});
    }

    handleInfoClick() {
        this.model.setStateInfo();
        this.screenSwitcher.switchToScreen({type: "info"});
    }

    handleMinigameClick() {
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