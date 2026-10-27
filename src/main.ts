
import Konva from 'konva';
import MainMenuView from './mainMenuView';
import Question from './question';
import QuestionView from './questionView';
import GameModel from './model';
import MainMenuController from './mainMenuController';
import QuestionController from './questionController';
import InfoController from './infoController';
import ResultController from './resultController';
import MinigameController from './minigameController';
import type { ScreenSwitcher, Screen } from "./types.ts";

const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 900;


/**
 * Main Application - Coordinates all screens
 *
 * This class demonstrates screen management using Konva Groups.
 * Each screen (Menu, Game, Results) has its own Konva.Group that can be
 * shown or hidden independently.
 *
 * Key concept: All screens are added to the same layer, but only one is
 * visible at a time. This is managed by the switchToScreen() method.
 */
class Game implements ScreenSwitcher {
	private stage: Konva.Stage;
	private layer: Konva.Layer;

	private menuController: MainMenuController;
	private questionController: QuestionController;
	private infoController: InfoController;
	//private minigameController: MinigameController;
	//private resultsController: ResultController;

	private model: GameModel;

	constructor(container: string) {
		const stage = new Konva.Stage({
    		container: 'container',
    		width: window.innerWidth,
   			height: window.innerHeight
		});

		// Initialize Konva stage (the main canvas)
		this.stage = new Konva.Stage({
			container,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
		});

		// Create a layer (screens will be added to this layer)
		this.layer = new Konva.Layer();
		this.stage.add(this.layer);
		

		this.model = new GameModel();
		// Initialize all screen controllers
		// Each controller manages a Model, View, and handles user interactions
		this.menuController = new MainMenuController(this.model, this);
		this.infoController = new InfoController(this.model, this);
		this.questionController = new QuestionController(this.model, this);
		//this.resultsController = new ResultController(this.model, this);
		//this.minigameController = new MinigameController(this.model, this);

		// Add all screen groups to the layer
		// All screens exist simultaneously but only one is visible at a time
		this.layer.add(this.menuController.getView().getGroup());
		this.layer.add(this.questionController.getView().getGroup());
		//this.layer.add(this.resultsController.getView().getGroup());
		this.layer.add(this.infoController.getView().getGroup());
		//this.layer.add(this.minigameController.getView().getGroup());
		// Draw the layer (render everything to the canvas)
		this.layer.draw();

		// Start with menu screen visible
		this.menuController.getView().show();
	}

	/**
	 * Switch to a different screen
	 *
	 * This method implements screen management by:
	 * 1. Hiding all screens (setting their Groups to invisible)
	 * 2. Showing only the requested screen
	 *
	 * This pattern ensures only one screen is visible at a time.
	 */
	switchToScreen(screen: Screen): void {
		// Hide all screens first by setting their Groups to invisible
		this.menuController.hide();
		this.questionController.hide();
		this.infoController.hide();
		//this.resultsController.hide();

		// Show the requested screen based on the screen type
		switch (screen.type) {
			case "menu":
				this.menuController.show();
				break;

			case "question":
				// Start the game (which also shows the game screen)
				this.questionController.newQuestion();
				break;

			//case "result":
				// Show results with the final score
				//this.resultsController.showResults(screen.score);
				//break;

			case "info":
				break;

			//case "minigame":
				//break;
			
		}
	}
}

// Initialize the application
new Game("container");


// pulled from main
/*
import { showQuestionScreen } from "./presentation/IndividualProblem";

const root = document.querySelector("#game");
if (root instanceof HTMLDivElement) showQuestionScreen(root);
*/
