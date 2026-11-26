import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR, loadFonts } from '../../constants';


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

	travel_image: Konva.Image | null = null;
	shopping_image: Konva.Image | null = null;
	money_image:  Konva.Image | null = null;

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
			x: this.start_button_shape.x(),
			y: this.start_button_shape.y(),
			width: this.start_button_shape.width(),
			height: this.start_button_shape.height(),
			text: this.START,
			fontFamily: this.SILKSCREEN,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
			listening: false,
		});

		this.start_button = new Konva.Group();

		this.start_button.add(this.start_button_shape);
		this.start_button.add(this.start_button_text);
		this.start_button.on('click', onStartClick);
		this.start_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.start_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

		this.info_button_shape = new Konva.Rect({
			x: this.stage_width*0.275,
			y: this.stage_height*0.32,
			width: this.stage_width*0.45,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.info_button_text = new Konva.Text({
			x: this.info_button_shape.x(),
			y: this.info_button_shape.y(),
			width: this.info_button_shape.width(),
			height: this.info_button_shape.height(),
			text: this.HOW_TO_PLAY,
			fontFamily: this.SILKSCREEN,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
			listening: false,
		});
		
		this.info_button = new Konva.Group();
		this.info_button.add(this.info_button_shape);
		this.info_button.add(this.info_button_text);
		this.info_button.on('click', onInfoClick);
		this.info_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.info_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

		this.mini_game_button_shape = new Konva.Rect({
			x: this.stage_width*0.315,
			y: this.stage_height*0.83,
			width: this.stage_width*0.37,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.mini_game_button_text = new Konva.Text({
			x: this.mini_game_button_shape.x(),
			y: this.mini_game_button_shape.y(),
			width: this.mini_game_button_shape.width(),
			height: this.mini_game_button_shape.height(),
			text: this.MINIGAME,
			fontFamily: this.SILKSCREEN,
			fontSize: this.stage_height*0.068,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
			listening: false,
		});

		this.mini_game_button = new Konva.Group();
		this.mini_game_button.add(this.mini_game_button_shape);
		this.mini_game_button.add(this.mini_game_button_text);
		this.mini_game_button.on('click', onMinigameClick);
		this.mini_game_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.mini_game_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

		this.group = new Konva.Group();
		this.group.add(this.background);
		this.group.add(this.title);
		this.group.add(this.main_card);
		this.group.add(this.start_button);
		this.group.add(this.info_button);
		this.group.add(this.mini_game_button);

		
		Konva.Image.fromURL("/travel.png",(image) => {
			const travel_scale = Math.min((this.mini_game_button_shape.y() - (this.info_button_shape.y()+ this.info_button_shape.height()))/image.height(), this.mini_game_button_shape.width()/image.width());
			image.scale({
				x: travel_scale,
				y: travel_scale,
			});
			image.position({
				x: 1/2*this.stage_width - travel_scale/2*image.width(),
				y: 1/2*this.stage_height - 0.075*image.height(),
			});
			image.height();
			this.travel_image = image;
			//this.lemonImage.scaleX(0.5);
			//this.lemonImage.scaleY(0.5);
			this.group.add(this.travel_image);
			
		});

		Konva.Image.fromURL("/shopping_sale.png",(image) => {
			const shopping_scale = Math.min((this.mini_game_button_shape.y() - (this.info_button_shape.y()+ this.info_button_shape.height())- 1.5*this.main_card.x())/image.height(), (this.mini_game_button_shape.x() - 1.5*this.main_card.x())/image.width());
			image.scale({
				x: shopping_scale,
				y: shopping_scale,
			});
			image.position({
				x: 1/2*this.stage_width + 7/16*this.main_card.width() - shopping_scale*image.width(),
				y: 1/2*this.stage_height - 0.045*image.width(),
			});
			image.height();
			this.shopping_image = image;
			//this.lemonImage.scaleX(0.5);
			//this.lemonImage.scaleY(0.5);
			this.group.add(this.shopping_image);
			
		});

		Konva.Image.fromURL("/money.png",(image) => {
			const money_scale = Math.min((this.mini_game_button_shape.y() - (this.info_button_shape.y()+ this.info_button_shape.height())- 1.5*this.main_card.x())/image.height(), (this.mini_game_button_shape.x() - 1.5*this.main_card.x())/image.width());
			image.scale({
				x: money_scale,
				y: money_scale,
			});
			image.position({
				x: 1/2*this.stage_width - 7/16*this.main_card.width(),
				y: 1/2*this.stage_height,
			});
			image.height();
			this.money_image = image;
			this.group.add(this.money_image);
			
		});
		
	}	

	getGroup() : Konva.Group {
		return this.group;
	}
	

	show() {
		this.group.visible(true);
		this.group.getLayer()?.draw();
	}
	
	hide() {
		document.body.style.cursor = 'default';
		this.group.visible(false);
		this.group.getLayer()?.draw();
	}

	
}
