import Question from './question';
import { generateTrip } from './QuestionGenerator';

export default class GameModel {
    STARTSTATE = 'start page';
    MINIGAME = 'minigame';
    QUESTION = 'question state';
    RECAP = 'game over';
    INFO = 'How to play';
    
    gameState: string;
    playerName: string;
    currentScore: number;
    questions: Question[];
    questionIndex: number;

    constructor() {
        this.gameState = this.STARTSTATE;
        this.playerName = '';
        this.currentScore = 0;
        this.questions = generateTrip();
        this.questionIndex = 0;
    }

    beginGame() {
        this.gameState = this.QUESTION;
        this.questions = generateTrip();
        this.questionIndex = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.questionIndex];
    }

    nextQuestion() {
        if (this.questionIndex < this.questions.length - 1) {
            this.questionIndex += 1;
        }
        return this.getCurrentQuestion();
    }

    setPlayer(playerName: string) {
        this.playerName = playerName;
    }

    getPlayer() {
        return this.playerName;
    }

    setStateMinigame() {
        this.gameState = this.MINIGAME;
    }

    setStateInfo() {
        this.gameState = this.INFO
    }

    setStateQuestion() {
        this.gameState = this.QUESTION;
    }

    setStateStart() {
        this.gameState = this.STARTSTATE;
    }

    setStateRecap() {
        this.gameState = this.RECAP;
    }

    getState() {
        return this.gameState;
    }



}