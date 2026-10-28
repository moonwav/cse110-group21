import ResultView from '../presentation/resultView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";

//will define the ResultController
export default class ResultController extends Controller{
    model: GameModel;
    view: ResultView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher) {
        super();
        this.model = model;
        this.view = new ResultView();
        this.screenSwitcher = screenSwitcher;
    }
    
    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): ResultView {
        return this.view;
    }
}