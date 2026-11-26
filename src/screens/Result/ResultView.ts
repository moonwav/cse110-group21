import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../../types';
import { ResultData, Grade } from './ResultModel';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from '../../constants';


//Defines the resultView class
export default class ResultView implements View{

	TITLE = "How was vacation?";
	ANSWER_KEY = "Answer Key";
	LEADERBOARD = "Leaderboard";
	PLAY_AGAIN = "Play Again";
	BACK = "Back";

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
	leaderboard_text: Konva.Text;

	again_button_shape: Konva.Rect;
	again_button_text: Konva.Text;
	again_button: Konva.Group;

	back_button: Konva.Group;
	back_button_shape: Konva.Rect;
	back_button_text: Konva.Text;

	leaderboard_entry_1_shape: Konva.Rect;
	leaderboard_entry_1_text: Konva.Text;

	leaderboard_entry_2_shape: Konva.Rect;
	leaderboard_entry_2_text: Konva.Text;

	leaderboard_entry_3_shape: Konva.Rect;
	leaderboard_entry_3_text: Konva.Text;

	leaderboard_entry_4_shape: Konva.Rect;
	leaderboard_entry_4_text: Konva.Text;

	leaderboard_entry_5_shape: Konva.Rect;
	leaderboard_entry_5_text: Konva.Text;

	score_number: number;

	group: Konva.Group;


