import Konva from 'konva';
//import { loadFont } from './fonts';
import GameModel from '../logic/model';
import Question from '../logic/question';
import { View } from '../types';


//Will define the QuestionView class, very unfinished
export default class QuestionView implements View{
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
    group: Konva.Group;


    constructor(model: GameModel, question: Question, score: number, 
				onSubmitClick: () => void, onHintClick: () => void, 
				onRevealClick: () => void, stage_width: number, stage_height: number) {
        this.model = model;
		this.question = question;
		this.score_number = score;
		this.stage_width = stage_width;
		this.stage_height = stage_height;


        this.background = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.stage_width,
            height: this.stage_height,
            fill: PRIMARY_COLOR,
        });

		this.main_card = new Konva.Rect ({
			x: this.stage_width*0.025,
			y: this.stage_height*0.05,
			width: this.stage_width*0.95,
			height: this.stage_height*0.9,
			cornerRadius: 25,
			fill: SECONDARY_COLOR,
		});

		this.title = new Konva.Text ({
			x: this.stage_width*0.06,
			y: this.stage_height*0.1,
			text: `Question ${this.question.getQuestionNumber()} of 10`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.score = new Konva.Text ({
			x: this.stage_width*0.8,
			y: this.stage_height*0.1,
			text: `Score ${this.score_number}%`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.question_location = new Konva.Text ({
			x: this.stage_width*0.06,
			y: this.stage_height*0.275,
			text: `${this.question.location}`,
			fontFamily: this.ROBOTO,
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.question_text = new Konva.Text ({
			x: this.stage_width*0.06,
			y: this.stage_height*0.35,
			text: `${this.question.getQuestion()}`,
			fontFamily: this.ROBOTO,
			fontSize: this.stage_height*0.05,
			width: this.stage_width*0.9,
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.answer_header = new Konva.Text ({
			x: this.stage_width*0.06,
			y: this.stage_height*0.5,
			text: `Type answer below`,
			fontFamily: this.ROBOTO,
			fontSize: this.stage_height*0.035,
			width: this.stage_width*0.9,
			verticalAlign: 'center',
			fill: 'Black',
		});
	
		this.answer_bubble = new Konva.Rect ({
			x: this.stage_width*0.06,
			y: this.stage_height*0.575,
			width: this.stage_width*0.37,
			height: this.stage_height*0.1,
			cornerRadius: 25,
			fill: 'White',
		});

		this.submit_button_shape = new Konva.Rect({
			x: this.stage_width*0.375,
			y: this.stage_height*0.83,
			width: this.stage_width*0.25,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.submit_button_text = new Konva.Text({
			x: this.stage_width*0.05,
			y: this.stage_height*0.835,
			text: 'Submit',
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.9,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.submit_button = new Konva.Group();
		this.submit_button.add(this.submit_button_shape);
		this.submit_button.add(this.submit_button_text);
		this.submit_button.on('click', onSubmitClick);

		this.hint_button_shape = new Konva.Rect({
			x: this.stage_width*0.785,
			y: this.stage_height*0.8325,
			width: this.stage_width*0.15,
			height: this.stage_height*0.085,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.hint_button_text = new Konva.Text({
			x: this.stage_width*0.76,
			y: this.stage_height*0.84,
			text: 'Hint',
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.2,
			fontSize: this.stage_height*0.06,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
	
		this.hint_button = new Konva.Group();
		this.hint_button.add(this.hint_button_shape);
		this.hint_button.add(this.hint_button_text);
		this.hint_button.on('click', onHintClick);

		this.reveal_button_shape = new Konva.Rect({
			x: this.stage_width*0.785,
			y: this.stage_height*0.8325,
			width: this.stage_width*0.15,
			height: this.stage_height*0.085,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.reveal_button_text = new Konva.Text({
			x: this.stage_width*0.76,
			y: this.stage_height*0.84,
			text: 'Reveal',
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.2,
			fontSize: this.stage_height*0.06,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
		/*
		loadFont(this.SILKSCREEN, 'normal', '400').then(() => {
  		this.title.fontFamily(this.SILKSCREEN);
		});
		loadFont(this.ROBOTO, 'normal', '400').then(() => {
  		this.question_text.fontFamily(this.ROBOTO);
		});
		*/

		this.loadFonts(); 
		this.reveal_button = new Konva.Group();
		this.reveal_button.add(this.reveal_button_shape);
		this.reveal_button.add(this.reveal_button_text);
		this.reveal_button.on('click', onRevealClick);

		this.group = new Konva.Group();
		this.group.add(this.background);
		this.group.add(this.main_card);
		this.group.add(this.title);
		this.group.add(this.score);
		this.group.add(this.question_location);
		this.group.add(this.question_text);
		this.group.add(this.answer_bubble);
		this.group.add(this.answer_header);
		this.group.add(this.submit_button);
		this.group.add(this.hint_button);

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

	getGroup(){
		return this.group;
	}

	showHint() {
		//code to show hint and add reveal button
	}

	hide() {
		this.group.visible(false);
	}

	show() {
		this.group.visible(true);
	}

}