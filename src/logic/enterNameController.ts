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
        this.view = new EnterNameView(stage_width, stage_height);
    }
    

    handleNameEntered(name: string) {
        setTimeout(()=>{
            this.model.setPlayer(name);
            this.model.setStateQuestion();
            this.screenSwitcher.switchToScreen({type: "question"});}, 
            3000);
    }


    show() {
        this.view.show();
        this.view.showName((name: string) => this.handleNameEntered(name));
    }

    hide() {
        this.view.hide();
    }

    getView(): EnterNameView {
        return this.view;
    }
}