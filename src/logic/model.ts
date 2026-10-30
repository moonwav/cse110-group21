export default class GameModel {
    STARTSTATE = 'start page';
    MINIGAME = 'minigame';
    QUESTION = 'question state';
    RECAP = 'game over';
    INFO = 'How to play';
    
    gameState: string;
    playerName: string;
    currentScore: number;

    constructor() {
        this.gameState = this.STARTSTATE;
        this.playerName = '';
        this.currentScore = 0;
    }

    beginGame() {
        this.gameState = this.QUESTION;
        //question
        //update score and question number
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