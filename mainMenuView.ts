import Konva from 'konva';
import { loadFont } from './fonts';
//import MainMenuController from './mainMenuController';

//Main color palatte of the game
const primary_color = '#4A5A9A';
const secondary_color = '#C2CAE9';
const button_color = '#92A1DF';

//Defines the MainMenuView class
export default class MainMenuView{
	TITLE = '% PERCENT GETAWAY %';
	START = 'Start Trip';
	MINIGAME = 'Mini-Game';
	
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

	//model: GameModel;
	//controller: MainMenuController;
	stage_width: number;
	stage_height: number;
	background: Konva.Rect;
	main_card: Konva.Rect;
	title: Konva.Text;

	start_button_shape: Konva.Rect;
	start_button_text: Konva.Text;
	start_button: Konva.Group;

	info_button_shape: Konva.Rect;
	info_button_text: Konva.Text;
	info_button: Konva.Group;

	mini_game_button_shape: Konva.Rect;
	mini_game_button_text: Konva.Text;
	mini_game_button: Konva.Group;

	back_button_shape: Konva.Rect;
	back_button_text: Konva.Text;
	back_button: Konva.Group;
	page: Konva.Group;


	constructor(stage_width: number, stage_height: number) {
		this.stage_width = stage_width;
		this.stage_height = stage_height;
		//this.controller = controller;

		this.background = new Konva.Rect({
			x: 0,
			y: 0,
			width: stage_width,
			height: stage_height,
			fill: primary_color,
		});


		this.main_card = new Konva.Rect({
			x: stage_width*0.05,
			y: stage_height*0.17,
			width: stage_width*0.9,
			height: stage_height*0.78,
			cornerRadius: 25,
			fill: secondary_color,
		});

		this.title = new Konva.Text({
			x: stage_width*0.05,
			y: stage_height*0.05,
			text: this.TITLE,
			fontFamily: this.SILKSCREEN,
			width: stage_width*0.9,
			fontSize: stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'white',
		});

		this.start_button_shape = new Konva.Rect({
			x: stage_width*0.3,
			y: stage_height*0.2,
			width: stage_width*0.4,
			height: stage_height*0.09,
			cornerRadius: 25,
			fill: button_color,
		});

		this.start_button_text = new Konva.Text({
			x: stage_width*0.3,
			y: stage_height*0.205,
			text: this.START,
			fontFamily: this.SILKSCREEN,
			width: stage_width*0.4,
			fontSize: stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
		loadFont(this.SILKSCREEN, 'normal', '400').then(() => {
  		this.start_button_text.fontFamily(this.SILKSCREEN);
		});

		this.start_button = new Konva.Group();

		this.start_button.add(this.start_button_shape);
		this.start_button.add(this.start_button_text);

		this.start_button.on('click', () => {
			
		});


		this.info_button_shape = new Konva.Rect({
			x: stage_width*0.275,
			y: stage_height*0.32,
			width: stage_width*0.45,
			height: stage_height*0.09,
			cornerRadius: 25,
			fill: button_color,
		});

		this.info_button_text = new Konva.Text({
			x: stage_width*0.275,
			y: stage_height*0.327,
			text: this.HOW_TO_PLAY,
			fontFamily: this.SILKSCREEN,
			width: stage_width*0.45,
			fontSize: stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
		
		this.info_button = new Konva.Group();
		this.info_button.add(this.info_button_shape);
		this.info_button.add(this.info_button_text);
		
		this.info_button.on('click', () => {
			this.instructionView();
		});
		
		this.mini_game_button_shape = new Konva.Rect({
			x: stage_width*0.315,
			y: stage_height*0.83,
			width: stage_width*0.37,
			height: stage_height*0.09,
			cornerRadius: 25,
			fill: button_color,
		});

		this.mini_game_button_text = new Konva.Text({
			x: stage_width*0.315,
			y: stage_height*0.835,
			text: this.MINIGAME,
			fontFamily: this.SILKSCREEN,
			width: stage_width*0.37,
			fontSize: stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.mini_game_button = new Konva.Group();
		this.mini_game_button.add(this.mini_game_button_shape);
		this.mini_game_button.add(this.mini_game_button_text);
		
		this.mini_game_button.on('click', () => {
			//function
		});

		this.back_button_shape = new Konva.Rect({
			x: stage_width*0.315,
			y: stage_height*0.83,
			width: stage_width*0.37,
			height: stage_height*0.09,
			cornerRadius: 25,
			fill: button_color,
		});
	
		this.back_button_text = new Konva.Text({
			x: stage_width*0.315,
			y: stage_height*0.835,
			text: this.BACK,
			fontFamily: this.SILKSCREEN,
			width: stage_width*0.37,
			fontSize: stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
		
		this.back_button = new Konva.Group();
		this.back_button.add(this.back_button_shape);
		this.back_button.add(this.back_button_text);
		
		this.back_button.on('click', () => {
			this.back();
		});

		this.page = new Konva.Group();
		this.page.add(this.background);
		this.page.add(this.title);
		this.page.add(this.main_card);
		this.page.add(this.start_button);
		this.page.add(this.info_button);
		this.page.add(this.mini_game_button);
	}	

	getPage() : Konva.Group {
		return this.page;
	}

	instructionView() {
		this.start_button.remove();
		this.info_button.remove();
		this.mini_game_button.remove();
		this.title.text(this.HOW_TO_PLAY);
		this.page.add(this.back_button);
	}

	back() {
		this.back_button.remove();
		this.page.add(this.mini_game_button);
		this.page.add(this.start_button);
		this.page.add(this.info_button);
		this.title.text(this.TITLE);
	}

	start() {

	}


}

