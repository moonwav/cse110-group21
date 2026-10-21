import Konva from 'konva';
import { loadFont } from './fonts';

const primary_color = '#4A5A9A';
const secondary_color = '#C2CAE9';
const button_color = '#92A1DF';
let question_number = 3;


//Will define the QuestionView class, very unfinished
export default class QuestionView{
    //model: GameModel;
    stage_width: number;
    stage_height: number;
    background: Konva.Rect;
    main_card: Konva.Rect;

    page: Konva.Group;


    constructor(stage_width: number, stage_height: number) {
        this.stage_width = stage_width;
        this.stage_height = stage_height;
        
        this.background = new Konva.Rect({
            x: 0,
            y: 0,
            width: stage_width,
            height: stage_height,
            fill: primary_color,
        });


const stage = new Konva.Stage({
	container: 'container',
	width: window.innerWidth,
	height: window.innerHeight
});

const main_layer = new Konva.Layer();


function main_menu(){
	main_layer.add(start_card);
	main_layer.add(title);
	main_layer.add(start_button);
	main_layer.add(info_button);
	main_layer.add(minigame_button_shape);
	main_layer.add(minigame_button_text);
}


const q_layer = new Konva.Layer();

function question(question: string, location: string, score: number) {
	const question_card = new Konva.Rect ({
		x: stage.width()*0.025,
		y: stage.height()*0.05,
		width: stage.width()*0.95,
		height: stage.height()*0.9,
		cornerRadius: 25,
		fill: secondary_color,
	});


	const question_title = new Konva.Text ({
		x: stage.width()*0.06,
		y: stage.height()*0.1,
		text: `Question ${question_number} of 10`,
		fontFamily: 'Silkscreen',
		fontSize: stage.height()*0.035,
		align: 'center',
		verticalAlign: 'center',
		fill: 'Black',
	});

	const question_score = new Konva.Text ({
		x: stage.width()*0.8,
		y: stage.height()*0.1,
		text: `Score ${score}%`,
		fontFamily: 'Silkscreen',
		fontSize: stage.height()*0.035,
		align: 'center',
		verticalAlign: 'center',
		fill: 'Black',
	});

	const question_location = new Konva.Text ({
		x: stage.width()*0.06,
		y: stage.height()*0.275,
		text: `${location}`,
		fontFamily: "Roboto",
		fontSize: stage.height()*0.035,
		align: 'center',
		verticalAlign: 'center',
		fill: 'Black',
	});

	const question_text = new Konva.Text ({
		x: stage.width()*0.06,
		y: stage.height()*0.35,
		text: `${question}`,
		fontFamily: "Roboto",
		fontSize: stage.height()*0.05,
		width: stage.width()*0.9,
		verticalAlign: 'center',
		fill: 'Black',
	});

	const answer_header = new Konva.Text ({
		x: stage.width()*0.06,
		y: stage.height()*0.5,
		text: `Type answer below`,
		fontFamily: "Roboto",
		fontSize: stage.height()*0.035,
		width: stage.width()*0.9,
		verticalAlign: 'center',
		fill: 'Black',
	});
	
	const answer_card = new Konva.Rect ({
		x: stage.width()*0.06,
		y: stage.height()*0.575,
		width: stage.width()*0.37,
		height: stage.height()*0.1,
		cornerRadius: 25,
		fill: 'White',
	});

	const submit_button_shape = new Konva.Rect({
		x: stage.width()*0.375,
		y: stage.height()*0.83,
		width: stage.width()*0.25,
		height: stage.height()*0.09,
		cornerRadius: 25,
		fill: button_color,
	});

	const submit_button_text = new Konva.Text({
		x: stage.width()*0.05,
		y: stage.height()*0.835,
		text: 'Submit',
		fontFamily: 'Silkscreen',
		width: stage.width()*0.9,
		fontSize: stage.height()*0.068,
		align: 'center',
		verticalAlign: 'center',
		fill: 'Black',
	});

	const submit_button = new Konva.Group();
	submit_button.add(submit_button_shape);
	submit_button.add(submit_button_text);

	const hint_button_shape = new Konva.Rect({
		x: stage.width()*0.785,
		y: stage.height()*0.8325,
		width: stage.width()*0.15,
		height: stage.height()*0.085,
		cornerRadius: 25,
		fill: button_color,
	});

	const hint_button_text = new Konva.Text({
		x: stage.width()*0.76,
		y: stage.height()*0.84,
		text: 'Hint',
		fontFamily: 'Silkscreen',
		width: stage.width()*0.2,
		fontSize: stage.height()*0.06,
		align: 'center',
		verticalAlign: 'center',
		fill: 'Black',
	});
	
	const hint_button = new Konva.Group();
	hint_button.add(hint_button_shape);
	hint_button.add(hint_button_text);

	q_layer.add(background);
	q_layer.add(question_card);
	q_layer.add(question_title);
	q_layer.add(question_score);
	q_layer.add(question_location);
	q_layer.add(question_text);
	q_layer.add(answer_header);
	q_layer.add(answer_card);
	q_layer.add(submit_button);
	q_layer.add(hint_button);
	stage.add(q_layer);


}

main_layer.add(background);
//main_menu();
question('You set aside $80 for souvenirs. You want to spend 25% of that on a gift. What is the most you can spend?', 'Souvenir Shop', 20);
stage.add(main_layer);

loadFont('Roboto', 'normal', '400').then(() => {
	start_text.fontFamily('Roboto');

});

loadFont('Silkscreen', 'normal', '400').then(() => {
  	this.start_button_text.fontFamily('Silkscreen');
});