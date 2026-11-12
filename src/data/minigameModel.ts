import { MinigameQuestionAnswer, numberGenerator, 
        minigameQuestionGenerator } from './minigameQuestionGenerator';

export type MinigameQuestion = {question: string, id: number};
export type MinigameAnswer = {answer:string, id: number};

export class MinigameModel {
    NUMBER_OF_QUESTIONS = 5;

    questions: MinigameQuestion[];
    answers: MinigameAnswer[];
	amount_answered: number;
	player_answers: {q:number, a:number}[];
	currently_selected: string | null;

    constructor() {
        this.questions = [{question: '', id: 0},
                            {question: '', id: 1},
                            {question: '', id: 2},
                            {question: '', id: 3},
                            {question: '', id: 4}];
        this.answers = [{answer: '', id: 0},
                        {answer: '', id: 1},
                        {answer: '', id: 2},
                        {answer: '', id: 3},
                    	{answer: '', id: 4}];
        let q: MinigameQuestionAnswer;
        for(let i: number = 0; i < this.NUMBER_OF_QUESTIONS; i++) {
            q = minigameQuestionGenerator(numberGenerator());
            this.questions[i].question = q.question;
            this.answers[i]. answer = q.answer;
        }

		this.amount_answered = 0;

        this.questions = this.shuffle(this.questions);
    	this.answers = this.shuffle(this.answers);

		this.player_answers = [{q:5, a:5}, {q:5, a:5}, {q:5, a:5}, {q:5, a:5}, {q:5, a:5}];

		this.currently_selected = null;
    }

    getQuestions() {
        return this.questions;
    }

	getAnswers() {
        return this.answers;
    }

	getSolutions() {
		let solns = [{q:5, a:5}, {q:5, a:5}, {q:5, a:5}, {q:5, a:5}, {q:5, a:5}];
		for(let i: number = 0; i < 5; i++) {
			solns[i].q = i;
			const id = this.questions[i].id;
			for(let j: number = 0; j < 5; j++) {
				if(this.answers[j].id == id) {
					solns[i].a = j;
					break;
				}
			}
		}
		return solns;
	}

    checkAnswers(): boolean{
        for (let i: number = 0; i < 5; i++) {
            if(this.questions[this.player_answers[i].q].id !== this.answers[this.player_answers[i].a].id)
            return false;
        }
		return true;
    }

    shuffle<T>(array: T[]): T[]{
        let copy = array;
        let element: T;
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random()*(i+1));

            element = copy[j];
            copy[j] = copy[i];
            copy[i] = element;

        }
        return copy;
    }

	selectQuestion(index: number){
		if(this.currently_selected == null) {
			this.currently_selected = 'question';
			this.player_answers[this.amount_answered].q = index;
		} 
		else if (this.currently_selected == 'question'){
			this.player_answers[this.amount_answered].q = index;
		}
		else {
			this.player_answers[this.amount_answered].q = index;
			this.currently_selected = null;
			this.amount_answered++;	
		}
	}

	selectAnswer(index: number){
		if(this.currently_selected == null) {
			this.currently_selected = 'answer';
			this.player_answers[this.amount_answered].a = index;
		} 
		else if (this.currently_selected == 'answer'){
			this.player_answers[this.amount_answered].a = index;
		}
		else {
			this.player_answers[this.amount_answered].a = index;
			this.currently_selected = null;
			this.amount_answered++;	
		}
	}

	deselectQuestion(index: number) {
		if(this.currently_selected == 'question') {
			if (this.player_answers[this.amount_answered].q == index) {
				this.player_answers[this.amount_answered].q = 5;
				this.currently_selected = null;
				return;
			}
		}
		for(let i: number = 0; i < this.NUMBER_OF_QUESTIONS; i++) {
			if (this.player_answers[i].q == index) {
				this.player_answers.splice(i,1);
				break;
			}
		}
		this.player_answers.push({q: 5, a:5});
		this.amount_answered -= 1;
	}

	deselectAnswer(index: number) {
		if(this.currently_selected == 'answer') {
			if (this.player_answers[this.amount_answered].a == index) {
				this.player_answers[this.amount_answered].a = 5;
				this.currently_selected = null;
				return;
			}
		}
		for(let i: number = 0; i < this.NUMBER_OF_QUESTIONS; i++) {
			if (this.player_answers[i].a == index) {
				this.player_answers.splice(i,1);
				break;
			}
		}
		this.player_answers.push({q: 5, a:5});
		this.amount_answered -= 1;
	}
}

