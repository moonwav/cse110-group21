import EnterNameView from './EnterNameView';
import GameModel from '../../model/GameModel';
import { ScreenSwitcher, Controller } from "../../types";

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
    

    handleReadyClick() {
        this.screenSwitcher.switchToScreen({type: "question"});
    }


    async show() {
        this.view.show();
        this.model.setPlayer(await this.getPlayerName());
        this.view.displayWelcomeMessage(() => this.handleReadyClick());
    }

    async getPlayerName(): Promise<string> {
        let name = (await this.view.getUsername()).trim();
        if (name ===  "" || name === null) {
            this.view.showInvalid();
            return this.getPlayerName();
        }
        else {
            return name;
        }
    }


    hide() {
        this.view.hide();
    }

    getView(): EnterNameView {
        return this.view;
    }
}