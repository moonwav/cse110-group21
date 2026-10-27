import Konva from 'konva';
import { loadFont } from './fonts';
import { View } from './types';

//Main color palatte of the game
const primary_color = '#4A5A9A';
const secondary_color = '#C2CAE9';
const button_color = '#92A1DF';

//Defines the MinigameView class
export default class MinigameView implements View{

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