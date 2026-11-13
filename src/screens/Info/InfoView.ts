import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR, loadFonts } from './viewConstants';


//Defines the InfoView class
export default class InfoView implements View{
	
	HOW_TO_PLAY = "How to play";
	STORY = "Story";
    STORY_TEXT = "You are heading out on an exciting one-day vacation! From grabbing breakfast and trying out thrilling activities to picking up souvenirs, every step of your trip involves managing your spending. To make the most of your day out, you will need to use your percentage skills to handle discounts, tips, taxes, and budgets.";
    HOW_TO_PLAY_TEXT = "You will face 10 math questions based on real-world spending scenarios during your trip (food, activities, shopping, and more).\nYou are welcome to calculate answers using scratch paper or a calculator, though we strongly recommend using scratch paper to get the best practice and learning experience!\nAt the end of your 10-question trip, you will get an overall letter grade determined by your final percentage score determines your overall grade.";
    SCORING_GRADES = "Scoring & Grades";
    SCORING_TEXT = "You get percentage points for every problem you answer correctly, with a total of 100%. At the end of your 10-question trip, you will get an overall letter grade determined by your final percentage score.\nIf you get stuck on a tricky problem, look at the bottom right corner of your screen:\n 1. Hint Button: Click this to get a helpful clue for solving the problem. Using a hint will deduct a small number of points from your overall percentage grade.\n 2. Reveal Answer Button: Once a hint is used, this button will appear. If you are completely stumped, you can reveal the answer to move forward. Revealing an answer will deduct a larger chunk of points from your score.";
    READY = "Ready to plan the ultimate vacation and test your percentage power?\nGo back to the main menu and press START TRIP to begin your trip!";
	BACK = "back";

	SILKSCREEN = 'Silkscreen';
	ROBOTO = 'Roboto';

	LINE_HEIGHT = 1.4;
	NEW_STAGE_HEIGHT = 3000;

	stage_width: number;
	stage_height: number;

	background: Konva.Rect;
	main_card: Konva.Rect;
	title: Konva.Text;

	back_button_shape: Konva.Rect;
	back_button_text: Konva.Text;
	back_button: Konva.Group;

	group: Konva.Group;
	
	text_to_title_padding: number;
	title_to_text_padding: number;

	story_title: Konva.Text;
	story_text: Konva.Text;

	how_to_play_title: Konva.Text;
	how_to_play_text: Konva.Text;

	scoring_grades_title: Konva.Text;
	scoring_text: Konva.Text;

	ready_text: Konva.Text;



