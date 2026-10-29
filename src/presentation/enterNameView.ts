import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, 
        BUTTON_COLOR, loadFonts } from './viewConstants';
import GameModel from '../logic/model';


//Defines the MainMenuView class
export default class EnterNameView implements View {

    NO_NAME = 'No name entered';
    
    SILKSCREEN = 'Silkscreen';

    model: GameModel;
    stage_width: number;
    stage_height: number;

    background_blur: Konva.Rect;
    name_card: Konva.Rect;
    name_entry_text: Konva.Text;
    name_box: Konva.Rect;

    input: HTMLInputElement;

    group: Konva.Group;

    constructor(model: GameModel, stage_width: number, 
                stage_height: number) {

        this.stage_width = stage_width;
        this.stage_height = stage_height;
        this.model = model;

        this.name_card = new Konva.Rect({
            x: this.stage_width*0.15,
            y: this.stage_height*0.27,
            width: this.stage_width*0.7,
            height: this.stage_height*0.58,
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
            y: this.stage_height*0.32,
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
            y: this.stage_height*0.575,
            width: this.stage_width*0.37,
            height: this.stage_height*0.1,
            cornerRadius: 25,
            fill: 'White',
        });
        
        this.input = document.createElement('input');
        document.body.appendChild(this.input);

        loadFonts();
        this.group = new Konva.Group();
        this.group.add(this.background_blur);
        this.group.add(this.name_card);
        this.group.add(this.name_box);
        this.group.add(this.name_entry_text);
    }

    waitForUsername(element: HTMLInputElement): Promise<string> {
        return new Promise((resolve) => {
            element.addEventListener("keydown", function handler(e: KeyboardEvent) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    element.removeEventListener("keydown", handler);
                    document.body.removeChild(element);
                    resolve(element.value);
                }
            });
        });
    }

    async getUsername(): Promise<string> {
        const areaPosition = {
            x: this.stage_width*0.33,
            y: this.stage_height*0.6
        };

        this.input.placeholder = 'type name here';
        this.input.autocomplete = 'off';
        this.input.style.position = 'absolute';
        this.input.style.top = areaPosition.y + 'px';
        this.input.style.left = areaPosition.x + 'px';
    
        this.input.focus();
        
        return await this.waitForUsername(this.input);
    }

    async displayWelcomeMessage(onReady: () => void){
        this.name_entry_text.remove();
        this.name_box.remove();
        const welcome_message = new Konva.Text({
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
        const ready_instructions = new Konva.Text({
            x: this.stage_width*0.2,
            y: this.stage_height*0.75,
            text: `Press any key to begin`,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.6,
            fontSize: this.stage_height*0.05,
            align: 'center',
            verticalAlign: 'center',
            fill: 'white',
        });
        this.group.add(welcome_message);
        this.group.add(ready_instructions);
        this.group.getLayer()?.draw();
        const stage = this.group.getStage();
        if (stage != null) {
            stage.container().tabIndex = 1;
            stage.container().focus();
            stage.container().addEventListener('keydown', (e) => {
                onReady();
            });
        };
    }


    getGroup() : Konva.Group {
        return this.group;
    }

    show() {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }
    
    hide() {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }


}