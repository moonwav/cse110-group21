import Konva from 'konva';
import { View } from '../../types';
import { PRIMARY_COLOR, BUTTON_COLOR, loadFonts } from '../../constants';
import GameModel from '../../model/GameModel';


//Defines the MainMenuView class
export default class EnterNameView implements View {
    
    SILKSCREEN = 'Silkscreen';

    model: GameModel;
    stage_width: number;
    stage_height: number;

    background_blur: Konva.Rect;
    name_card: Konva.Rect;
    name_entry_text: Konva.Text;
    name_box: Konva.Rect;

    confirm_button_shape: Konva.Rect;
    confirm_button_text: Konva.Text;
    confirm_button: Konva.Group;

    ready_button: Konva.Group | null = null;

    welcome_msg: Konva.Text | null = null;
    invalid_msg: Konva.Text;

    name_input: HTMLInputElement;
    
    back_button_shape: Konva.Rect;
    back_button_text: Konva.Text;
    back_button: Konva.Group;

    group: Konva.Group;

    constructor(model: GameModel, stage_width: number, stage_height: number,
                onConfirmClick: (nameText: string) => void,
                onBackClick: () => void) {
        this.stage_width = stage_width;
        this.stage_height = stage_height;
        this.model = model;
                    
        this.name_card = new Konva.Rect({
            x: this.stage_width*0.15,
            y: this.stage_height*0.20,
            width: this.stage_width*0.7,
            height: this.stage_height*0.63,
            cornerRadius: 25,
            fill: PRIMARY_COLOR,
        });
                
        this.background_blur = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.stage_width,
            height: this.stage_height,
            fill: 'black',
            opacity: 0.5,
        });
                
        this.name_entry_text = new Konva.Text({
            x: this.stage_width*0.2,
            y: this.stage_height*0.25,
            text: 'Enter a username for leaderboard below',
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.6,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });
                
        this.name_box = new Konva.Rect({
            x: this.stage_width*0.315,
            y: this.stage_height*0.43,
            width: this.stage_width*0.37,
            height: this.stage_height*0.1,
            cornerRadius: 25,
            fill: 'White',
        });
        
        this.name_input = document.createElement('input');
        this.name_input.className = "input-field";
        this.name_input.placeholder = 'type name here';
		this.name_input.autocomplete = "off";
		this.name_input.setAttribute("aria-label", "Your username");
		this.placeNameInput();
		document.getElementById("container")?.append(this.name_input);

        this.confirm_button_shape = new Konva.Rect({
            x: this.stage_width*0.375,
            y: this.stage_height*0.68,
            width: this.stage_width*0.25,
            height: this.stage_height*0.09,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });

        this.confirm_button_text = new Konva.Text({
            x: this.stage_width*0.05,
            y: this.stage_height*0.685,
            text: 'Confirm',
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.9,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
            listening: false,
        });

        this.confirm_button = new Konva.Group();
        this.confirm_button.add(this.confirm_button_shape);
        this.confirm_button.add(this.confirm_button_text);
        this.confirm_button.on('click', () => onConfirmClick(this.name_input.value));
        this.confirm_button.on('mouseover', () => {
            document.body.style.cursor = 'pointer';
        });
        this.confirm_button.on('mouseout', () => {
            document.body.style.cursor = 'default';
        });

        this.invalid_msg = new Konva.Text({
            x: this.stage_width*0.2,
            y: this.stage_height*0.57,
            text: 'Please enter a valid username',
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.6,
            fontSize: this.stage_height*0.05,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });

         this.back_button_shape = new Konva.Rect({
            x: this.stage_width*0.985 - this.stage_height*0.07,
            y: this.stage_width*0.015,
            width: this.stage_height*0.07,
            height: this.stage_height*0.07,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        })
        
        this.back_button_text = new Konva.Text({
            x: this.back_button_shape.x(),
            y: this.back_button_shape.y(),
            text: 'X',
            width: this.stage_height*0.07,
            fontFamily: this.SILKSCREEN,
            fontSize: this.stage_height*0.06,
            align: 'center',
            verticalAlign: 'middle',
            fill: 'Black',
        });

        this.back_button =  new Konva.Group();
        this.back_button.add(this.back_button_shape);
        this.back_button.add(this.back_button_text);
        
        this.back_button.on('click', () => onBackClick());
        this.back_button.on('mouseover', () => {
            document.body.style.cursor = 'pointer';
        });
        this.back_button.on('mouseout', () => {
            document.body.style.cursor = 'default';
        });
            
        this.group = new Konva.Group();
        this.group.add(this.background_blur);
        this.group.add(this.name_card);
        this.group.add(this.name_box);
        this.group.add(this.name_entry_text);
        this.group.add(this.confirm_button);
        this.group.add(this.back_button);
    }

    placeNameInput() {
        const box = this.name_box;
		this.name_input.style.left = `${box.x() + 24}px`;
		this.name_input.style.top = `${box.y() + box.height() / 2 - 20}px`;
		this.name_input.style.width = `${box.width() - 48}px`;
		this.name_input.style.height = "40px";
		this.name_input.style.fontSize = "32px";
    }

    showInvalid(){
        this.group.add(this.invalid_msg);
        this.group.getLayer()?.draw();
    }

    displayWelcomeMessage(onReadyClick: () => void){
        this.name_entry_text.remove();
        this.name_box.remove();
        this.invalid_msg.remove();
        this.confirm_button.remove();
        this.name_input.style.display = 'none';

        this.welcome_msg = new Konva.Text({
            x: this.stage_width*0.2,
            y: this.stage_height*0.3,
            text: `Hello ${this.model.getPlayer()}!\nWelcome to Percentage City!`,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.6,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'white',
        });

        const ready_button_shape = new Konva.Rect({
            x: this.stage_width*0.3,
            y: this.stage_height*0.62,
            width: this.stage_width*0.4,
            height: this.stage_height*0.09,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });
        
        const ready_button_text = new Konva.Text({
            x: this.stage_width*0.3,
            y: this.stage_height*0.625,
            text: "ready?",
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.4,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
            listening: false,
        });
        
        this.ready_button = new Konva.Group();
    
        this.ready_button.add(ready_button_shape);
        this.ready_button.add(ready_button_text);
        this.ready_button.on('click', onReadyClick);
        this.ready_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.ready_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

        this.group.add(this.welcome_msg);
        this.group.add(this.ready_button);

        this.group.getLayer()?.draw();
    }

    // puts the screen back to it's "enter a name" state
    reset() {
        // remove the welcome screen for replays
        this.welcome_msg?.destroy();
        this.ready_button?.destroy();
        this.welcome_msg = null;
        this.ready_button = null;

        this.invalid_msg.remove();

        this.group.add(this.name_box);
        this.group.add(this.name_entry_text);
        this.group.add(this.confirm_button);

        this.name_input.value = '';

        this.group.getLayer()?.draw();
    }


    getGroup() : Konva.Group {
        return this.group;
    }

    show() {
        this.group.visible(true);
        this.name_input.style.display = 'block';
        this.name_input.focus();
        this.group.getLayer()?.draw();
    }
    
    hide() {
        document.body.style.cursor = 'default';
        this.group.visible(false);
        this.name_input.style.display = 'none';
        this.group.getLayer()?.draw();
    }


}