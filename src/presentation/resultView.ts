import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from './viewConstants';


//Defines the MainMenuView class
export default class ResultsView implements View{

	SILKSCREEN = 'Silkscreen';

    STAGE_WIDTH = 1000;
	STAGE_HEIGHT = 900;


	group: Konva.Group;


	constructor() {
        this.group = new Konva.Group();
	}	

	getGroup() : Konva.Group {
		return this.group;
	}
	
	hide() {
		this.group.visible(false);
	}

    show() {
        this.group.visible(true);
    }
}