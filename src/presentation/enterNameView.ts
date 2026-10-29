import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, 
        BUTTON_COLOR, loadFonts } from './viewConstants';


//Defines the MainMenuView class
export default class EnterNameView implements View {

    NO_NAME = 'No name entered';
    
    SILKSCREEN = 'Silkscreen';


    stage_width: number;
    stage_height: number;

    background_blur: Konva.Rect;
    name_card: Konva.Rect;
    name_entry_text: Konva.Text;
    name_box: Konva.Rect;

    input: HTMLInputElement;

    group: Konva.Group;

    constructor(stage_width: number, 
                stage_height: number) {

        this.stage_width = stage_width;
        this.stage_height = stage_height;

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

    waitForUsername(input: HTMLInputElement): Promise<string> {
        return new Promise((resolve) => {
            input.addEventListener("keydown", function handler(e: KeyboardEvent) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    input.removeEventListener("keydown", handler);
                    document.body.removeChild(input);
                    resolve(input.value);
                }
            });
        });
    }


    async showName(onEnterName: (name: string) => void) {
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
        
        const name = await this.waitForUsername(this.input);
        this.name_entry_text.remove();
        this.name_box.remove();
        const name_checker = new Konva.Text({
            x: this.stage_width*0.3,
            y: this.stage_height*0.5,
            text: `${name}`,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.6,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });
        this.group.add(name_checker);
        this.group.getLayer()?.draw();
        onEnterName(name);
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