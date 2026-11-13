import Konva from 'konva';
import { View } from '../../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR, loadFonts } from '../../constants';


//Defines the OptionsView class
export default class OptionsView implements View {
    TITLE = 'WELCOME TO PERCENTAGE CITY!\nWhat would you like to do first?';
   
    SILKSCREEN = 'Silkscreen';

    stage_width: number;
    stage_height: number;
    background: Konva.Rect;
    main_card: Konva.Rect;
    title: Konva.Text;

    choice_button_width: number;
    choice_button_height: number;

    choice1_button_shape: Konva.Rect;
    choice1_button_text: Konva.Text;
    choice1_button: Konva.Group;

    choice2_button_shape: Konva.Rect;
    choice2_button_text: Konva.Text;
    choice2_button: Konva.Group;

    choice3_button_shape: Konva.Rect;
    choice3_button_text: Konva.Text;
    choice3_button: Konva.Group;

    choice4_button_shape: Konva.Rect;
    choice4_button_text: Konva.Text;
    choice4_button: Konva.Group;


    group: Konva.Group;

    constructor(onChoice1Click: () => void, onChoice2Click: () => void, 
                onChoice3Click: () => void, onChoice4Click: () => void,
                stage_width: number, stage_height: number) {
        this.stage_width = stage_width;
        this.stage_height = stage_height;
        this.choice_button_width = this.stage_width*0.35;
        this.choice_button_height = this.stage_height*0.25;

        this.background = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.stage_width,
            height: this.stage_height,
            fill: PRIMARY_COLOR,
        });

        this.main_card = new Konva.Rect({
            x: this.stage_width*0.05,
            y: this.stage_height*0.22,
            width: this.stage_width*0.9,
            height: this.stage_height*0.7,
            cornerRadius: 25,
            fill: SECONDARY_COLOR,
        });

        this.title = new Konva.Text({
            x: this.stage_width*0.05,
            y: this.stage_height*0.05,
            text: this.TITLE,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.9,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'white',
        });

        this.choice1_button_shape = new Konva.Rect({
            x: this.stage_width*0.12,
            y: this.stage_height*0.29,
            width: this.choice_button_width,
            height: this.choice_button_height,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });

        this.choice1_button_text = new Konva.Text({
            x: this.choice1_button_shape.x(),
            y: this.choice1_button_shape.y() + this.choice1_button_shape.height()*0.22,
            text: "",
            listening: false,
            fontFamily: this.SILKSCREEN,
            width: this.choice1_button_shape.width(),
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });

        this.choice1_button = new Konva.Group();

        this.choice1_button.add(this.choice1_button_shape);
        this.choice1_button.add(this.choice1_button_text);
        this.choice1_button.on('click', onChoice1Click);
        this.choice1_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.choice1_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

        this.choice2_button_shape = new Konva.Rect({
            x: this.stage_width*0.53,
            y: this.stage_height*0.29,
            width: this.choice_button_width,
            height: this.choice_button_height,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });

        this.choice2_button_text = new Konva.Text({
            x: this.choice2_button_shape.x(),
            y: this.choice2_button_shape.y() + this.choice2_button_shape.height()*0.22,
            text: "",
            listening: false,
            fontFamily: this.SILKSCREEN,
            width: this.choice2_button_shape.width(),
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });

        this.choice2_button = new Konva.Group();

        this.choice2_button.add(this.choice2_button_shape);
        this.choice2_button.add(this.choice2_button_text);
        this.choice2_button.on('click', onChoice2Click);
        this.choice2_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.choice2_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

        this.choice3_button_shape = new Konva.Rect({
            x: this.stage_width*0.12,
            y: this.stage_height*0.6,
            width: this.choice_button_width,
            height: this.choice_button_height,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });

        this.choice3_button_text = new Konva.Text({
            x: this.choice3_button_shape.x(),
            y: this.choice3_button_shape.y() + this.choice3_button_shape.height()*0.22,
            text: "",
            listening: false,
            fontFamily: this.SILKSCREEN,
            width: this.choice3_button_shape.width(),
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });

        this.choice3_button = new Konva.Group();

        this.choice3_button.add(this.choice3_button_shape);
        this.choice3_button.add(this.choice3_button_text);
        this.choice3_button.on('click', onChoice3Click);
        this.choice3_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.choice3_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

        this.choice4_button_shape = new Konva.Rect({
            x: this.stage_width*0.53,
            y: this.stage_height*0.6,
            width: this.choice_button_width,
            height: this.choice_button_height,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });

        this.choice4_button_text = new Konva.Text({
            x: this.choice4_button_shape.x(),
            y: this.choice4_button_shape.y() + this.choice4_button_shape.height()*0.22,
            text: "",
            listening: false,
            fontFamily: this.SILKSCREEN,
            width: this.choice4_button_shape.width(),
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });

        this.choice4_button = new Konva.Group();

        this.choice4_button.add(this.choice4_button_shape);
        this.choice4_button.add(this.choice4_button_text);
        this.choice4_button.on('click', onChoice4Click);
        this.choice4_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.choice4_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

    
        loadFonts();
        this.group = new Konva.Group();
        this.group.add(this.background);
        this.group.add(this.title);
        this.group.add(this.main_card);
        this.group.add(this.choice1_button);
        this.group.add(this.choice2_button);
        this.group.add(this.choice3_button);
        this.group.add(this.choice4_button);
    }

    setTitle(stop: number, total: number) {
        if (stop === 1) {
            this.title.text(this.TITLE);
        } else {
            this.title.text("Where would you like to go next?")
        }
    }

    setChoices(labels: string[]) {
        const buttons = [this.choice1_button, this.choice2_button, 
                         this.choice3_button, this.choice4_button]
        const texts = [this.choice1_button_text, this.choice2_button_text,
                       this.choice3_button_text, this.choice4_button_text]
        buttons.forEach((button, i) => {
            if (i < labels.length) {
                button.visible(true);
            } else {
                button.visible(false);
            }
            texts[i].text(labels[i] ?? '')
        });
        this.group.getLayer()?.draw();
    }

    getGroup() : Konva.Group {
        return this.group;
    }
    
    show() {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }
    
    hide() {
        document.body.style.cursor = 'default';
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    
}
