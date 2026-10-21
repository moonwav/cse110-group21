export default class GameModel {
    STARTSTAGE = 'start page';
    MINIGAME = 'minigame';
    QUESTIONSTAGE = 'question stage';
    RECAP = 'game over';
    
    gameStage: string;
    playerName: string;
    currentScore: number;

    constructor(playerName: string) {
        this.gameStage = this.STARTSTAGE;
        this.playerName = playerName;
        this.currentScore = 0;
    }

    beginGame() {
        this.gameStage = this.QUESTIONSTAGE;
    }

    

}