	constructor(onBackClick: () => void, stage_width: number, stage_height: number) {
		this.stage_width = stage_width;
		this.stage_height = stage_height;

		this.text_to_title_padding = this.stage_height*0.06;
		this.title_to_text_padding = this.stage_height*0.03;

		this.title = new Konva.Text({
			x: this.stage_width*0.05,
			y: this.stage_height*0.05,
			text: this.HOW_TO_PLAY,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.9,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'white',
		});

		this.story_title = new Konva.Text({
			x: this.stage_width*0.085,
			y: this.stage_height*0.23,
			text: this.STORY,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.2,
			fontSize: this.stage_height*0.04,
			align: 'left',
			verticalAlign: 'center',
			fill: 'black',

		});

		this.story_text = new Konva.Text({
			x: this.stage_width*0.085,
			y: this.story_title.y() + this.story_title.height() + 
				this.title_to_text_padding,
			text: this.STORY_TEXT,
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.83,
			fontSize: this.stage_height*0.03,
			lineHeight: this.LINE_HEIGHT,
			align: 'left',
			verticalAlign: 'center',
			fill: 'black',

		});

		this.how_to_play_title = new Konva.Text({
			x: this.stage_width*0.085,
			y: this.story_text.y() + this.story_text.height() + 
				this.text_to_title_padding,
			text: this.HOW_TO_PLAY,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.2,
			fontSize: this.stage_height*0.04,
			align: 'left',
			verticalAlign: 'center',
			fill: 'black',
		});

		this.how_to_play_text = new Konva.Text({
			x: this.stage_width*0.085,
			y: this.how_to_play_title.y() + this.how_to_play_title.height() +
				this.title_to_text_padding,
			text: this.HOW_TO_PLAY_TEXT,
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.83,
			fontSize: this.stage_height*0.03,
			lineHeight: this.LINE_HEIGHT,
			align: 'left',
			verticalAlign: 'center',
			fill: 'black',
		});

		this.scoring_grades_title = new Konva.Text({
			x: this.stage_width*0.085,
			y: this.how_to_play_text.y() + this.how_to_play_text.height() + 
				this.text_to_title_padding,
			text: this.SCORING_GRADES,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.3,
			fontSize: this.stage_height*0.04,
			align: 'left',
			verticalAlign: 'center',
			fill: 'black',
		});

		this.scoring_text = new Konva.Text({
			x: this.stage_width*0.085,
			y: this.scoring_grades_title.y() + 
				this.scoring_grades_title.height() + this.title_to_text_padding,
			text: this.SCORING_TEXT,
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.83,
			fontSize: this.stage_height*0.03,
			lineHeight: this.LINE_HEIGHT,
			align: 'left',
			verticalAlign: 'center',
			fill: 'black',
		});

		this.ready_text = new Konva.Text({
			x: this.stage_width*0.085,
			y: this.scoring_text.y() + 
				this.scoring_text.height() + this.text_to_title_padding,
			text: this.READY,
			fontFamily: this.ROBOTO,
			width: this.stage_width*0.83,
			fontSize: this.stage_height*0.03,
			lineHeight: this.LINE_HEIGHT,
			align: 'left',
			verticalAlign: 'center',
			fill: 'black',
		});

		this.back_button_shape = new Konva.Rect({
			x: this.stage_width*0.315,
			y: this.ready_text.y() + 
				this.ready_text.height() + this.text_to_title_padding,
			width: this.stage_width*0.37,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});
	
		this.back_button_text = new Konva.Text({
			x: this.stage_width*0.315,
			y: this.back_button_shape.y() + this.stage_height*0.005,
			text: this.BACK,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.37,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.main_card = new Konva.Rect({
			x: this.stage_width*0.05,
			y: this.stage_height*0.17,
			width: this.stage_width*0.9,
			height: this.back_button_shape.y() + this.back_button_shape.height() 
					+ this.text_to_title_padding - this.stage_height*0.17,
			cornerRadius: 25,
			fill: SECONDARY_COLOR,
		});

		this.background = new Konva.Rect({
			x: 0,
			y: 0,
			width: this.stage_width,
			height:  this.back_button_shape.y() + this.back_button_shape.height() 
					+ 2.5*this.text_to_title_padding,
			fill: PRIMARY_COLOR,
		});
		
		loadFonts();
		this.back_button = new Konva.Group();
		this.back_button.add(this.back_button_shape);
		this.back_button.add(this.back_button_text);
		this.back_button.on('click', onBackClick);

		this.group = new Konva.Group();
		this.group.add(this.background);
		this.group.add(this.title);
		this.group.add(this.main_card);
		this.group.add(this.back_button);
		this.group.add(this.story_title);
		this.group.add(this.story_text);
		this.group.add(this.how_to_play_title);
		this.group.add(this.how_to_play_text);
		this.group.add(this.scoring_grades_title);
		this.group.add(this.scoring_text);
		this.group.add(this.ready_text);
	}	


	getGroup() : Konva.Group {
		return this.group;
	}
	
	hide() {
		let stage = this.group.getStage();
		if (stage === null) {
			window.alert("something went wrong");
		}
		else if (stage.height() !== this.stage_height){
			stage.height(this.stage_height);
		}
		this.group.visible(false);
		this.group.getLayer()?.draw();
	}

    show() {
		let stage = this.group.getStage();
		if (stage === null) {
			window.alert("something went wrong");
		}
		else {
			stage.height(this.background.height());
		}
		this.group.visible(true);
		this.group.getLayer()?.draw();
    }
}