import Konva from 'konva';
import { loadFont } from './fonts';
import { View } from './types';

//Main color palatte of the game
const primary_color = '#4A5A9A';
const secondary_color = '#C2CAE9';
const button_color = '#92A1DF';

//Defines the MainMenuView class
export default class InfoView implements View{
	
	HOW_TO_PLAY = "How to play";
	STORY = "Story";
    STORY_TEXT = "You are heading out on an exciting one-day vacation! From grabbing breakfast and trying out thrilling activities to picking up souvenirs, every step of your trip involves managing your spending. To make the most of your day out, you will need to use your percentage skills to handle discounts, tips, taxes, and budgets.";
    HOW_TO_PLAY_TEXT_1 = "You will face 10 math questions based on real-world spending scenarios during your trip (food, activities, shopping, and more).";
    HOW_TO_PLAY_TEXT_2 = "You are welcome to calculate answers using scratch paper or a calculator, though we strongly recommend using scratch paper to get the best practice and learning experience!";
    HOW_TO_PLAY_TEXT_3 = "At the end of your 10-question trip, you will get an overall letter grade determined by your final percentage score determines your overall grade.";
    SCORING_GRADES = "Scoring & Grades";
    SCORING_TEXT_1 = "You get percentage points for every problem you answer correctly, with a total of 100%. At the end of your 10-question trip, you will get an overall letter grade determined by your final percentage score.";
    SCORING_TEXT_2 = "If you get stuck on a tricky problem, look at the bottom right corner of your screen:";
    HINT = "Hint Button: Click this to get a helpful clue for solving the problem. Using a hint will deduct a small number of points from your overall percentage grade.";
    REVEAL = "Reveal Answer Button: Once a hint is used, this button will appear. If you are completely stumped, you can reveal the answer to move forward. Revealing an answer will deduct a larger chunk of points from your score.";
    READY = "Ready to plan the ultimate vacation and test your percentage power? ";
    BEGIN = "Go back to the main menu and press START TRIP to begin your trip!";
    BACK = "back";

	SILKSCREEN = 'Silkscreen';

    STAGE_WIDTH = 1000;
	STAGE_HEIGHT = 900;

	
	//stage_width: number;
	//stage_height: number;
	background: Konva.Rect;
	main_card: Konva.Rect;
	title: Konva.Text;
	back_button_shape: Konva.Rect;
	back_button_text: Konva.Text;
	back_button: Konva.Group;

	group: Konva.Group;


	constructor(onBackClick: () => void) {

		this.background = new Konva.Rect({
			x: 0,
			y: 0,
			width: this.STAGE_WIDTH,
			height: this.STAGE_HEIGHT,
			fill: primary_color,
		});


		this.main_card = new Konva.Rect({
			x: this.STAGE_WIDTH*0.05,
			y: this.STAGE_HEIGHT*0.17,
			width: this.STAGE_WIDTH*0.9,
			height: this.STAGE_HEIGHT*0.78,
			cornerRadius: 25,
			fill: secondary_color,
		});

        loadFont(this.SILKSCREEN, 'normal', '400').then(() => {
  		    this.title.fontFamily(this.SILKSCREEN);
            this.back_button_text.fontFamily(this.SILKSCREEN);
		    });

		this.title = new Konva.Text({
			x: this.STAGE_WIDTH*0.05,
			y: this.STAGE_HEIGHT*0.05,
			text: this.HOW_TO_PLAY,
			fontFamily: this.SILKSCREEN,
			width: this.STAGE_WIDTH*0.9,
			fontSize: this.STAGE_HEIGHT*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'white',
		});

		this.back_button_shape = new Konva.Rect({
			x: this.STAGE_WIDTH*0.315,
			y: this.STAGE_HEIGHT*0.83,
			width: this.STAGE_WIDTH*0.37,
			height: this.STAGE_HEIGHT*0.09,
			cornerRadius: 25,
			fill: button_color,
		});
	
		this.back_button_text = new Konva.Text({
			x: this.STAGE_WIDTH*0.315,
			y: this.STAGE_HEIGHT*0.835,
			text: this.BACK,
			fontFamily: this.SILKSCREEN,
			width: this.STAGE_WIDTH*0.37,
			fontSize: this.STAGE_HEIGHT*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
		
		this.back_button = new Konva.Group();
		this.back_button.add(this.back_button_shape);
		this.back_button.add(this.back_button_text);
		this.back_button.on('click', () => onBackClick());

		this.group = new Konva.Group();
		this.group.add(this.background);
		this.group.add(this.title);
		this.group.add(this.main_card);
		this.group.add(this.back_button);
	}	

	getGroup() : Konva.Group {
		return this.group;
	}
	
	hide() {
		this.group.visible(false);
	}

    show() {
        this.group.visible(true);
    }
}