import Konva from 'konva';
//import { loadFont } from './fonts';
import { View } from '../../types';
import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from '../../constants';
import Question from '../../model/Question';


//Defines the AnswerView class
export default class AnswerView implements View{
    
    ANSWER_KEY = "Answer Key";
    BACK = "back";
    NEXT_Q = "next Q";
    PREV_Q = "prev Q";

    SILKSCREEN = 'Silkscreen';
    ROBOTO = 'Roboto';

    stage_width: number;
    stage_height: number;
    background: Konva.Rect;
    main_card: Konva.Rect;
    title: Konva.Text;
    back_button_shape: Konva.Rect;
    back_button_text: Konva.Text;
    back_button: Konva.Group;

    next_button_shape: Konva.Rect;
    next_button_text: Konva.Text;
    next_button: Konva.Group;
    prev_button_shape: Konva.Rect;
    prev_button_text: Konva.Text;
    prev_button: Konva.Group;

    question_number_text: Konva.Text;
    question_prompt_text: Konva.Text;
    question_answer_text: Konva.Text;

    group: Konva.Group;


    constructor(onBackClick: () => void, onNextQClick: () => void, onPrevQClick: () => void,
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
            text: this.ANSWER_KEY,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.9,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'white',
        });

        this.back_button_shape = new Konva.Rect({
            x: this.stage_width*0.05,
            y: this.stage_height*0.05,
            width: this.stage_width*0.15,
            height: this.stage_height*0.09,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });
    
        this.back_button_text = new Konva.Text({
            x: this.stage_width*0.05,
            y: this.stage_height*0.055,
            listening: false,
            text: this.BACK,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.15,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
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

        this.question_number_text = new Konva.Text({
            x: this.stage_width*0.1,
            y: this.stage_height*0.26,
            text: "Question 1:",
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.4,
            fontSize: this.stage_height*0.065,
            align: 'left',
            verticalAlign: 'center',
            fill: 'Black',
        });

        this.question_prompt_text = new Konva.Text({
            x: this.stage_width*0.1,
            y: this.stage_height*0.4,
            text: "ojaoiwjdoaiwjd",
            fontFamily: this.ROBOTO,
            width: this.stage_width*0.8,
            fontSize: this.stage_height*0.045,
            align: 'left',
            verticalAlign: 'center',
            fill: 'Black',
        });

        this.question_answer_text = new Konva.Text({
            x: this.stage_width*0.1,
            y: this.stage_height*0.6,
            text: "Correct Answer: ", 
            fontFamily: this.ROBOTO,
            width: this.stage_width*0.5,
            fontSize: this.stage_height*0.045,
            align: 'left',
            verticalAlign: 'center',
            fill: 'Green',
        });

        this.next_button_shape = new Konva.Rect({
            x: this.stage_width*0.55,
            y: this.stage_height*0.83,
            width: this.stage_width*0.2,
            height: this.stage_height*0.09,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });
    
        this.next_button_text = new Konva.Text({
            x: this.stage_width*0.55,
            y: this.stage_height*0.835,
            text: this.NEXT_Q,
            listening: false,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.2,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });

        this.next_button = new Konva.Group();
        this.next_button.add(this.next_button_shape);
        this.next_button.add(this.next_button_text);
        this.next_button.on('click', onNextQClick);
        this.next_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.next_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

        this.prev_button_shape = new Konva.Rect({
            x: this.stage_width*0.25,
            y: this.stage_height*0.83,
            width: this.stage_width*0.2,
            height: this.stage_height*0.09,
            cornerRadius: 25,
            fill: BUTTON_COLOR,
        });
    
        this.prev_button_text = new Konva.Text({
            x: this.stage_width*0.25,
            y: this.stage_height*0.835,
            text: this.PREV_Q,
            listening: false,
            fontFamily: this.SILKSCREEN,
            width: this.stage_width*0.2,
            fontSize: this.stage_height*0.068,
            align: 'center',
            verticalAlign: 'center',
            fill: 'Black',
        });

        this.prev_button = new Konva.Group();
        this.prev_button.add(this.prev_button_shape);
        this.prev_button.add(this.prev_button_text);
        this.prev_button.on('click', onPrevQClick);
        this.prev_button.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});
		this.prev_button.on('mouseout', () => {
			document.body.style.cursor = 'default';
		});

        this.loadFonts();
        this.group = new Konva.Group();
        this.group.add(this.background);
        this.group.add(this.title);
        this.group.add(this.main_card);
        this.group.add(this.back_button);
        this.group.add(this.next_button);
        this.group.add(this.prev_button);
        this.group.add(this.question_number_text);
        this.group.add(this.question_prompt_text);
        this.group.add(this.question_answer_text);

        this.prev_button.visible(false);
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

    /**
     * Update shown question
     */
    updateQuestion(question: Question) {
        this.question_number_text.text(`Question ${question.getQuestionNumber()}:`);
        this.question_prompt_text.text(question.getQuestion());
        this.question_answer_text.text(`Correct Answer: ${question.getAnswer()}`);

        let questionNumber = question.getQuestionNumber();
        if(questionNumber == 1) {
            this.prev_button.visible(false);
        } else if(questionNumber == 10) {
            this.next_button.visible(false);
        } else {
            this.prev_button.visible(true);
            this.next_button.visible(true);
        }

        this.group.getLayer()?.draw();
    }


    getGroup() : Konva.Group {
        return this.group;
    }
    
    hide() {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    show() {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }
}