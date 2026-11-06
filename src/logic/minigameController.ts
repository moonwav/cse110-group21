import MinigameView from '../presentation/minigameView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";

//will define the MinigameController
export default class MinigameController extends Controller{
    model: GameModel;
    view: MinigameView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new MinigameView(model, stage_width, stage_height);
        this.screenSwitcher = screenSwitcher;
    }
    
    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): MinigameView {
        return this.view;
    }
}