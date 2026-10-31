import AnswerView from '../presentation/answerView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";

//will define the AnswerController
export default class AnswerController extends Controller{
    model: GameModel;
    view: AnswerView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher,
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new AnswerView(() => this.handleBackClick(), stage_width, 
                                stage_height);
        this.screenSwitcher = screenSwitcher;
    }

    handleBackClick() {
        this.hide();
        this.screenSwitcher.switchToScreen({type: "result"});
    }
    
    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): AnswerView {
        return this.view;
    }
}