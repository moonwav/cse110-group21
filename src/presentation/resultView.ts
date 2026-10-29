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
	
	stage_width: number;
	stage_height: number;
	background: Konva.Rect;
	main_card: Konva.Rect;
	title: Konva.Text;

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