import QuestionView from '../presentation/questionView';
import GameModel from './model';
import * as ScoreTracker from './scoreTracker';
import { ScreenSwitcher, Controller } from "../types";
import { checkAnswer } from './answerChecker';
import { parsePlayerAnswer } from './question';
//will define the MainMenuController
export default class QuestionController extends Controller{
    model: GameModel;
    view: QuestionView;
    screenSwitcher: ScreenSwitcher;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher, 
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.view = new QuestionView(this.model, this.model.getCurrentQuestion(), 
                    ScoreTracker.currentScore(this.model), 
                    (answerText) => this.handleSubmitClick(answerText), 
                    () => this.handleHintClick(), 
                    () => this.handleRevealClick(),
                    () => this.handleNextClick(),
                    stage_width, stage_height);

        this.screenSwitcher = screenSwitcher;
    }

    handleSubmitClick(answerText: string) {
        if (ScoreTracker.isFinished(this.model.getCurrentRecord())) return;
        const result = checkAnswer(answerText, this.model.getCurrentQuestion());
        if (result.status === "invalid") {
            this.view.showResult("");
            this.view.showInvalid();
            return;
        }
        this.view.clearInvalid();
        this.model.submitAnswer(parsePlayerAnswer(answerText));
        if (result.status === "correct") {
            ScoreTracker.recordCorrect(this.model);
            this.view.showResult("Correct");
            this.view.showNext();
        } else {
            ScoreTracker.recordWrongTry(this.model);
            this.view.showResult("Incorrect, try again.");
        }
    }

    handleNextClick() {
        if (this.model.isLastQuestion()) {
            this.endGame();
        } else {
            this.newQuestion();
        }
    }

    handleHintClick() {
        //tell view to show hint
        ScoreTracker.applyHint(this.model);
        this.refreshScoreAndProgress();
    }

    handleRevealClick() {
        //tell view to reveal
        ScoreTracker.applyReveal(this.model);
        this.refreshScoreAndProgress();
    }
    
    newQuestion() {
        this.view.showQuestion(this.model.nextQuestion());
        this.refreshScoreAndProgress();
    }
    

    /** Gives the view the current score and question number. */
    refreshScoreAndProgress() {
        this.view.updateScoreAndProgress(
            ScoreTracker.currentScore(this.model),
            this.model.questionIndex + 1,
            this.model.questions.length,
        );
    }

    endGame() {
        const result = ScoreTracker.getResults(this.model);
        void fetch("/api/scores", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name: this.model.getPlayer(), result }),
        });
        this.screenSwitcher.switchToScreen({ type: "result", data: result });
    }

    show() {
        this.model.beginGame();
        this.view.showQuestion(this.model.getCurrentQuestion());
        this.refreshScoreAndProgress();
        this.view.show();
    }

    hide() {
        this.view.hide();
    }

    getView(): QuestionView {
        return this.view;
    }
}