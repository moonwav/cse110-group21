import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from './viewConstants';
import GameModel from '../logic/model';

//Defines the MinigameView class
export default class MinigameView implements View{

    SILKSCREEN = 'Silkscreen';
    ROBOTO = 'Roboto';

    model: GameModel;
    stage_width: number;
    stage_height: number;

    background: Konva.Rect;
    main_card: Konva.Rect;

    a_header: Konva.Rect;
    a_header_text: Konva.Text;
    
    b_header: Konva.Rect;
    b_header_text: Konva.Text;

    a_card_1_shape: Konva.Rect;
    a_card_1_text: Konva.Text;
    a_card_1: Konva.Group;

    b_card_1_shape: Konva.Rect;
    b_card_1_text:Konva.Text;
    b_card_1: Konva.Group;

    a_card_2_shape: Konva.Rect;
    a_card_2_text: Konva.Text;
    a_card_2: Konva.Group;

    b_card_2_shape: Konva.Rect;
    b_card_2_text:Konva.Text;
    b_card_2: Konva.Group;

    a_card_3_shape: Konva.Rect;
    a_card_3_text: Konva.Text;
    a_card_3: Konva.Group;

    b_card_3_shape: Konva.Rect;
    b_card_3_text:Konva.Text;
    b_card_3: Konva.Group;

    a_card_4_shape: Konva.Rect;
    a_card_4_text: Konva.Text;
    a_card_4: Konva.Group;

    b_card_4_shape: Konva.Rect;
    b_card_4_text:Konva.Text;
    b_card_4: Konva.Group;

    a_card_5_shape: Konva.Rect;
    a_card_5_text: Konva.Text;
    a_card_5: Konva.Group;

    b_card_5_shape: Konva.Rect;
    b_card_5_text:Konva.Text;
    b_card_5: Konva.Group;

    submit_button_shape: Konva.Rect;
    submit_button_text: Konva.Text;
    submit_button: Konva.Group;

    group: Konva.Group;


