import Konva from 'konva';
const primary_color = '#4A5A9A';
const secondary_color = '#C2CAE9';
const button_color = '#92A1DF';


export default class NameEntryView implements View{
    SILKSCREEN = 'Silkscreen';
    MESSAGE = 'Enter a username for leaderboard below';

    stage_width: number;
    stage_height: number;
    
    background_blur: Konva.Rect;
    name_card: Konva.Rect;
    name_entry_text: Konva.Text;
    name_box: Konva.Rect;
    text_node: Konva.Text;

    group: Konva.Group;

    constructor(stage_width: number, stage_height: number){
        this.stage_width = stage_width;
        this.stage_height = stage_height;
        
        this.name_card = new Konva.Rect({
            x: stage_width*0.15,
            y: stage_height*0.27,
            width: stage_width*0.7,
            height: stage_height*0.58,
            cornerRadius: 25,
            fill: primary_color,
            });
        
        this.background_blur = new Konva.Rect({
            x: 0,
            y: 0,
            width: stage_width,
            height: stage_height,
            fill: 'black',
            opacity: 0.5,
        });
        
        this.name_entry_text = new Konva.Text({
            x: stage_width*0.2,
            y: stage_height*0.32,
            text: this.MESSAGE,
            fontFamily: this.SILKSCREEN,
            width: stage_width*0.6,
            fontSize: stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });
        
        this.name_box = new Konva.Rect({
            x: stage_width*0.315,
            y: stage_height*0.575,
            width: stage_width*0.37,
            height: stage_height*0.1,
            cornerRadius: 25,
            fill: 'White',
        });
        
        this.text_node = new Konva.Text({
            text: 'type name here',
            fontSize: 20,
            fontFamily: 'Roboto',
            x: stage_width*0.35,
            y: stage_height*0.6,
            width: stage_width*0.37,
            height: stage_height*0.1,
            fill: 'black',
        });



        this.group = new Konva.Group();
        this.group.add(this.background_blur);
        this.group.add(this.name_card);
        this.group.add(this.name_box);
        this.group.add(this.name_entry_text);
        this.group.add(this.text_node);
    }

    getGroup() {
        return this.group;
    }

    getTextNode() {
        return this.text_node;
    }

    

    show(){
        this.group.visible(true);
    }

    hide() {
        this.group.visible(false);
    }

}



