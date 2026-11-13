import Question from './question';
import { generateTrip } from './QuestionGenerator';

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
        // this.gameState = this.QUESTION;
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