	constructor(onAnswerKeyClick: () => void,
                onLeaderboardClick: () => void,
                onPlayAgainClick: () => void,
				onBackClick: () => void, 
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
			width: this.main_card.width(),
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'white',
		});
		

		const button_width = this.stage_width*0.25;
		const button_height = this.stage_height*0.1;
		const button_padding = (this.main_card.width() - 3*button_width)/4;
		const card_height = this.stage_height*0.15;
		const button_y = this.main_card.y() + this.main_card.height() - button_padding - button_height;
		const card_y = button_y - button_padding/1.5 - card_height;

		this.percent_shape = new Konva.Rect({
			x: this.main_card.x() + button_padding,
			y: card_y,
			width: button_width,
			height: this.stage_height*0.15,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.percent_text = new Konva.Text({
			x: this.percent_shape.x(),
			y: card_y + card_height/5,
			text: "Percent Grade:",
			fontFamily: this.ROBOTO,
			width: button_width,
			fontSize: this.stage_height*0.03,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.percent_data = new Konva.Text({
			x: this.percent_shape.x(),
			y: this.percent_text.y() + card_height/4,
			text: "", 
			fontFamily: this.SILKSCREEN,
			width: button_width,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.percent_display = new Konva.Group();
		this.percent_display.add(this.percent_shape);
		this.percent_display.add(this.percent_text);
		this.percent_display.add(this.percent_data);

		this.wrong_shape = new Konva.Rect({
			x: this.percent_shape.x() + this.percent_shape.width() + button_padding,
			y: card_y,
			width: button_width,
			height: this.stage_height*0.15,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.wrong_text = new Konva.Text({
			x: this.wrong_shape.x(),
			y: card_y + card_height/5,
			text: "Wrong Answers:",
			fontFamily: this.ROBOTO,
			width: button_width,
			fontSize: this.stage_height*0.03,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.wrong_data = new Konva.Text({
			x: this.wrong_shape.x(),
			y: this.wrong_text.y() + card_height/4,
			text: "", 
			fontFamily: this.SILKSCREEN,
			width: button_width,
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
			x: this.wrong_shape.x() + this.wrong_shape.width() + button_padding,
			y: card_y,
			width: button_width,
			height: this.stage_height*0.15,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.hints_text = new Konva.Text({
			x: this.hints_shape.x(),
			y: card_y + card_height/5,
			text: "Hints Used:",
			fontFamily: this.ROBOTO,
			width: button_width,
			fontSize: this.stage_height*0.03,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.hints_data = new Konva.Text({
			x: this.hints_shape.x(),
			y: this.hints_text.y() + card_height/4,
			text: "",
			fontFamily: this.SILKSCREEN,
			width: button_width,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.hints_display = new Konva.Group();
		this.hints_display.add(this.hints_shape);
		this.hints_display.add(this.hints_text);
		this.hints_display.add(this.hints_data);


		this.answer_button_shape = new Konva.Rect({
			x: this.main_card.x() + button_padding,
			y: button_y,
			width: button_width,
			height: this.stage_height*0.1,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.answer_button_text = new Konva.Text({
			x: this.answer_button_shape.x(),
			y: this.answer_button_shape.y(),
			text: this.ANSWER_KEY,
			listening: false,
			fontFamily: this.SILKSCREEN,
			width: button_width,
			height: button_height,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'middle',
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
			x: this.answer_button_shape.x() + this.answer_button_shape.width() + button_padding,
			y: button_y,
			width: button_width,
			height: button_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.leaderboard_button_text = new Konva.Text({
			x: this.leaderboard_button_shape.x(),
			y: this.leaderboard_button_shape.y(),
			text: this.LEADERBOARD,
			listening: false,
			fontFamily: this.SILKSCREEN,
			width: button_width,
			height: button_height,
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'middle',
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
			x: this.leaderboard_button_shape.x() + this.leaderboard_button_shape.width() + button_padding,
			y: button_y,
			width: button_width,
			height: button_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.again_button_text = new Konva.Text({
			x: this.again_button_shape.x(),
			y: this.again_button_shape.y(),
			width: button_width,
			height: button_height,
			align: 'center',
			verticalAlign: 'middle',
			text: this.PLAY_AGAIN,
			listening: false,
			fontFamily: this.SILKSCREEN,
			fontSize: this.stage_height*0.05,
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

		const grade_height = this.stage_width*0.12;
		const grade_padding = (this.main_card.height() - card_height - button_height - button_padding/1.5 - button_padding - grade_height)/3;
		const grade_y = this.main_card.y() + 2*grade_padding;

		this.grade_shape = new Konva.Rect({
			x: this.stage_width*0.18,
			y: grade_y,
			width: grade_height,
			height: grade_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.grade_text = new Konva.Text({
			x: this.grade_shape.x(),
			y: grade_y + (grade_height - this.stage_height*0.2)/2,
			text: "", 
			fontFamily: this.SILKSCREEN,
			width: grade_height,
			fontSize: this.stage_height*0.18,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.grade_display = new Konva.Group();
		this.grade_display.add(this.grade_shape);
		this.grade_display.add(this.grade_text);

		this.result_text_1 = new Konva.Text({
			x: this.grade_shape.x() + grade_height/2,
			y: this.main_card.y(),
			text: "Final Grade:",
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.4,
			height: grade_y - this.main_card.y(),
			fontSize: this.stage_height*0.05,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
			offsetX: this.stage_width*0.4/2
		});

		this.result_text_2 = new Konva.Text({
			x: this.grade_shape.x() + grade_height + grade_padding,
			y: grade_y + grade_height/5,
			text: "",
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.5,
			fontSize: this.stage_height*0.06,
			align: 'left',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.result_text_3 = new Konva.Text({
			x: this.result_text_2.x(),
			y: grade_y + 3*grade_height/5,
			text: "", 
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.5,
			fontSize: this.stage_height*0.03,
			align: 'left',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.leaderboard_text = new Konva.Text({
			x: this.stage_width * 0.15,
			y: this.stage_height * 0.25,
			width: this.stage_width * 0.7,
			text: "",
			fontFamily: this.ROBOTO,
			fontSize: this.stage_height * 0.035,
			lineHeight: 1.6,
			fill: "Black",
			visible: false,
		});

 		this.back_button_shape = new Konva.Rect({
			x: this.stage_width*0.05,
			y: (this.main_card.y() - this.stage_height*0.09)/2,
			width: this.stage_width*0.15,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});
	
		this.back_button_text = new Konva.Text({
			x: this.stage_width*0.05,
			y: (this.main_card.y() - this.stage_height*0.075)/2,
			listening: false,
			text: this.BACK,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.15,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.back_button = new Konva.Group();
		this.back_button.add(this.back_button_shape);
		this.back_button.add(this.back_button_text);
		
		this.back_button.on('click', onBackClick);
		this.back_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.back_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});
		
		const leaderboard_entry_width = this.main_card.width() - 2*button_padding;
		const leaderboard_entry_height = (this.main_card.height() - button_height - 4*button_padding)/5;
		const leaderboard_fontsize = this.stage_height*0.055;
		const text_offset_x = (leaderboard_entry_width - button_padding)/2;
		const text_x = this.main_card.x() + button_padding +leaderboard_entry_width/2;

		this.leaderboard_entry_1_shape = new Konva.Rect({
			x: this.main_card.x() + button_padding,
			y: this.main_card.y() + button_padding/2,
			width: leaderboard_entry_width,
			height: leaderboard_entry_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR
		})

		this.leaderboard_entry_1_text = new Konva.Text({
			x: text_x,
			y: this.leaderboard_entry_1_shape.y(),
			width: leaderboard_entry_width - button_padding,
			height: leaderboard_entry_height,
			text: "",
			fontFamily: this.ROBOTO,
			fontSize: leaderboard_fontsize,
			align: 'left',
			verticalAlign: 'middle',
			fill: 'Black',
			offsetX: text_offset_x
		})

		this.leaderboard_entry_2_shape = new Konva.Rect({
			x: this.main_card.x() + button_padding,
			y: this.leaderboard_entry_1_shape.y() + leaderboard_entry_height + button_padding/2,
			width: leaderboard_entry_width,
			height: leaderboard_entry_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR
		})

		this.leaderboard_entry_2_text = new Konva.Text({
			x: text_x,
			y: this.leaderboard_entry_2_shape.y(),
			width: leaderboard_entry_width,
			height: leaderboard_entry_height,
			text: "",
			fontFamily: this.ROBOTO,
			fontSize: leaderboard_fontsize,
			align: 'left',
			verticalAlign: 'middle',
			fill: 'Black',
			offsetX: text_offset_x
		})

		this.leaderboard_entry_3_shape = new Konva.Rect({
			x: this.main_card.x() + button_padding,
			y: this.leaderboard_entry_2_shape.y() + leaderboard_entry_height + button_padding/2,
			width: leaderboard_entry_width,
			height: leaderboard_entry_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR
		})

		this.leaderboard_entry_3_text = new Konva.Text({
			x: text_x,
			y: this.leaderboard_entry_3_shape.y(),
			width: leaderboard_entry_width,
			height: leaderboard_entry_height,
			text: "",
			fontFamily: this.ROBOTO,
			fontSize: leaderboard_fontsize,
			align: 'left',
			verticalAlign: 'middle',
			fill: 'Black',
			offsetX: text_offset_x
		})

		this.leaderboard_entry_4_shape = new Konva.Rect({
			x: this.main_card.x() + button_padding,
			y: this.leaderboard_entry_3_shape.y() + leaderboard_entry_height + button_padding/2,
			width: leaderboard_entry_width,
			height: leaderboard_entry_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR
		})

		this.leaderboard_entry_4_text = new Konva.Text({
			x: text_x,
			y: this.leaderboard_entry_4_shape.y(),
			width: leaderboard_entry_width,
			height: leaderboard_entry_height,
			text: "",
			fontFamily: this.ROBOTO,
			fontSize: leaderboard_fontsize,
			align: 'left',
			verticalAlign: 'middle',
			fill: 'Black',
			offsetX: text_offset_x
		})

		this.leaderboard_entry_5_shape = new Konva.Rect({
			x: this.main_card.x() + button_padding,
			y: this.leaderboard_entry_4_shape.y() + leaderboard_entry_height + button_padding/2,
			width: leaderboard_entry_width,
			height: leaderboard_entry_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR
		})

		this.leaderboard_entry_5_text = new Konva.Text({
			x: text_x,
			y: this.leaderboard_entry_5_shape.y(),
			width: leaderboard_entry_width,
			height: leaderboard_entry_height,
			text: "",
			fontFamily: this.ROBOTO,
			fontSize: leaderboard_fontsize,
			align: 'left',
			verticalAlign: 'middle',
			fill: 'Black',
			offsetX: text_offset_x
		})


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
		this.group.add(this.leaderboard_text);

		this.group.add(this.leaderboard_entry_1_shape);
		this.group.add(this.leaderboard_entry_1_text);

		this.group.add(this.leaderboard_entry_2_shape);
		this.group.add(this.leaderboard_entry_2_text);

		this.group.add(this.leaderboard_entry_3_shape);
		this.group.add(this.leaderboard_entry_3_text);

		this.group.add(this.leaderboard_entry_4_shape);
		this.group.add(this.leaderboard_entry_4_text);

		this.group.add(this.leaderboard_entry_5_shape);
		this.group.add(this.leaderboard_entry_5_text);

		this.score_number = 0;
	}	

	/**
	 * Update the final score display
	 */
	updateResults(results: ResultData, grade: Grade) {
		this.grade_text.text(grade.letter);
		this.result_text_2.text(grade.title);
		this.result_text_3.text(grade.message);
		this.percent_data.text(`${results.percent}%`);
		this.wrong_data.text(`${results.wrongAnswers}`);
		this.hints_data.text(`${results.hintsUsed}`);
		this.leaderboard_entry_1_shape.visible(false);
		this.leaderboard_entry_1_text.visible(false);
		this.leaderboard_entry_2_shape.visible(false);
		this.leaderboard_entry_2_text.visible(false);
		this.leaderboard_entry_3_shape.visible(false);
		this.leaderboard_entry_3_text.visible(false);
		this.leaderboard_entry_4_shape.visible(false);
		this.leaderboard_entry_4_text.visible(false);
		this.leaderboard_entry_5_shape.visible(false);
		this.leaderboard_entry_5_text.visible(false);
		this.grade_display.visible(true);
		this.result_text_1.visible(true);
		this.result_text_2.visible(true);
		this.result_text_3.visible(true);
		this.percent_display.visible(true);
		this.wrong_display.visible(true);
		this.hints_display.visible(true);
		this.group.getLayer()?.draw();
	}

	showLeaderboard(scores: { percent: number; playedAt: string }[]) {
		this.grade_display.visible(false);
		this.result_text_1.visible(false);
		this.result_text_2.visible(false);
		this.result_text_3.visible(false);
		this.percent_display.visible(false);
		this.wrong_display.visible(false);
		this.hints_display.visible(false);

		let when = "";

		switch (scores.length) {
			case 0:
				this.leaderboard_entry_1_text.text("No saved scores yet!");
				this.leaderboard_entry_1_shape.visible(true);
				this.leaderboard_entry_1_text.visible(true);
				break;
			case 5:
				when = new Date(scores[4].playedAt).toLocaleString();
				this.leaderboard_entry_5_text.text(`5. ${scores[4].percent}% ${when}`);
				this.leaderboard_entry_5_shape.visible(true);
				this.leaderboard_entry_5_text.visible(true);
			case 4:
				when = new Date(scores[3].playedAt).toLocaleString();
				this.leaderboard_entry_4_text.text(`4. ${scores[3].percent}% ${when}`);
				this.leaderboard_entry_4_shape.visible(true);
				this.leaderboard_entry_4_text.visible(true);
			case 3:
				when = new Date(scores[2].playedAt).toLocaleString();
				this.leaderboard_entry_3_text.text(`3. ${scores[2].percent}% ${when}`);
				this.leaderboard_entry_3_shape.visible(true);
				this.leaderboard_entry_3_text.visible(true);
			case 2:
				when = new Date(scores[1].playedAt).toLocaleString();
				this.leaderboard_entry_2_text.text(`2. ${scores[1].percent}% ${when}`);
				this.leaderboard_entry_2_shape.visible(true);
				this.leaderboard_entry_2_text.visible(true);
			case 1:
				when = new Date(scores[0].playedAt).toLocaleString();
				this.leaderboard_entry_1_text.text(`1. ${scores[0].percent}% ${when}`);
				this.leaderboard_entry_1_shape.visible(true);
				this.leaderboard_entry_1_text.visible(true);
		}
		this.score_number = scores.length;
		//this.leaderboard_text.text(lines);
		//this.leaderboard_text.visible(true);
		this.group.add(this.back_button);
		this.group.getLayer()?.draw();
	}

	hideLeaderboard() {
		switch (this.score_number) {
			case 0:
				this.leaderboard_entry_1_shape.visible(false);
				this.leaderboard_entry_1_text.visible(false);
				break;
			case 5:
				this.leaderboard_entry_5_shape.visible(false);
				this.leaderboard_entry_5_text.visible(false);
			case 4:
				this.leaderboard_entry_4_shape.visible(false);
				this.leaderboard_entry_4_text.visible(false);
			case 3:
				this.leaderboard_entry_3_shape.visible(false);
				this.leaderboard_entry_3_text.visible(false);
			case 2:
				this.leaderboard_entry_2_shape.visible(false);
				this.leaderboard_entry_2_text.visible(false);
			case 1:
				this.leaderboard_entry_1_shape.visible(false);
				this.leaderboard_entry_1_text.visible(false);
		}
		this.grade_display.visible(true);
		this.result_text_1.visible(true);
		this.result_text_2.visible(true);
		this.result_text_3.visible(true);
		this.percent_display.visible(true);
		this.wrong_display.visible(true);
		this.hints_display.visible(true);
		//this.leaderboard_text.visible(false);
		this.back_button.remove();
		this.group.getLayer()?.draw();
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