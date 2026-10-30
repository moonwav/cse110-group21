import ResultView from '../presentation/resultView';
import GameModel from './model';
import { ResultData, ResultModel } from '../data/resultModel';
import { ScreenSwitcher, Controller } from "../types";

//will define the ResultsController
export default class ResultController extends Controller{
    model: GameModel;
    resultModel: ResultModel;
    view: ResultView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                    stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.resultModel = new ResultModel();
        this.view = new ResultView(() => this.handleAnswerKeyClick(),
                                    () => this.handleLeaderboardClick(),
                                    () => this.handlePlayAgainClick(),
                                    stage_width, stage_height);
        this.screenSwitcher = screenSwitcher;
    }

    handleAnswerKeyClick() {
        this.screenSwitcher.switchToScreen({type: "answer"});;
    }

    handleLeaderboardClick() {
        return;
    }

    handlePlayAgainClick() {
        this.screenSwitcher.switchToScreen({type: "menu"});;
    }

    show(data?: ResultData) {
        if (data) {
            this.resultModel.setResults(data);
        }
        this.view.updateResults(this.resultModel.getResults(), this.resultModel.getGrade());
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): ResultView {
        return this.view;
    }
}