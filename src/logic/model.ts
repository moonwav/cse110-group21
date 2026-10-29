export default class GameModel {
    private STARTSTATE = 'start page';
    private MINIGAME = 'minigame';
    private QUESTION = 'question state';
    private RECAP = 'game over';
    private INFO = 'How to play';
    
    private gameState: string;
    private playerName: string;
    private currentScore: number;

    constructor() {
        this.gameState = this.STARTSTATE;
        this.playerName = '';
        this.currentScore = 0;
    }

    newQuestion() {
        
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