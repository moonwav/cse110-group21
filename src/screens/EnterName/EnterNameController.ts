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
        this.view = new EnterNameView(model, stage_width, stage_height, 
                                    (nameText) => this.handleConfirmClick(nameText),
                                    () => this.handleBackClick());
    }
    
    handleConfirmClick(nameText: string) {
        const name = nameText.trim();
        if (name === "" || name === null) {
            this.view.showInvalid();
            return;
        }
        this.model.setPlayer(name);
        this.view.displayWelcomeMessage(() => this.handleReadyClick());
    }

    handleReadyClick() {
        this.model.beginGame();
        this.screenSwitcher.switchToScreen({type: "options"});
    }

    handleBackClick() {
        this.screenSwitcher.switchToScreen({type: "menu"});
    }

    show() {
        this.view.reset();
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): EnterNameView {
        return this.view;
    }
}