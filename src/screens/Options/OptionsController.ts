import OptionsView from '../presentation/optionsView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";

//will define the OptionsController
export default class OptionsController extends Controller{
    model: GameModel;
    view: OptionsView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new OptionsView(() => this.handleChoice1Click(), 
                                    () => this.handleChoice2Click(),
                                    () => this.handleChoice3Click(),
                                    () => this.handleChoice4Click(),
                                    stage_width, stage_height);
        this.screenSwitcher = screenSwitcher;
    }

    handleChoice1Click() {
        return null;
    }

    handleChoice2Click() {
        return null;
    }

    handleChoice3Click() {
        return null;
    }

    handleChoice4Click() {
        return null;
    }
    
    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): OptionsView {
        return this.view;
    }
}