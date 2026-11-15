import OptionsView from './OptionsView';
import GameModel from '../../model/GameModel';
import Question from '../../model/Question';
import { ScreenSwitcher, Controller } from "../../types";

//will define the OptionsController
export default class OptionsController extends Controller{
    model: GameModel;
    view: OptionsView;
    screenSwitcher: ScreenSwitcher;
    options: Question[];

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new OptionsView(() => this.handleChoiceClick(0), 
                                    () => this.handleChoiceClick(1),
                                    () => this.handleChoiceClick(2),
                                    () => this.handleChoiceClick(3),
                                    stage_width, stage_height);
        this.screenSwitcher = screenSwitcher;
        this.options = [];
    }

    handleChoiceClick(choice: number) {
        const question = this.options[choice];
        if (!question) return;
        this.model.chooseQuestion(question);
        this.screenSwitcher.switchToScreen({ type: "question" });
    }
    
    show() {
        this.options = this.model.getOptions();
        this.view.setTitle(this.model.questionIndex + 1, this.model.questions.length);
        this.view.setChoices(this.options.map((question) => question.getLocation()));
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): OptionsView {
        return this.view;
    }
}