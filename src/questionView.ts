import Konva from 'konva';
import { loadFont } from './src/fonts';
import GameModel from './src/model';
import Question from './src/question';


const primary_color = '#4A5A9A';
const secondary_color = '#C2CAE9';
const button_color = '#92A1DF';


//Will define the QuestionView class, very unfinished
export default class QuestionView{
	SILKSCREEN = 'Silkscreen';
	ROBOTO = 'Roboto';

    model: GameModel;
    stage_width: number;
    stage_height: number;
    background: Konva.Rect;
    main_card: Konva.Rect;
	question: Question;
	question_location: Konva.Text;
	question_text: Konva.Text;
	title: Konva.Text;
	score: Konva.Text;
	score_number: number;
	answer_header: Konva.Text;
	answer_bubble: Konva.Rect;
	submit_button_shape: Konva.Rect;
	submit_button_text: Konva.Text;
	submit_button: Konva.Group;
	hint_button_shape: Konva.Rect;
	hint_button_text: Konva.Text;
	hint_button: Konva.Group;
	reveal_button_shape: Konva.Rect;
	reveal_button_text: Konva.Text;
	reveal_button: Konva.Group;
    page: Konva.Group;


    constructor(stage_width: number, stage_height: number, model: GameModel, question: Question, score: number) {
        this.stage_width = stage_width;
        this.stage_height = stage_height;
        this.model = model;
		this.question = question;
		this.score_number = score;

        this.background = new Konva.Rect({
            x: 0,
            y: 0,
            width: stage_width,
            height: stage_height,
            fill: primary_color,
        });

		this.main_card = new Konva.Rect ({
		x: stage_width*0.025,
		y: stage_height*0.05,
		width: stage_width*0.95,
		height: stage_height*0.9,
		cornerRadius: 25,
		fill: secondary_color,
		});

		this.title = new Konva.Text ({
		x: stage_width*0.06,
		y: stage_height*0.1,
		text: `Question ${this.question.getQuestionNumber()} of 10`,
		fontFamily: 'Silkscreen',
		fontSize: stage_height*0.035,
		align: 'center',
		verticalAlign: 'center',
		fill: 'Black',
		});

		this.score = new Konva.Text ({
			x: stage_width*0.8,
			y: stage_height*0.1,
			text: `Score ${this.score_number}%`,
			fontFamily: 'Silkscreen',
			fontSize: stage_height*0.035,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.question_location = new Konva.Text ({
			x: stage_width*0.06,
			y: stage_height*0.275,
			text: `${this.question.location}`,
			fontFamily: this.ROBOTO,
			fontSize: stage_height*0.035,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.question_text = new Konva.Text ({
			x: stage_width*0.06,
			y: stage_height*0.35,
			text: `${this.question.getQuestion()}`,
			fontFamily: this.ROBOTO,
			fontSize: stage_height*0.05,
			width: stage_width*0.9,
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.answer_header = new Konva.Text ({
			x: stage_width*0.06,
			y: stage_height*0.5,
			text: `Type answer below`,
			fontFamily: this.ROBOTO,
			fontSize: stage_height*0.035,
			width: stage_width*0.9,
			verticalAlign: 'center',
			fill: 'Black',
		});
	
		this.answer_bubble = new Konva.Rect ({
			x: stage_width*0.06,
			y: stage_height*0.575,
			width: stage_width*0.37,
			height: stage_height*0.1,
			cornerRadius: 25,
			fill: 'White',
		});

		this.submit_button_shape = new Konva.Rect({
			x: stage_width*0.375,
			y: stage_height*0.83,
			width: stage_width*0.25,
			height: stage_height*0.09,
			cornerRadius: 25,
			fill: button_color,
		});

		this.submit_button_text = new Konva.Text({
			x: stage_width*0.05,
			y: stage_height*0.835,
			text: 'Submit',
			fontFamily: this.SILKSCREEN,
			width: stage_width*0.9,
			fontSize: stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.submit_button = new Konva.Group();
		this.submit_button.add(this.submit_button_shape);
		this.submit_button.add(this.submit_button_text);

		this.hint_button_shape = new Konva.Rect({
			x: stage_width*0.785,
			y: stage_height*0.8325,
			width: stage_width*0.15,
			height: stage_height*0.085,
			cornerRadius: 25,
			fill: button_color,
		});

		this.hint_button_text = new Konva.Text({
			x: stage_width*0.76,
			y: stage_height*0.84,
			text: 'Hint',
			fontFamily: this.SILKSCREEN,
			width: stage_width*0.2,
			fontSize: stage_height*0.06,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
	
		this.hint_button = new Konva.Group();
		this.hint_button.add(this.hint_button_shape);
		this.hint_button.add(this.hint_button_text);

		this.reveal_button_shape = new Konva.Rect({
			x: stage_width*0.785,
			y: stage_height*0.8325,
			width: stage_width*0.15,
			height: stage_height*0.085,
			cornerRadius: 25,
			fill: button_color,
		});

		this.reveal_button_text = new Konva.Text({
			x: stage_width*0.76,
			y: stage_height*0.84,
			text: 'Reveal',
			fontFamily: this.SILKSCREEN,
			width: stage_width*0.2,
			fontSize: stage_height*0.06,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
		
		loadFont(this.SILKSCREEN, 'normal', '400').then(() => {
  		this.title.fontFamily(this.SILKSCREEN);
		});
		loadFont(this.ROBOTO, 'normal', '400').then(() => {
  		this.question_text.fontFamily(this.ROBOTO);
		});

		this.reveal_button = new Konva.Group();
		this.reveal_button.add(this.reveal_button_shape);
		this.reveal_button.add(this.reveal_button_text);

		this.page = new Konva.Group();
		this.page.add(this.background);
		this.page.add(this.main_card);
		this.page.add(this.title);
		this.page.add(this.score);
		this.page.add(this.question_location);
		this.page.add(this.question_text);
		this.page.add(this.answer_bubble);
		this.page.add(this.answer_header);
		this.page.add(this.submit_button);
		this.page.add(this.hint_button);

	}

	getPage(){
		return this.page;
	}

}