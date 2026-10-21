import Konva from 'konva';



const primary_color = '#4A5A9A';
const secondary_color = '#C2CAE9';
const button_color = '#92A1DF';


export default class NameEntryView {
    SILKSCREEN = 'Silkscreen';
    
    stage_width: number;
    stage_height: number;
    
    background_blur: Konva.Rect;
    name_card: Konva.Rect;
    name_entry_text: Konva.Text;
    name_box: Konva.Rect;

    page: Konva.Group;

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
            opacity: 0.75,
        });
        
        this.name_entry_text = new Konva.Text({
            x: stage_width*0.2,
            y: stage_height*0.32,
            text: 'Enter a username for leaderboard below',
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

        this.page = new Konva.Group();
        this.page.add(this.background_blur);
        this.page.add(this.name_card);
        this.page.add(this.name_box);
        this.page.add(this.name_entry_text);
    }

    getPage() {
        return this.page;
    }

    addTextBox(stage_width: number, stage_height: number, stage: Konva.Stage){
        var text_overlay = new Konva.Layer();
        stage.add(text_overlay);

        var textNode = new Konva.Text({
            text: 'Some text here',
            fontSize: 20,
            x: stage_width*0.35,
            y: stage_height*0.6,
            width: stage_width*0.37,
            height: stage_height*0.1,
            fill: 'black',
        });

        text_overlay.add(textNode);
        text_overlay.draw();

        textNode.on('click', () => {
            // create textarea over canvas with absolute position

            // first we need to find its position
            var textPosition = textNode.getAbsolutePosition();    
            var stageBox = stage.container().getBoundingClientRect();

            var areaPosition = {
                x: textPosition.x + stageBox.left,
                y: textPosition.y + stageBox.top
            };

            // create textarea and style it
            var input = document.createElement('input');
            document.body.appendChild(input);

            input.type = 'text';
            input.value = textNode.text();
            input.style.position = 'absolute';
            input.style.top = areaPosition.y + 'px';
            input.style.left = areaPosition.x + 'px';
            input.style.width = textNode.width();
            input.style.height = textNode.height();
    
            input.focus();

            input.addEventListener('keydown', function (e) {
                // hide on enter
                if (e.key === 'Enter' && !e.shiftKey) {
                    textNode.text(input.value);
                    var name = textNode.text();
                    text_overlay.draw();
                    document.body.removeChild(input);
                }
            });
        });

        // add the layer to the stage
        stage.add(text_overlay);
    }
}



