import Question from './question';
import { generateTrip } from './QuestionGenerator';
import { ResultData } from '../data/resultModel';
import { DatabaseSync } from 'node:sqlite';
import { findInDatabase, isInDatabase, openDatabase, addToDatabase, PlayerRow } from '../data/database';

export default class GameModel {
    playerName: string;
    currentScore: number;
    playerAnswer: number | null;
    questions: Question[];
    questionIndex: number;
    wrongAnswers: number;
    hintsUsed: number;

    constructor() {
        this.playerName = '';
        this.currentScore = 0;
        this.playerAnswer = null;
        this.questions = generateTrip();
        this.questionIndex = 0;
        this.wrongAnswers = 0;
        this.hintsUsed = 0;
    }

    beginGame() {
        this.questions = generateTrip();
        this.questionIndex = 0;
        this.playerAnswer = null;
        this.currentScore = 0;
        this.wrongAnswers = 0;
        this.hintsUsed = 0;
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

    getResults(): ResultData {
        return {
            percent: this.currentScore,
            wrongAnswers: this.wrongAnswers,
            hintsUsed: this.hintsUsed,
        };
    }

    setPlayer(playerName: string) {
        this.playerName = playerName;
    }

    getPlayer(): string {
        return this.playerName;
    }

    incrementHintsUsed() {
        this.hintsUsed++;
    }

    incrementWrongAnswer() {
        this.wrongAnswers++;
    }

}