import EnterNameView from '../presentation/enterNameView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";

//Defines the EnterNameController
export default class EnterNameController extends Controller{
    model: GameModel;
    view: EnterNameView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.screenSwitcher = screenSwitcher;
        this.view = new EnterNameView(model, stage_width, stage_height);
    }
    

    handleReady() {
        this.model.setStateQuestion();
        this.screenSwitcher.switchToScreen({type: "question"});
    }


    async show() {
        this.view.show();
        this.model.setPlayer(await this.view.getUsername());
        await this.view.displayWelcomeMessage(() => this.handleReady());3
    }

    hide() {
        this.view.hide();
    }

    getView(): EnterNameView {
        return this.view;
    }
}