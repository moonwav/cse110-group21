import ResultView from './ResultView';
import GameModel from '../../model/GameModel';
import { ResultData, ResultModel } from './ResultModel';
import { ScreenSwitcher, Controller } from "../../types";

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
                                    () => this.handleBackClick(),
                                    stage_width, stage_height);
        this.screenSwitcher = screenSwitcher;
    }

    handleAnswerKeyClick() {
        this.view.hideLeaderboard();
        this.screenSwitcher.switchToScreen({type: "answer"});
    }

    async handleLeaderboardClick() {
        const name = encodeURIComponent(this.model.getPlayer());
        let scores: { percent: number; playedAt: string }[] = [];
        try {
            const response = await fetch(`/api/scores?name=${name}`);
            if (response.ok) {
                scores = await response.json() as { percent: number; playedAt: string }[];
            }
        } catch {
            // No score server (e.g. the static GitHub Pages build): show an empty leaderboard.
        }
        this.view.showLeaderboard(scores);
    }

    handlePlayAgainClick() {
        this.screenSwitcher.switchToScreen({type: "menu"});
    }

    handleBackClick() {
        this.view.hideLeaderboard();
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