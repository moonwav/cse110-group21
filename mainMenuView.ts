import Konva from 'konva';
import { loadFont } from './fonts';

//Main color palatte of the game
const primary_color = '#4A5A9A';
const secondary_color = '#C2CAE9';
const button_color = '#92A1DF';

//Defines the MainMenuView class
export default class MainMenuView{
	//model: GameModel;
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
			text: '% PERCENT GETAWAY %',
			fontFamily: 'Silkscreen',
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
			text: 'Start Trip',
			fontFamily: 'Silkscreen',
			width: stage_width*0.4,
			fontSize: stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
		loadFont('Silkscreen', 'normal', '400').then(() => {
  		this.start_button_text.fontFamily('Silkscreen');
		});

		this.start_button = new Konva.Group();

		this.start_button.add(this.start_button_shape);
		this.start_button.add(this.start_button_text);

		this.start_button.on('click', () => {
			//function
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
			text: 'How To Play',
			fontFamily: 'Silkscreen',
			width: stage_width*0.45,
			fontSize: stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});
		
		this.info_button = new Konva.Group();
		this.info_button.add(this.info_button_shape);
		this.info_button.add(this.info_button_text);
		
		
		
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
			text: 'Mini-Game',
			fontFamily: 'Silkscreen',
			width: stage_width*0.37,
			fontSize: stage_height*0.068,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.mini_game_button = new Konva.Group();
		this.mini_game_button.add(this.mini_game_button_shape);
		this.mini_game_button.add(this.mini_game_button_text);

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

	
}

