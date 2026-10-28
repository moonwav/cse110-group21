import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from './viewConstants';


//Defines the AnswerView class
export default class AnswerView implements View{
    
    ANSWER_KEY = "Answer Key";
    BACK = "back";

    SILKSCREEN = 'Silkscreen';

    
    stage_width: number;
    stage_height: number;
    background: Konva.Rect;
    main_card: Konva.Rect;
    title: Konva.Text;
    back_button_shape: Konva.Rect;
    back_button_text: Konva.Text;
    back_button: Konva.Group;

    group: Konva.Group;


    constructor(onBackClick: () => void, stage_width: number, stage_height: number) {
        this.stage_width = stage_width;
        this.stage_height = stage_height;
        
        this.background = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.stage_width,
            height: this.stage_height,
            fill: PRIMARY_COLOR,
        });


        this.main_card = new Konva.Rect({
            x: this.stage_width*0.05,
            y: this.stage_height*0.17,
            width: this.stage_width*0.9,
            height: this.stage_height*0.78,
            cornerRadius: 25,
            fill: SECONDARY_COLOR,
        });

        this.title = new Konva.Text({
            x: this.stage_width*0.05,
            y: this.stage_height*0.05,
            text: this.ANSWER_KEY,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.9,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'white',
        });

        this.back_button_shape = new Konva.Rect({
            x: this.stage_width*0.315,
            y: this.stage_height*0.83,
            width: this.stage_width*0.37,
            height: this.stage_height*0.09,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });
    
        this.back_button_text = new Konva.Text({
            x: this.stage_width*0.315,
            y: this.stage_height*0.835,
            text: this.BACK,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.37,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });
        this.loadFonts();
        this.back_button = new Konva.Group();
        this.back_button.add(this.back_button_shape);
        this.back_button.add(this.back_button_text);
        this.back_button.on('click', onBackClick);

        this.group = new Konva.Group();
        this.group.add(this.background);
        this.group.add(this.title);
        this.group.add(this.main_card);
        this.group.add(this.back_button);
        this.hide();
    }	
 
    async loadFonts() {
        await document.fonts.ready;
        await Promise.all([
            document.fonts.load("700 48px Silkscreen"),
            document.fonts.load("400 36px Silkscreen"),
            document.fonts.load("400 40px Roboto"),
            document.fonts.load("400 36px Roboto"),
            document.fonts.load("400 24px Roboto"),
            document.fonts.load("400 22px Roboto"),
        ]);
    }


    getGroup() : Konva.Group {
        return this.group;
    }
    
    hide() {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    show() {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }
}