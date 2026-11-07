import { MinigameQuestionAnswer, numberGenerator, 
        minigameQuestionGenerator } from './minigameQuestionGenerator';

export type MinigameQuestion = {question: string, id: number};
export type MinigameAnswer = {answer:string, id: number};

export class MinigameModel {
        NUMBER_OF_QUESTIONS = 5;

        questions: MinigameQuestion[];
        answers: MinigameAnswer[];
        amount_incorrect: number;

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

                this.amount_incorrect = 5;

                this.questions = this.shuffle(this.questions);
                this.answers = this.shuffle(this.answers);
        }

        getQuestions() {
                return this.questions;
        }

        getAmountInorrect(){
                return this.amount_incorrect;
        }

        checkAnswer(q: MinigameQuestion, a: MinigameQuestion): boolean{
                if (q.id === a.id) {
                        this.amount_incorrect -= 1;
                        return true;
                }
                else {
                        return false;
                }
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
}

