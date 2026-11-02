import EnterNameView from '../presentation/enterNameView';
import GameModel from './model';
import { ScreenSwitcher, Controller } from "../types";

interface PlayerEntry {
    id: number;
    name: string;
}
//Defines the EnterNameController
export default class EnterNameController extends Controller{
    model: GameModel;
    view: EnterNameView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.screenSwitcher = screenSwitcher;
        this.view = new EnterNameView(model, stage_width, stage_height);
    }
    

    handleReadyClick() {
        this.screenSwitcher.switchToScreen({type: "question"});
    }


    async show() {
        this.view.show();
        this.model.setPlayer(await this.getPlayerName());
        try {
            const found = await this.findName(this.model.getPlayer());
            if(found === 1) {
                this.view.displayWelcomeMessage(() => this.handleReadyClick(), ' back');
            }
            else {
                try{
                    this.savePlayerToServer(this.model.getPlayer());

                    this.view.displayWelcomeMessage(() => this.handleReadyClick(), '');
                }
                catch (error) {
                    window.alert(error);
                    throw error;
                }
                
            }
        }
        catch(error){
           window.alert(error);
           throw error;
        }
    }

    async getPlayerName(): Promise<string> {
        let name = (await this.view.getUsername()).trim();
        if (name ===  "" || name === null) {
            this.view.showInvalid();
            return this.getPlayerName();
        }
        else {
            return name;
        }
    }

    async findName(playerName: string) {
        try {
            const names: PlayerEntry[] = await this.loadPlayersFromServer();
            let name: string;
            for(let i: number = 0; i < names.length; i++) {
                name = names[i].name;
                if(name == playerName) {
                    return 1;
                }
            }
            return 0;
        }
        catch (error) {
            window.alert(error);
            throw error;
        }
    }

    async loadPlayersFromServer(): Promise<PlayerEntry[]> {
		const response = await fetch("/api/players");
		if (!response.ok){
			throw new Error("Unable to load player");
		}
		return (await response.json()) as PlayerEntry[];
	}

	async savePlayerToServer(name: string): Promise<void>{
		const response = await fetch("/api/players", {
 			method: "POST",
 			headers: { "Content-Type": "application/json" },
 			body: JSON.stringify({ name }),
		});
		if (!response.ok){
			throw new Error("Unable to save player");
		}

	}

    hide() {
        this.view.hide();
    }

    getView(): EnterNameView {
        return this.view;
    }
}