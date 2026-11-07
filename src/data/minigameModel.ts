import { MinigameQuestion, MinigameQuestionNumbers, numberGenerator, 
        minigameQuestionGenerator } from './minigameQuestionGenerator'

export type MinigameQA = {question: string, answer:string};

export class MinigameModel {
        NUMBER_OF_QUESTIONS = 5;

        questions: MinigameQuestion[] = [{question: '', answer: ''},
                                        {question: '', answer: ''},
                                        {question: '', answer: ''},
                                        {question: '', answer: ''},
                                        {question: '', answer: ''}];
        amount_incorrect: number;

        constructor() {
                for(let i: number = 0; i < this.NUMBER_OF_QUESTIONS; i++) {
                        this.questions[i] = minigameQuestionGenerator(numberGenerator());
                }

                this.amount_incorrect = 5;
        }

        getQuestions() {
                return this.questions;
        }

        getAmountInorrect(){
                return this.amount_incorrect;
        }

        checkAnswer(q: number, a: number): boolean{
                if (q === a) {
                        this.amount_incorrect -= 1;
                        return true;
                }
                else {
                        return false;
                }
        }
}
