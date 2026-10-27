import InfoView from './infoView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "./types";

//will define the InfoController
export default class InfoController extends Controller{
    model: GameModel;
    view: InfoView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher,
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new InfoView(() => this.handleBackClick(), stage_width, 
                                stage_height);
        this.screenSwitcher = screenSwitcher;
    }

    handleBackClick() {
        this.hide();
        this.screenSwitcher.switchToScreen({type: "menu"});
    }
    
    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): InfoView {
        return this.view;
    }
}