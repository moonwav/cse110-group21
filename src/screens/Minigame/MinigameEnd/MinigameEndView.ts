import Konva from 'konva';
import { View } from '../../../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from '../../../constants';

export default class MinigameEndView implements View {

	PLAY_AGAIN = "Play Again";
	MAIN_MENU = "Main Menu";

	SILKSCREEN = 'Silkscreen';
	ROBOTO = 'Roboto';

	stage_width: number;
	stage_height: number;

	card_x: number;
	card_y: number;
	card_width: number;
	card_height: number;

	overlay: Konva.Rect;
	card: Konva.Rect;
	title: Konva.Text;
	message: Konva.Text;

	again_button_shape: Konva.Rect;
	again_button_text: Konva.Text;
	again_button: Konva.Group;

	menu_button_shape: Konva.Rect;
	menu_button_text: Konva.Text;
	menu_button: Konva.Group;

	group: Konva.Group;

	constructor(onPlayAgainClick: () => void,
				onMainMenuClick: () => void,
				stage_width: number, stage_height: number) {
		this.stage_width = stage_width;
		this.stage_height = stage_height;

		this.card_width = this.stage_width * 0.5;
		this.card_height = this.stage_height * 0.5;
		this.card_x = (this.stage_width - this.card_width) / 2;
		this.card_y = (this.stage_height - this.card_height) / 2;

		this.overlay = new Konva.Rect({
			x: 0,
			y: 0,
			width: this.stage_width,
			height: this.stage_height,
			fill: 'black',
			opacity: 0.5,
		});

		this.card = new Konva.Rect({
			x: this.card_x,
			y: this.card_y,
			width: this.card_width,
			height: this.card_height,
			cornerRadius: 12,
			fill: PRIMARY_COLOR,
		});

		this.title = new Konva.Text({
			x: this.card_x,
			y: this.titleY(false),
			width: this.card_width,
			text: "",
			fontFamily: this.SILKSCREEN,
			fontSize: this.stage_height * 0.06,
			align: 'center',
			fill: 'white',
		});

		this.message = new Konva.Text({
			x: this.card_x + this.card_width * 0.05,
			y: this.card_y + this.card_height * 0.4,
			width: this.card_width * 0.9,
			text: "",
			fontFamily: this.SILKSCREEN,
			fontSize: this.stage_height * 0.035,
			align: 'center',
			fill: 'white',
		});

		const button_width = this.card_width * 0.4;
		const button_height = this.card_height * 0.2;
		const button_y = this.card_y + this.card_height * 0.72;
		const button_margin = this.card_width * 0.06;

		this.again_button_shape = new Konva.Rect({
			x: this.card_x + button_margin,
			y: button_y,
			width: button_width,
			height: button_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.again_button_text = new Konva.Text({
			x: this.card_x + button_margin,
			y: button_y,
			width: button_width,
			height: button_height,
			text: this.PLAY_AGAIN,
			listening: false,
			fontFamily: this.SILKSCREEN,
			fontSize: this.stage_height * 0.04,
			align: 'center',
			verticalAlign: 'middle',
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

		this.menu_button_shape = new Konva.Rect({
			x: this.card_x + this.card_width - button_margin - button_width,
			y: button_y,
			width: button_width,
			height: button_height,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.menu_button_text = new Konva.Text({
			x: this.card_x + this.card_width - button_margin - button_width,
			y: button_y,
			width: button_width,
			height: button_height,
			text: this.MAIN_MENU,
			listening: false,
			fontFamily: this.SILKSCREEN,
			fontSize: this.stage_height * 0.04,
			align: 'center',
			verticalAlign: 'middle',
			fill: 'Black',
		});

		this.menu_button = new Konva.Group();
		this.menu_button.add(this.menu_button_shape);
		this.menu_button.add(this.menu_button_text);
		this.menu_button.on('click', onMainMenuClick);
		this.menu_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.menu_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

		this.group = new Konva.Group({ visible: false });
		this.group.add(this.overlay);
		this.group.add(this.card);
		this.group.add(this.title);
		this.group.add(this.message);
		this.group.add(this.again_button);
		this.group.add(this.menu_button);
	}

	private titleY(has_message: boolean): number {
		return has_message
			? this.card_y + this.card_height * 0.15
			: this.card_y + this.card_height * 0.3;
	}

	updateText(title: string, message: string) {
		const has_message = message !== "";
		this.title.text(title);
		this.title.y(this.titleY(has_message));
		this.message.text(message);
		this.message.visible(has_message);
		this.group.getLayer()?.draw();
	}

	getGroup(): Konva.Group {
		return this.group;
	}

	show() {
		this.group.visible(true);
		this.group.getLayer()?.draw();
	}

	hide() {
		this.group.visible(false);
		document.body.style.cursor = 'default';
		this.group.getLayer()?.draw();
	}
}
