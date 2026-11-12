import MinigameView from '../presentation/minigameView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";
import { MinigameModel } from '../data/minigameModel';

//will define the MinigameController
export default class MinigameController extends Controller{
    model: GameModel;
    view: MinigameView;
    screenSwitcher: ScreenSwitcher;
    minigameModel: MinigameModel;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.minigameModel = new MinigameModel();
        this.view = new MinigameView(this.minigameModel, stage_width, stage_height);
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