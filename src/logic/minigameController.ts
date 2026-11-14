import MinigameView from '../presentation/minigameView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";
import { MinigameModel } from '../data/minigameModel';

//will define the MinigameController
export default class MinigameController extends Controller{
    model: GameModel;
    view: MinigameView;
    screenSwitcher: ScreenSwitcher;
    minigameModel: MinigameModel;
    currently_selected: string | null;
    waiting: number;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.minigameModel = new MinigameModel();
        this.view = new MinigameView(this.minigameModel, stage_width, stage_height, (id: number) => this.handleQuestionSelect(id), (id: number) => this.handleQuestionDeselect(id), (id: number) => this.handleAnswerSelect(id),  (id: number) => this.handleAnswerDeselect(id));
        this.screenSwitcher = screenSwitcher;
        this.currently_selected = null;
        this.waiting = 5;

    }


    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    /*
     * Takes the index of an question card selected as the parameter (0 through 
     * 4) and either holds onto it as waiting for an answer or adds it as a pair
     * with its answer to the models list. Also tells the view to update 
     * to display it as selected.
     */ 
    handleQuestionSelect(id: number) {
        if(this.currently_selected == null) {
			this.currently_selected = 'question';
			this.view.questionCardSelected(id);
		}
        else if (this.currently_selected == 'question') {
            this.view.questionCardDeselected(this.waiting);
            this.waiting = id;
            this.view.questionCardSelected(id);
        }
        else {
            this.minigameModel.addPair(id, this.waiting);
        }

    }

    /*
     * Takes the index of an answer card selected as the parameter (0 through 
     * 4) and either holds onto it as waiting for a question or adds it as a pair
     * with its question to the models list. Also tells the view to update
     * to display it as selected.
     */ 
    handleAnswerSelect(id: number) {
        if(this.currently_selected == null) {
			this.currently_selected = 'answer';
			this.view.answerCardSelected(id);
		}
        else if (this.currently_selected == 'answer') {
            this.view.answerCardDeselected(this.waiting);
            this.waiting = id;
            this.view.answerCardSelected(id);
        }
        else {
            this.minigameModel.addPair(this.waiting, id);
        }
    }

    /*
     * Takes the index of a question card that is deselected as the parameter 
     * (0 through 4) and removes it from waiting for an answer or removes its pair
     * from the models list. Also tells the view to update to no longer show it
     * (and its matching question if applicable) as selected.
     */ 
    handleQuestionDeselect(id: number) {
        if(this.currently_selected == 'question' && this.waiting == id) {
            this.currently_selected = null;
            this.waiting = 5;
        }
        else {
            this.view.answerCardDeselected(this.minigameModel.removePairQ(id));
            this.view.questionCardDeselected(id);
        }
    }

    /*
     * Takes the index of an answer card that is deselected as the parameter 
     * (0 through 4) and removes it from waiting for a question or removes its pair
     * from the models list. Also tells the view to update to no longer show it
     * (and its matching answer if applicable) as selected.
     */ 
    handleAnswerDeselect(id: number) {
        if(this.currently_selected == 'answer' && this.waiting == id) {
            this.currently_selected = null;
            this.waiting = 5;
        }
        else {
            this.view.questionCardDeselected(this.minigameModel.removePairA(id));
            this.view.answerCardDeselected(id);
        }
    }

    getView(): MinigameView {
        return this.view;
    }
}