import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from './viewConstants';


//Defines the resultView class
export default class ResultView implements View{

	TITLE = "How was vacation?";
	ANSWER_KEY = "Answer Key";
	LEADERBOARD = "Leaderboard";
	PLAY_AGAIN = "Play Again";

	SILKSCREEN = 'Silkscreen';
	ROBOTO = 'Roboto';
	
	stage_width: number;
	stage_height: number;
	background: Konva.Rect;
	main_card: Konva.Rect;
	title: Konva.Text;

	grade_shape: Konva.Rect;
	grade_text: Konva.Text;
	grade_display: Konva.Group;

	result_text_1: Konva.Text;
	result_text_2: Konva.Text;
	result_text_3: Konva.Text;

	percent_shape: Konva.Rect;
	percent_text: Konva.Text;
	percent_data: Konva.Text;
	percent_display: Konva.Group;

	wrong_shape: Konva.Rect;
	wrong_text: Konva.Text;
	wrong_data: Konva.Text;
	wrong_display: Konva.Group;

	hints_shape: Konva.Rect;
	hints_text: Konva.Text;
	hints_data: Konva.Text;
	hints_display: Konva.Group;

	answer_button_shape: Konva.Rect;
	answer_button_text: Konva.Text;
	answer_button: Konva.Group;

	leaderboard_button_shape: Konva.Rect;
	leaderboard_button_text: Konva.Text;
	leaderboard_button: Konva.Group;

	again_button_shape: Konva.Rect;
	again_button_text: Konva.Text;
	again_button: Konva.Group;

	group: Konva.Group;


