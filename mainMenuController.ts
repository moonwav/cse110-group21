import MainMenuView from './mainMenuView';
import GameModel from './model';

//will define the MainMenuController
export default class MainMenuController{
    model: GameModel;
    view: MainMenuView;

    constructor (model: GameModel, view: MainMenuView) {
        this.model = model;
        this.view =  view;
    }

    instructions() {
        this.view.instructionView();
    }


}