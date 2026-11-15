
import Konva from 'konva';
import GameModel from './model/GameModel';
import MainMenuController from './screens/MainMenu/MainMenuController';
import QuestionController from './screens/Question/QuestionController';
import InfoController from './screens/Info/InfoController';
import ResultController from './screens/Result/ResultController';
import AnswerController from './screens/AnswerKey/AnswerKeyController';
import MinigameController from './screens/Minigame/MinigameController';
import EnterNameController from './screens/EnterName/EnterNameController';
import type { ScreenSwitcher, Screen } from "./types.ts";
import OptionsController from './screens/Options/OptionsController';


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
	private stage_width: number;
	private stage_height: number;

	private menuController: MainMenuController;
	private questionController: QuestionController;
	private infoController: InfoController;
	private enterNameController: EnterNameController;
	private minigameController: MinigameController;
	private resultController: ResultController;
    private answerController: AnswerController;
	private optionsController: OptionsController;

	private model: GameModel;

	constructor(container: string) {
		this.stage = new Konva.Stage({
    		container: container,
    		width: window.innerWidth,
   			height: window.innerHeight
		});

		this.stage_width = this.stage.width();
		this.stage_height = this.stage.height();


		// Create a layer (screens will be added to this layer)
		this.layer = new Konva.Layer();
		this.stage.add(this.layer);

		this.model = new GameModel();
		// Initialize all screen controllers
		// Each controller manages a Model, View, and handles user interactions
		this.menuController = new MainMenuController(this.model, this, 
													this.stage_width, 
													this.stage_height);
		this.infoController = new InfoController(this.model, this, 
												this.stage_width, 
												this.stage_height);
		this.enterNameController = new EnterNameController(this.model, this, 
														this.stage_width, 
														this.stage_height);
		this.questionController = new QuestionController(this.model, this, 
														this.stage_width, 
														this.stage_height);
		this.resultController = new ResultController(this.model, this, 
													this.stage_width, 
													this.stage_height);
        this.answerController = new AnswerController(this.model, this, 
													this.stage_width, 
													this.stage_height);
		this.minigameController = new MinigameController(this.model, this,
														this.stage_width, 
														this.stage_height);
		this.optionsController = new OptionsController(this.model, this, 
													this.stage_width, 
													this.stage_height);

		// Add all screen groups to the layer
		// All screens exist simultaneously but only one is visible at a time
		this.layer.add(this.menuController.getView().getGroup());
		this.layer.add(this.infoController.getView().getGroup());
		this.layer.add(this.enterNameController.getView().getGroup());
		this.layer.add(this.questionController.getView().getGroup());
		this.layer.add(this.resultController.getView().getGroup());
		this.layer.add(this.answerController.getView().getGroup());
		this.layer.add(this.minigameController.getView().getGroup());
		this.layer.add(this.optionsController.getView().getGroup());
		// Draw the layer (render everything to the canvas)

		// Start with menu screen visible
		this.switchToScreen({type: "menu"});

		this.layer.draw();
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
		this.infoController.hide();
		this.questionController.hide();
		this.enterNameController.hide();
        this.answerController.hide();
		this.resultController.hide();
		this.minigameController.hide();
		this.optionsController.hide();

		// Show the requested screen based on the screen type
		switch (screen.type) {
			case "menu":
				this.menuController.show();
				break;

			case "info":
				this.infoController.show();
				break;

			case "enter name":
				this.menuController.show();
				this.enterNameController.show();
				break;
			
			case "question":
				this.questionController.show();
				break;

			case "result":
				// Show results with the final data
				this.resultController.show(screen.data);
				break;

            case "answer":
				this.answerController.show();
				break;

			case "minigame":
				this.minigameController.show();
				break;

			case "options":
				this.optionsController.show();
				break;
			
		}
	}
}

// Initialize the application
new Game("container");
