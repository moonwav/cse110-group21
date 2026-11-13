import Question from './Question';
import { generateTrip, pickOptions } from './questionGenerator';

export type QuestionRecord = {
    hintUsed: boolean;
    revealed: boolean;
    correct: boolean;
    wrongTries: number;
};

export default class GameModel {
    playerName: string;
    playerAnswer: number | null;
    questions: Question[];
    records: QuestionRecord[];
    questionIndex: number;

    constructor() {
        this.playerName = '';
        this.playerAnswer = null;
        this.questions = [];
        this.records = [];
        this.questionIndex = 0;
        this.setQuestions(generateTrip());
    }

    beginGame() {
        this.setQuestions(generateTrip());
        this.playerAnswer = null;
    }

    /**
     * Starts a trip with these questions and a blank record for each one.
     * Tests call this directly with fixed questions.
     */
    setQuestions(questions: Question[]) {
        this.questions = questions;
        this.records = questions.map(() => ({
            hintUsed: false,
            revealed: false,
            correct: false,
            wrongTries: 0,
        }));
        this.questionIndex = 0;
    }

    submitAnswer(answer: number | null) {
        this.playerAnswer = answer;
    }

    getCurrentQuestion(): Question {
        return this.questions[this.questionIndex];
    }

    nextQuestion() {
        if (this.questionIndex < this.questions.length - 1) {
            this.questionIndex += 1;
        }
        this.playerAnswer = null;
        return this.getCurrentQuestion();
    }

    isLastQuestion(): boolean {
        return this.questionIndex >= this.questions.length - 1;
    }

    /**
     * Get up to four random questions the player has not seen yet
     */
    getOptions(random: () => number = Math.random): Question[] {
        return pickOptions(this.questions.slice(this.questionIndex), 4, random)
    }

    /**
     * Moves the chosen question to the current index
     * (swaps order in original generated trip)
     */
    chooseQuestion(question: Question) {
        const chosenIndex = this.questions.indexOf(question, this.questionIndex);
        if (chosenIndex === -1) return;  // shouldn't happen in practice
        this.questions[chosenIndex] = this.questions[this.questionIndex];
        this.questions[this.questionIndex] = question;
        question.setQuestionNumber(this.questionIndex + 1);
    }

    setPlayer(playerName: string) {
        this.playerName = playerName;
    }

    getPlayer(): string {
        return this.playerName;
    }

    getCurrentRecord(): QuestionRecord {
        return this.records[this.questionIndex];
    }

}