import Konva from 'konva';
//import { loadFont } from './fonts';
import GameModel from '../../model/GameModel';
import Question, { parsePlayerAnswer } from '../../model/Question';
import { View } from '../../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from '../../constants';


//Will define the QuestionView class, very unfinished
export default class QuestionView implements View{
	SILKSCREEN = 'Silkscreen';
	ROBOTO = 'Roboto';

    model: GameModel;
    stage_width: number;
    stage_height: number;
    background: Konva.Rect;
    main_card: Konva.Rect;

	question: Question;
	question_location: Konva.Text;
	question_text: Konva.Text;
	question_image: Konva.Image| null = null;

	title_1: Konva.Text;
	title_2: Konva.Text;
	score_1: Konva.Text;
	score_2: Konva.Text;
	score_number: number;

	answer_header: Konva.Text;
	answer_bubble: Konva.Rect;
	dollar_sign: Konva.Text;
	answer_input: HTMLInputElement;

	submit_button_shape: Konva.Rect;
	submit_button_text: Konva.Text;
	submit_button: Konva.Group;

	hint_button_shape: Konva.Rect;
	hint_button_text: Konva.Text;
	hint_button: Konva.Group;

	reveal_button_shape: Konva.Rect;
	reveal_button_text: Konva.Text;
	reveal_button: Konva.Group;

	result_text: Konva.Text;
	hint_text: Konva.Text;

	reveal_popup: Konva.Group;
	
	next_button_shape: Konva.Rect;
	next_button_text: Konva.Text;
	next_button: Konva.Group;
    group: Konva.Group;


