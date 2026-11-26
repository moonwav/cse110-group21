import MinigameEndView from './MinigameEndView';
import GameModel from '../../../model/GameModel';
import { MinigameEndData, MinigameEndModel } from './MinigameEndModel';
import { ScreenSwitcher, Controller } from "../../../types";

export default class MinigameEndController extends Controller {
    model: GameModel;
    minigameEndModel: MinigameEndModel;
    view: MinigameEndView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher,
                    stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.minigameEndModel = new MinigameEndModel();
        this.view = new MinigameEndView(() => this.handlePlayAgainClick(),
                                        () => this.handleMainMenuClick(),
                                        stage_width, stage_height);
        this.screenSwitcher = screenSwitcher;
    }

    handlePlayAgainClick() {
        this.screenSwitcher.switchToScreen({type: "minigame"});
    }

    handleMainMenuClick() {
        this.screenSwitcher.switchToScreen({type: "menu"});
    }

    show(data?: MinigameEndData) {
        if (data) {
            this.minigameEndModel.setData(data);
        }
        this.view.updateText(this.minigameEndModel.getTitle(),
                             this.minigameEndModel.getMessage());
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): MinigameEndView {
        return this.view;
    }
}
