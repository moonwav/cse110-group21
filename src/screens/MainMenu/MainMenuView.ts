import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR, loadFonts } from './viewConstants';


//Defines the MainMenuView class
export default class MainMenuView implements View {
	TITLE = '% PERCENT GETAWAY %';
	START = 'Start Trip';
	MINIGAME = 'Mini-Game';
	HOW_TO_PLAY = 'How to play';

	
	SILKSCREEN = 'Silkscreen';


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

	background_blur: Konva.Rect;
	name_card: Konva.Rect;
	name_entry_text: Konva.Text;
	name_box: Konva.Rect;

	group: Konva.Group;

	constructor(onStartClick: () => void, onInfoClick: () => void, 
				onMinigameClick: () => void, stage_width: number, 
				stage_height: number) {
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

		this.start_button_shape = new Konva.Rect({
			x: this.stage_width*0.3,
			y: this.stage_height*0.2,
			width: this.stage_width*0.4,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.start_button_text = new Konva.Text({
			x: this.stage_width*0.3,
			y: this.stage_height*0.205,
			text: this.START,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.4,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.start_button = new Konva.Group();

		this.start_button.add(this.start_button_shape);
		this.start_button.add(this.start_button_text);
		this.start_button.on('click', onStartClick);

		this.info_button_shape = new Konva.Rect({
			x: this.stage_width*0.275,
			y: this.stage_height*0.32,
			width: this.stage_width*0.45,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.info_button_text = new Konva.Text({
			x: this.stage_width*0.275,
			y: this.stage_height*0.327,
			text: this.HOW_TO_PLAY,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.45,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
		
		this.info_button = new Konva.Group();
		this.info_button.add(this.info_button_shape);
		this.info_button.add(this.info_button_text);
		this.info_button.on('click', onInfoClick);

		this.mini_game_button_shape = new Konva.Rect({
			x: this.stage_width*0.315,
			y: this.stage_height*0.83,
			width: this.stage_width*0.37,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.mini_game_button_text = new Konva.Text({
			x: this.stage_width*0.315,
			y: this.stage_height*0.835,
			text: this.MINIGAME,
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.37,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.mini_game_button = new Konva.Group();
		this.mini_game_button.add(this.mini_game_button_shape);
		this.mini_game_button.add(this.mini_game_button_text);
		this.mini_game_button.on('click', onMinigameClick);

		this.name_card = new Konva.Rect({
			x: this.stage_width*0.15,
			y: this.stage_height*0.27,
			width: this.stage_width*0.7,
			height: this.stage_height*0.58,
			cornerRadius: 25,
			fill: PRIMARY_COLOR,
		});
				
		this.background_blur = new Konva.Rect({
			x: 0,
			y: 0,
			width: this.stage_width,
			height: this.stage_height,
			fill: 'black',
			opacity: 0.5,
		});
				
		this.name_entry_text = new Konva.Text({
			x: this.stage_width*0.2,
			y: this.stage_height*0.32,
			text: 'Enter a username for leaderboard below',
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.6,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
				
		this.name_box = new Konva.Rect({
			x: this.stage_width*0.315,
			y: this.stage_height*0.575,
			width: this.stage_width*0.37,
			height: this.stage_height*0.1,
			cornerRadius: 25,
			fill: 'White',
		});
		/*	
		this.text_node = new Konva.Text({
			text: 'type name here',
			fontSize: 20,
			fontFamily: 'Roboto',
			x: this.stage_width*0.35,
			y: this.stage_height*0.6,
			width: this.stage_width*0.37,
			height: this.stage_height*0.1,
			fill: 'black',
		});
		*/
		loadFonts();
		this.group = new Konva.Group();
		this.group.add(this.background);
		this.group.add(this.title);
		this.group.add(this.main_card);
		this.group.add(this.start_button);
		this.group.add(this.info_button);
		this.group.add(this.mini_game_button);
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