    constructor(model: GameModel, question: Question, score: number, 
				onSubmitClick: (answerText: string) => void,
				onHintClick: () => void,
				onRevealClick: () => void,
				onNextClick: () => void,
				stage_width: number, stage_height: number) {
        this.model = model;
		this.question = question;
		this.score_number = score;
		this.stage_width = stage_width;
		this.stage_height = stage_height;
					

        this.background = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.stage_width,
            height: this.stage_height,
            fill: PRIMARY_COLOR,
        });

		this.main_card = new Konva.Rect ({
			x: this.stage_width*0.025,
			y: this.stage_height*0.05,
			width: this.stage_width*0.95,
			height: this.stage_height*0.9,
			cornerRadius: 25,
			fill: SECONDARY_COLOR,
		});

		const edge_padding = this.main_card.height() + this.main_card.y() - (this.stage_height*0.83 + this.stage_height*0.09);

		this.title_1 = new Konva.Text ({
			x: this.main_card.x() + 1.5*edge_padding,
			y: this.main_card.y() + 1.5*edge_padding - this.stage_height*0.045/6 + this.stage_height*0.045/2 - this.stage_height*0.03/2 + this.stage_height*0.03/6,
			text: `Question `,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.title_2 = new Konva.Text ({
			x: this.title_1.x() + this.title_1.width(),
			y: this.main_card.y() + 1.5*edge_padding - this.stage_height*0.045/6,
			text: `${this.question.getQuestionNumber()} of 10`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.055,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.score_2 = new Konva.Text ({
			x: this.main_card.x() + this.main_card.width() - 4*edge_padding,
			y: this.main_card.y() + 1.5*edge_padding - this.stage_height*0.045/6,
			text: `${this.score_number}%`,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.055,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.score_2.x( this.main_card.x() + this.main_card.width() - this.score_2.width() - 1.5*edge_padding);


		this.score_1 = new Konva.Text ({
			x: this.main_card.x() + this.main_card.width() - 4*edge_padding,
			y: this.main_card.y() + 1.5*edge_padding - this.stage_height*0.045/6 + this.stage_height*0.045/2 - this.stage_height*0.03/2 + this.stage_height*0.03/6,
			text: `Score `,
			fontFamily: 'Silkscreen',
			fontSize: this.stage_height*0.035,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.score_1.x( this.score_2.x() - this.score_1.width());

		this.question_location = new Konva.Text ({
			x: this.stage_width*0.06,
			y: this.stage_height*0.275,
			text: `${this.question.location}`,
			fontFamily: this.ROBOTO,
			fontSize: this.stage_height*0.04,
			align: 'center',
			verticalAlign: 'center',
			fill: 'Black',
		});

		this.question_text = new Konva.Text ({
			x: this.stage_width*0.06,
			y: this.stage_height*0.35,
			text: `${this.question.getQuestion()}`,
			fontFamily: this.ROBOTO,
			fontSize: this.stage_height*0.05,
			width: this.stage_width*0.9,
			verticalAlign: 'center',
			fill: 'Black',
		});
	
		this.answer_bubble = new Konva.Rect ({
			x: this.stage_width*0.06,
			y: this.stage_height*0.575,
			width: this.stage_width*0.37,
			height: this.stage_height*0.1,
			cornerRadius: 25,
			fill: 'White',
		});

		this.answer_header = new Konva.Text ({
			x: this.answer_bubble.x(),
			y: this.answer_bubble.y() - this.stage_height*0.05,
			text: `Type answer below:`,
			fontFamily: this.ROBOTO,
			fontSize: this.stage_height*0.03,
			width: this.stage_width*0.9,
			fill: 'Black',
		});

		this.dollar_sign = new Konva.Text({
			x: this.stage_width*0.07,
			y: this.stage_height*0.575,
			text: '$',
			fontFamily: this.ROBOTO,
			height: this.answer_bubble.height(),
			fontSize: this.stage_height*0.055,
			align: 'left',
			verticalAlign: 'middle',
			fill: 'Black',

		})

		this.answer_input = document.createElement("input");
		this.answer_input.className = "input-field";
		this.answer_input.inputMode = "decimal";
		this.answer_input.autocomplete = "off";
		this.answer_input.setAttribute("aria-label", "Your answer");
		this.placeAnswerInput();
		document.getElementById("container")?.append(this.answer_input);

		this.submit_button_shape = new Konva.Rect({
			x: this.stage_width*0.375,
			y: this.stage_height*0.83,
			width: this.stage_width*0.25,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.submit_button_text = new Konva.Text({
			x: this.stage_width*0.05,
			y: this.stage_height*0.835,
			text: 'Submit',
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.9,
			fontSize: this.stage_height*0.068,
			align: 'center',
			fill: 'Black',
			listening: false,
		});

		this.submit_button = new Konva.Group();
		this.submit_button.add(this.submit_button_shape);
		this.submit_button.add(this.submit_button_text);
		this.submit_button.on('click', () => onSubmitClick(this.answer_input.value));
		this.submit_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.submit_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

		this.next_button_shape = new Konva.Rect({
			x: this.stage_width*0.375,
			y: this.stage_height*0.83,
			width: this.stage_width*0.25,
			height: this.stage_height*0.09,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.next_button_text = new Konva.Text({
			x: this.stage_width*0.05,
			y: this.stage_height*0.835,
			text: 'Next',
			fontFamily: this.SILKSCREEN,
			width: this.stage_width*0.9,
			fontSize: this.stage_height*0.068,
			align: 'center',
			fill: 'Black',
			listening: false,
		});

		this.next_button = new Konva.Group({ visible: false });
		this.next_button.add(this.next_button_shape);
		this.next_button.add(this.next_button_text);
		this.next_button.on('click', onNextClick);
		this.next_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.next_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});


		this.hint_button_shape = new Konva.Rect({
			x: this.main_card.x() + this.main_card.width() - this.stage_width*0.15 - edge_padding,
			y: this.submit_button_shape.y() + this.submit_button_shape.height() -  this.stage_height*0.085,
			width: this.stage_width*0.15,
			height: this.stage_height*0.085,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.hint_button_text = new Konva.Text({
			x: this.hint_button_shape.x(),
			y: this.hint_button_shape.y() + this.stage_height*0.011,
			text: 'Hint',
			fontFamily: this.SILKSCREEN,
			width: this.hint_button_shape.width(),
			fontSize: this.stage_height*0.06,
			align: 'center',
			fill: 'Black',
			listening: false,
		});
	
		this.hint_button = new Konva.Group();
		this.hint_button.add(this.hint_button_shape);
		this.hint_button.add(this.hint_button_text);
		this.hint_button.on('click', onHintClick);
		this.hint_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.hint_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

		this.reveal_button_shape = new Konva.Rect({
			x: this.main_card.x() + this.main_card.width() - this.stage_width*0.17 - edge_padding,
			y: this.hint_button_shape.y(),
			width: this.stage_width*0.17,
			height: this.stage_height*0.085,
			cornerRadius: 25,
			fill: BUTTON_COLOR,
		});

		this.reveal_button_text = new Konva.Text({
			x: this.reveal_button_shape.x(),
			y: this.hint_button_text.y(),
			text: 'Reveal',
			fontFamily: this.SILKSCREEN,
			width: this.reveal_button_shape.width(),
			fontSize: this.stage_height*0.06,
			align: 'center',
			fill: 'Black',
			listening: false,
		});
	
		this.result_text = new Konva.Text ({
			x: this.stage_width*0.06,
			y: this.stage_height*0.775,
			width: this.stage_width*0.9,
			fill: 'Black',
			fontFamily: this.ROBOTO,
			fontSize: this.stage_height * 0.035,
			text: '',
		});

		this.hint_text = new Konva.Text({
			x: this.stage_width*0.06,
			y: this.stage_height*0.69,
			width: this.stage_width*0.48,
			fill: 'Black',
			fontFamily: this.ROBOTO,
			fontSize: this.stage_height*0.03,
			lineHeight: 1.2,
			text: '',
			visible: false,
		});

		this.reveal_button = new Konva.Group({ visible: false });
		this.reveal_button.add(this.reveal_button_shape);
		this.reveal_button.add(this.reveal_button_text);
		this.reveal_button.on('click', () => this.openRevealPopup());
		this.reveal_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.reveal_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

		this.reveal_popup = this.buildRevealPopup(onRevealClick);

		this.group = new Konva.Group();
		this.group.add(this.background);
		this.group.add(this.main_card);
		this.group.add(this.title_1);
		this.group.add(this.title_2);
		this.group.add(this.score_1);
		this.group.add(this.score_2);
		this.group.add(this.question_location);
		this.group.add(this.question_text);
		this.group.add(this.answer_bubble);
		this.group.add(this.answer_header);
		this.group.add(this.dollar_sign);
		this.group.add(this.submit_button);
		this.group.add(this.next_button);
		this.group.add(this.hint_button);
		this.group.add(this.result_text);
		this.group.add(this.hint_text);
		this.group.add(this.reveal_button);
		this.group.add(this.reveal_popup);

		Konva.Image.fromURL(this.question.getImage(), (image)=>{
			image.scale({
				x: 0.5,
				y: 0.5,
			});
			image.position({
				x: 1/2*this.stage_width - 1/4*image.width(),
				y: 1/2*this.stage_height - 1/4*image.height(),
			});
			this.question_image = image;
			this.group.add(this.question_image);
		})
		

		this.hide();
	}

	buildRevealPopup(onRevealClick: () => void): Konva.Group {
		const w = this.stage_width;
		const h = this.stage_height;

		// Dims the screen and catches clicks so nothing behind the popup can be pressed.
		const shade = new Konva.Rect({
			x: 0, y: 0, width: w, height: h,
			fill: 'Black', opacity: 0.4,
		});

		const card = new Konva.Rect({
			x: w*0.3, y: h*0.3, width: w*0.4, height: h*0.4,
			cornerRadius: 25, fill: SECONDARY_COLOR,
			stroke: PRIMARY_COLOR, strokeWidth: 4,
		});

		const message = new Konva.Text({
			x: w*0.32, y: h*0.35, width: w*0.36,
			text: "Reveal the answer?\n\nYou won't earn any points for this question.",
			fontFamily: this.ROBOTO, fontSize: h*0.03,
			align: 'center', fill: 'Black',
		});

		const confirm = this.makePopupButton('Reveal', w*0.32);
		confirm.on('click', () => {
			this.closeRevealPopup();
			onRevealClick();
		});

		const cancel = this.makePopupButton('Cancel', w*0.52);
		cancel.on('click', () => this.closeRevealPopup());

		const popup = new Konva.Group({ visible: false });
		popup.add(shade, card, message, confirm, cancel);
		return popup;
	}

	makePopupButton(label: string, x: number): Konva.Group {
		const button = new Konva.Group();
		button.add(new Konva.Rect({
			x, y: this.stage_height*0.56,
			width: this.stage_width*0.16, height: this.stage_height*0.08,
			cornerRadius: 25, fill: BUTTON_COLOR,
		}));
		button.add(new Konva.Text({
			x, y: this.stage_height*0.575,
			width: this.stage_width*0.16,
			text: label, fontFamily: this.SILKSCREEN,
			fontSize: this.stage_height*0.045,
			align: 'center', fill: 'Black',
		}));
		button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});
		return button;
	}

	openRevealPopup() {
		// The answer box is HTML on top of the canvas, so hide it or it would sit over the popup.
		this.answer_input.style.visibility = 'hidden';
		this.question_image?.visible(false);
		this.reveal_popup.visible(true);
		this.group.getLayer()?.batchDraw();
	}

	closeRevealPopup() {
		document.body.style.cursor = 'default';
		this.answer_input.style.visibility = 'visible';
		this.reveal_popup.visible(false);
		this.question_image?.visible(true);
		this.group.getLayer()?.batchDraw();
	}

	//updates text displayed on screen based on the current question
	displayQuestion() {
		this.title_2.text(`${this.question.getQuestionNumber()} of 10`);
		this.score_2.text(`${this.score_number}%`);
		this.question_location.text(`${this.question.location}`);
		this.question_text.text(`${this.question.getQuestion()}`);
		this.group.getLayer()?.draw();
	}

	getGroup(){
		return this.group;
	}

	placeAnswerInput() {
		const box = this.answer_bubble;
		this.answer_input.style.left = `${box.x() + this.dollar_sign.width() + this.stage_width*0.011}px`;
		this.answer_input.style.top = `${box.y() + box.height() / 2 - this.stage_height*0.055/2}px`;
		this.answer_input.style.width = `${box.width() - 48}px`;
		this.answer_input.style.height = `${this.stage_height*0.055}px`;
		this.answer_input.style.fontSize = `${this.stage_height*0.055}px`;
	}

	// unused now
	getPlayerAnswer() {
		return parsePlayerAnswer(this.answer_input.value);
	}

	showQuestion(question: Question) {
		this.question_image?.remove();
		this.question = question;
		this.question_location.text(question.getLocation());
		this.question_text.text(question.getQuestion());
		this.answer_header.text("Type answer below:");
		this.update_image(question.getImage());
		this.answer_input.value = "";
		this.result_text.text("");
		this.clearHint();
		this.hideNext();
	}

	showInvalid() {
		this.answer_header.text("Enter a number.");
	}

	showResult(message: string) {
		this.result_text.text(message);
		this.result_text.getLayer()?.batchDraw();
	}

	update_image(url: string){
		
		Konva.Image.fromURL(url, (image) => {
			const scale_by = Math.min((this.submit_button_shape.y() - this.stage_height*0.5)/image.height(), (this.answer_bubble.x() + this.answer_bubble.width() - (this.stage_width - this.main_card.width())/2)/image.width())
			image.scale({
				x: scale_by,
				y: scale_by
			});
			image.position({
				x: 3/4*this.stage_width - scale_by/2*image.width(),
				y: 0.625*this.stage_height - scale_by/2*image.height(),
			});
			this.question_image = image;
			this.group.add(this.question_image);
		})

	}

	/**
	 * Shows the score and which question the player is on.
	 * The controller calls this whenever either one changes.
	 */
	updateScoreAndProgress(score: number, questionNumber: number, totalQuestions: number) {
		this.title_2.text(`${questionNumber} of ${totalQuestions}`);
		this.score_2.text(`${score}%`);
	}

	clearInvalid() {
		this.answer_header.text("Type answer below:");
	}

	showHint(hint: string) {
		this.hint_text.text(`Hint: ${hint}`);
		this.hint_text.visible(true);
		this.hint_button.visible(false);
		this.reveal_button.visible(true);
		this.group.getLayer()?.batchDraw();
	}

	clearHint() {
		this.hint_text.text('');
		this.hint_text.visible(false);
		this.reveal_button.visible(false);
		this.closeRevealPopup();
	}

	showNext() {
		this.answer_input.disabled = true;
		this.submit_button.visible(false);
		this.hint_button.visible(false);
		this.reveal_button.visible(false);
		this.next_button.visible(true);
		this.group.getLayer()?.batchDraw();
	}

	hideNext() {
		this.answer_input.disabled = false;
		this.next_button.visible(false);
		this.submit_button.visible(true);
		this.hint_button.visible(true);
		this.group.getLayer()?.batchDraw();
	}

	hide() {
		document.body.style.cursor = 'default';
		this.group.visible(false);
		this.answer_input.style.display = "none";
	}

	show() {
		this.group.visible(true);
		this.answer_input.style.display = "block";
	}

	showRevealedAnswer(answer: string) {
		this.answer_input.style.visibility = 'hidden';
		this.result_text.text(`The answer is ${answer}.`);
		this.group.getLayer()?.batchDraw();
	}

}
