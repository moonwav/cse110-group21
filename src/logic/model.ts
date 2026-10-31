import Question from './question';
import { generateTrip } from './QuestionGenerator';
import { ResultData } from '../data/resultModel';

export default class GameModel {
    // STARTSTATE = 'start page';
    // MINIGAME = 'minigame';
    // QUESTION = 'question state';
    // RECAP = 'game over';
    // INFO = 'How to play';
    
    // gameState: string;
    playerName: string;
    currentScore: number;
    playerAnswer: number | null;
    answerIsCorrect: boolean | null;
    questions: Question[];
    questionIndex: number;
    wrongAnswers: number;
    hintsUsed: number;

    constructor() {
        // this.gameState = this.STARTSTATE;
        this.playerName = '';
        this.currentScore = 0;
        this.playerAnswer = null;
        this.answerIsCorrect = null;
        this.questions = generateTrip();
        this.questionIndex = 0;
        this.wrongAnswers = 0;
        this.hintsUsed = 0;
    }

    beginGame() {
        // this.gameState = this.QUESTION;
        this.questions = generateTrip();
        this.questionIndex = 0;
        this.playerAnswer = null;
        this.answerIsCorrect = null;
        this.currentScore = 0;
        this.wrongAnswers = 0;
        this.hintsUsed = 0;
    }

    submitAnswer(answer: number | null) {
        this.playerAnswer = answer;
        this.answerIsCorrect =
            answer !== null && this.getCurrentQuestion().matches(answer);
    }

    getCurrentQuestion(): Question {
        return this.questions[this.questionIndex];
    }

    nextQuestion() {
        if (this.questionIndex < this.questions.length - 1) {
            this.questionIndex += 1;
        }
        this.playerAnswer = null;
        this.answerIsCorrect = null;
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

    // setStateMinigame() {
    //     this.gameState = this.MINIGAME;
    // }

    // setStateInfo() {
    //     this.gameState = this.INFO
    // }

    // setStateQuestion() {
    //     this.gameState = this.QUESTION;
    // }

    // setStateStart() {
    //     this.gameState = this.STARTSTATE;
    // }

    // setStateRecap() {
    //     this.gameState = this.RECAP;
    // }

    // getState() {
    //     return this.gameState;
    // }

}