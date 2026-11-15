import AnswerView from './AnswerKeyView';
import GameModel from '../../model/GameModel';
import { ScreenSwitcher, Controller } from "../../types";

//will define the AnswerController
export default class AnswerController extends Controller{
    model: GameModel;
    view: AnswerView;
    screenSwitcher: ScreenSwitcher;
    questionIndex: number;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher,
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new AnswerView(() => this.handleBackClick(), 
                                   () => this.handleNextQClick(), 
                                   () => this.handlePrevQClick(),
                                   stage_width, stage_height);
        this.screenSwitcher = screenSwitcher;
        this.questionIndex = 0;
    }

    handleBackClick() {
        this.hide();
        this.screenSwitcher.switchToScreen({type: "result"});
    }

    handleNextQClick() {
        if (this.questionIndex < this.model.questions.length - 1) {
            this.questionIndex += 1;
            this.view.updateQuestion(this.model.questions[this.questionIndex]);
        }
    }

    handlePrevQClick() {
        if (this.questionIndex > 0) {
            this.questionIndex -= 1;
            this.view.updateQuestion(this.model.questions[this.questionIndex]);
        }
    }
    
    show() {
        this.questionIndex = 0;
        this.view.updateQuestion(this.model.questions[this.questionIndex]);
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): AnswerView {
        return this.view;
    }
}