    constructor(model: GameModel, stage_width: number, stage_height: number) {
        this.model = model;
        this.stage_height = stage_height;
        this.stage_width = stage_width;

        this.background = new Konva.Rect({
            x: 0,           
            y: 0,
            width: this.stage_width,
            height: this.stage_height,
            fill: PRIMARY_COLOR,
        });
        
        const card_padding_side = this.stage_width*0.025;
        const card_padding_top = this.stage_height*0.02;

        this.main_card = new Konva.Rect ({
            x: card_padding_side,
            y: this.stage_height*0.05,
            width: this.stage_width-(2*card_padding_side),
            height: this.stage_height*0.9,
            cornerRadius: 25,
            fill: SECONDARY_COLOR,
        });
        
        const header_width = this.stage_width*0.28;
        const header_height = this.stage_height*0.086;
        const card_width = (this.main_card.width() - 3*card_padding_side)/2;
        const card_height = header_height;

        this.a_header = new Konva.Rect({
            x: (card_width-header_width)/2 + 2*card_padding_side,
            y: this.main_card.y()+ this.stage_height*0.15,
            align: 'center',
            width:  header_width,
            height: header_height,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });

        this.b_header = new Konva.Rect({
            x: this.stage_width - ((card_width-header_width)/2 + 2*card_padding_side + header_width),
            y: this.main_card.y()+ this.stage_height*0.15,
            width:  header_width,
            height: header_height,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });

        this.a_card_1_shape = new Konva.Rect({
            x: 2*card_padding_side,
            y: this.a_header.y()+ header_height + card_padding_top,
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });
        
        this.a_card_1_text = new Konva.Text({
            x: this.a_card_1_shape.x(),
            y: this.a_card_1_shape.y(),
			width: card_width,
            height: card_height,
            text: `Needs a question`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',

        });

        this.a_card_1 = new Konva.Group();
        this.a_card_1.add(this.a_card_1_shape);
        this.a_card_1.add(this.a_card_1_text);

        this.b_card_1_shape = new Konva.Rect({
            x: this.a_card_1_shape.width() + 3*card_padding_side,
            y: this.a_card_1_shape.y(),
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });

        this.b_card_1_text = new Konva.Text({
            x: this.b_card_1_shape.x(),
            y: this.b_card_1_shape.y(),
			width: card_width,
            height: card_height,
            text: `Needs an answer`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
        });

        this.b_card_1 = new Konva.Group();
        this.b_card_1.add(this.b_card_1_shape);
        this.b_card_1.add(this.b_card_1_text);

        this.a_card_2_shape = new Konva.Rect({
            x: this.a_card_1_shape.x(),
            y: this.a_card_1_shape.y()+ card_height + card_padding_top,
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });

        this.a_card_2_text = new Konva.Text({
            x: this.a_card_2_shape.x(),
            y: this.a_card_2_shape.y(),
			width: card_width,
            height: card_height,
            text: `Needs a question`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
        });

        this.a_card_2 = new Konva.Group();
        this.a_card_2.add(this.a_card_2_shape);
        this.a_card_2.add(this.a_card_2_text);

        this.b_card_2_shape = new Konva.Rect({
            x: this.b_card_1_shape.x(),
            y: this.a_card_2_shape.y(),
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });

        this.b_card_2_text = new Konva.Text({
            x: this.b_card_2_shape.x(),
            y: this.b_card_2_shape.y(),
			width: card_width,
            height: card_height,
            text: `Needs an answer`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
        });

        this.b_card_2 = new Konva.Group();
        this.b_card_2.add(this.b_card_2_shape);
        this.b_card_2.add(this.b_card_2_text);

        this.a_card_3_shape = new Konva.Rect({
            x: this.a_card_1_shape.x(),
            y: this.a_card_2_shape.y()+ card_height + card_padding_top,
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });

        this.a_card_3_text = new Konva.Text({
            x: this.a_card_3_shape.x(),
            y: this.a_card_3_shape.y(),
			width: card_width,
            height: card_height,
            text: `Needs a question`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
        });

        this.a_card_3 = new Konva.Group();
        this.a_card_3.add(this.a_card_3_shape);
        this.a_card_3.add(this.a_card_3_text);

        this.b_card_3_shape = new Konva.Rect({
            x: this.b_card_1_shape.x(),
            y: this.a_card_3_shape.y(),
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });

        this.b_card_3_text = new Konva.Text({
            x: this.b_card_3_shape.x(),
            y: this.b_card_3_shape.y(),
			width: card_width,
            height: card_height,
            text: `Needs an answer`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
        });

        this.b_card_3 = new Konva.Group();
        this.b_card_3.add(this.b_card_3_shape);
        this.b_card_3.add(this.b_card_3_text);

        this.a_card_4_shape = new Konva.Rect({
            x: this.a_card_1_shape.x(),
            y: this.a_card_3_shape.y() + card_height + card_padding_top,
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });

        this.a_card_4_text = new Konva.Text({
            x: this.a_card_4_shape.x(),
            y: this.a_card_4_shape.y(),
			width: card_width,
            height: card_height,
            text: `Needs a question`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
        });

        this.a_card_4 = new Konva.Group();
        this.a_card_4.add(this.a_card_4_shape);
        this.a_card_4.add(this.a_card_4_text);

        this.b_card_4_shape = new Konva.Rect({
            x: this.b_card_1_shape.x(),
            y: this.a_card_4_shape.y(),
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });

        this.b_card_4_text = new Konva.Text({
            x: this.b_card_4_shape.x(),
            y: this.b_card_4_shape.y(),
			width: card_width,
            height: card_height,
            text: `Needs an answer`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
        });

        this.b_card_4 = new Konva.Group();
        this.b_card_4.add(this.b_card_4_shape);
        this.b_card_4.add(this.b_card_4_text);

        this.a_card_5_shape = new Konva.Rect({
            x: this.a_card_1_shape.x(),
            y: this.a_card_4_shape.y() + card_height + card_padding_top,
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });

        this.a_card_5_text = new Konva.Text({
            x: this.a_card_5_shape.x(),
            y: this.a_card_5_shape.y(),
			width: card_width,
            height: card_height,
            text: `Needs a question`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
        });

        this.a_card_5 = new Konva.Group();
        this.a_card_5.add(this.a_card_5_shape);
        this.a_card_5.add(this.a_card_5_text);

        this.b_card_5_shape = new Konva.Rect({
            x: this.b_card_1_shape.x(),
            y: this.a_card_5_shape.y(),
            width: card_width,
            height: card_height,
            cornerRadius: 25,
            fill: 'white',
        });

        this.b_card_5 = new Konva.Group();
        this.b_card_5.add(this.b_card_5_shape);

        this.submit_button_shape = new Konva.Rect({
            x: this.stage_width/2,
            y: this.a_card_5_shape.y() + card_height + card_padding_top,
            width: header_width,
            height: card_height,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
            offsetX: header_width/2,
        });

        this.submit_button = new Konva.Group();
        this.submit_button.add(this.submit_button_shape)

        this.group = new Konva.Group();
        this.group.add(this.background);
        this.group.add(this.main_card);
        this.group.add(this.a_header);
        this.group.add(this.b_header);
        this.group.add(this.a_card_1);
        this.group.add(this.b_card_1);
        this.group.add(this.a_card_2);
        this.group.add(this.b_card_2);
        this.group.add(this.a_card_3);
        this.group.add(this.b_card_3);
        this.group.add(this.a_card_4);
        this.group.add(this.b_card_4);
        this.group.add(this.a_card_5);
        this.group.add(this.b_card_5);
        this.group.add(this.submit_button);

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