	constructor(onAnswerKeyClick: () => void,
                onLeaderboardClick: () => void,
                onPlayAgainClick: () => void,
				stage_width: number, stage_height: number) {
		this.stage_width = stage_width;
		this.stage_height = stage_height;

		this.background = new Konva.Rect({
			x: 0,
			y: 0,
			width: this.stage_width,
			height: this.stage_height,
			fill: PRIMARY_COLOR,
		});

		this.main_card = new Konva.Rect({
			x: this.stage_width*0.05,
			y: this.stage_height*0.17,
			width: this.stage_width*0.9,
			height: this.stage_height*0.78,
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

		this.grade_shape = new Konva.Rect({
			x: this.stage_width*0.15,
			y: this.stage_height*0.25,
			width: this.stage_width*0.12,
			height: this.stage_height*0.2,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.grade_text = new Konva.Text({
			x: this.stage_width*0.01,
			y: this.stage_height*0.24,
			text: "A",  // hard-coded mock data
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.18,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.grade_display = new Konva.Group();
		this.grade_display.add(this.grade_shape);
		this.grade_display.add(this.grade_text);

		this.result_text_1 = new Konva.Text({
			x: this.stage_width*0.32,
			y: this.stage_height*0.26,
			text: "Your final grade",
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.035,
			align: 'left',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.result_text_2 = new Konva.Text({
			x: this.stage_width*0.32,
			y: this.stage_height*0.32,
			text: "PERCENTAGE EXPERT!",  // hard-coded mock data
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.5,
			fontSize: this.stage_height*0.06,
			align: 'left',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.result_text_3 = new Konva.Text({
			x: this.stage_width*0.32,
			y: this.stage_height*0.42,
			text: "Budgeted like a pro, great job! Keep practicing to stay sharp.",  // hard-coded mock data
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.5,
			fontSize: this.stage_height*0.03,
			align: 'left',
			verticalAlign: 'center',
			fill: 'Black',
		});
		

		this.percent_shape = new Konva.Rect({
			x: this.stage_width*0.15,
			y: this.stage_height*0.55,
			width: this.stage_width*0.22,
			height: this.stage_height*0.15,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.percent_text = new Konva.Text({
			x: this.stage_width*0.06,
			y: this.stage_height*0.58,
			text: "Percent Grade:",
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.03,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.percent_data = new Konva.Text({
			x: this.stage_width*0.06,
			y: this.stage_height*0.62,
			text: "95%",  // hard-coded mock data
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.percent_display = new Konva.Group();
		this.percent_display.add(this.percent_shape);
		this.percent_display.add(this.percent_text);
		this.percent_display.add(this.percent_data);

		this.wrong_shape = new Konva.Rect({
			x: this.stage_width*0.4,
			y: this.stage_height*0.55,
			width: this.stage_width*0.22,
			height: this.stage_height*0.15,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.wrong_text = new Konva.Text({
			x: this.stage_width*0.31,
			y: this.stage_height*0.58,
			text: "Wrong Answers:",
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.03,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.wrong_data = new Konva.Text({
			x: this.stage_width*0.31,
			y: this.stage_height*0.62,
			text: "3",  // hard-coded mock data
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.wrong_display = new Konva.Group();
		this.wrong_display.add(this.wrong_shape);
		this.wrong_display.add(this.wrong_text);
		this.wrong_display.add(this.wrong_data);

		this.hints_shape = new Konva.Rect({
			x: this.stage_width*0.65,
			y: this.stage_height*0.55,
			width: this.stage_width*0.22,
			height: this.stage_height*0.15,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.hints_text = new Konva.Text({
			x: this.stage_width*0.56,
			y: this.stage_height*0.58,
			text: "Hints Used:",
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.03,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.hints_data = new Konva.Text({
			x: this.stage_width*0.56,
			y: this.stage_height*0.62,
			text: "8",  // hard-coded mock data
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.hints_display = new Konva.Group();
		this.hints_display.add(this.hints_shape);
		this.hints_display.add(this.hints_text);
		this.hints_display.add(this.hints_data);


		this.answer_button_shape = new Konva.Rect({
			x: this.stage_width*0.15,
			y: this.stage_height*0.75,
			width: this.stage_width*0.22,
			height: this.stage_height*0.1,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.answer_button_text = new Konva.Text({
			x: this.stage_width*0.06,
			y: this.stage_height*0.77,
			text: this.ANSWER_KEY,
			listening: false,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.answer_button = new Konva.Group();
		this.answer_button.add(this.answer_button_shape);
		this.answer_button.add(this.answer_button_text);
		this.answer_button.on('click', onAnswerKeyClick);
		this.answer_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.answer_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

		this.leaderboard_button_shape = new Konva.Rect({
			x: this.stage_width*0.4,
			y: this.stage_height*0.75,
			width: this.stage_width*0.22,
			height: this.stage_height*0.1,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.leaderboard_button_text = new Konva.Text({
			x: this.stage_width*0.31,
			y: this.stage_height*0.77,
			text: this.LEADERBOARD,
			listening: false,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.leaderboard_button = new Konva.Group();
		this.leaderboard_button.add(this.leaderboard_button_shape);
		this.leaderboard_button.add(this.leaderboard_button_text);
		this.leaderboard_button.on('click', onLeaderboardClick);
		this.leaderboard_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.leaderboard_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

		this.again_button_shape = new Konva.Rect({
			x: this.stage_width*0.65,
			y: this.stage_height*0.75,
			width: this.stage_width*0.22,
			height: this.stage_height*0.1,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.again_button_text = new Konva.Text({
			x: this.stage_width*0.56,
			y: this.stage_height*0.77,
			text: this.PLAY_AGAIN,
			listening: false,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.again_button = new Konva.Group();
		this.again_button.add(this.again_button_shape);
		this.again_button.add(this.again_button_text);
		this.again_button.on('click', onPlayAgainClick);
		this.again_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.again_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});


		this.loadFonts();
		this.group = new Konva.Group();
		this.group.add(this.background);
		this.group.add(this.title);
		this.group.add(this.main_card);

		this.group.add(this.grade_display);
		this.group.add(this.result_text_1);
		this.group.add(this.result_text_2);
		this.group.add(this.result_text_3);
		
		this.group.add(this.percent_display);
		this.group.add(this.wrong_display);
		this.group.add(this.hints_display);

		this.group.add(this.answer_button);
		this.group.add(this.leaderboard_button);
		this.group.add(this.again_button);
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