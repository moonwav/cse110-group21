import MinigameView from './MinigameView';
import GameModel from '../../model/GameModel';
import { ScreenSwitcher, Controller } from "../../types";
import { CORRECT_COLOR, WRONG_COLOR } from '../../constants';
import { MinigameModel } from './MinigameModel';

export const MINIGAME_TIME = 60;

//will define the MinigameController
export default class MinigameController extends Controller{
    model: GameModel;
    view: MinigameView;
    screenSwitcher: ScreenSwitcher;
    minigameModel: MinigameModel;

    selected_question: number | null;
    selected_answer: number | null;
    wrong_pair: {q: number, a: number} | null;
    correct_questions: Set<number>;
    correct_answers: Set<number>;

    time_left: number;
    timer: ReturnType<typeof setInterval> | null;
    ended: boolean;

    constructor (model: GameModel, screenSwitcher: ScreenSwitcher,
                stage_width: number, stage_height: number) {
        super();
        this.model = model;
        this.minigameModel = new MinigameModel();
        this.view = new MinigameView(this.minigameModel, stage_width, stage_height,
                                    (id: number) => this.handleQuestionClick(id),
                                    (id: number) => this.handleAnswerClick(id),
                                    () => this.handleSubmitClick());
        this.screenSwitcher = screenSwitcher;
        this.selected_question = null;
        this.selected_answer = null;
        this.wrong_pair = null;
        this.correct_questions = new Set();
        this.correct_answers = new Set();
        this.time_left = MINIGAME_TIME;
        this.timer = null;
        this.ended = false;
    }

    show() {
        this.startRound();
        this.view.show();
    }

    hide() {
        this.stopTimer();
        this.view.hide();
    }

    startRound() {
        this.minigameModel = new MinigameModel();
        this.view.setCards(this.minigameModel);
        this.view.setButtonText('Submit Answers');
        this.selected_question = null;
        this.selected_answer = null;
        this.wrong_pair = null;
        this.correct_questions.clear();
        this.correct_answers.clear();
        this.ended = false;
        this.startTimer();
    }

    startTimer() {
        this.stopTimer();
        this.time_left = MINIGAME_TIME;
        this.view.setTime(this.time_left);
        this.timer = setInterval(() => this.tick(), 1000);
    }

    stopTimer() {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    tick() {
        this.time_left--;
        this.view.setTime(this.time_left);
        if (this.time_left <= 0) {
            this.endRound();
        }
    }

    endRound() {
        this.stopTimer();
        this.ended = true;
        this.view.lockAllCards();
        this.screenSwitcher.switchToScreen({
            type: "minigame end",
            data: {
                completed: this.minigameModel.amount_answered === this.minigameModel.NUMBER_OF_QUESTIONS,
                timeTaken: MINIGAME_TIME - this.time_left,
            },
        });
    }

    handleQuestionClick(id: number) {
        if (this.ended || this.correct_questions.has(id)) return;
        if (this.wrong_pair !== null) {
            const was_wrong = this.wrong_pair.q === id;
            this.clearWrongPair();
            if (was_wrong) return;
        }
        if (this.selected_question === id) this.handleQuestionDeselect(id);
        else this.handleQuestionSelect(id);
    }

    handleAnswerClick(id: number) {
        if (this.ended || this.correct_answers.has(id)) return;
        if (this.wrong_pair !== null) {
            const was_wrong = this.wrong_pair.a === id;
            this.clearWrongPair();
            if (was_wrong) return;
        }
        if (this.selected_answer === id) this.handleAnswerDeselect(id);
        else this.handleAnswerSelect(id);
    }

    /*
     * Takes the index of an question card selected as the parameter (0 through
     * 4) and either holds onto it as waiting for an answer or adds it as a pair
     * with its answer to the models list. Also tells the view to update
     * to display it as selected.
     */
    handleQuestionSelect(id: number) {
        if (this.selected_question !== null) {
            this.view.questionCardDeselected(this.selected_question);
        }
        this.selected_question = id;
        this.view.questionCardSelected(id);
    }

    /*
     * Takes the index of an answer card selected as the parameter (0 through
     * 4) and either holds onto it as waiting for a question or adds it as a pair
     * with its question to the models list. Also tells the view to update
     * to display it as selected.
     */
    handleAnswerSelect(id: number) {
        if (this.selected_answer !== null) {
            this.view.answerCardDeselected(this.selected_answer);
        }
        this.selected_answer = id;
        this.view.answerCardSelected(id);
    }

    /*
     * Takes the index of a question card that is deselected as the parameter
     * (0 through 4) and removes it from waiting for an answer or removes its pair
     * from the models list. Also tells the view to update to no longer show it
     * (and its matching question if applicable) as selected.
     */
    handleQuestionDeselect(id: number) {
        this.selected_question = null;
        this.view.questionCardDeselected(id);
    }

    /*
     * Takes the index of an answer card that is deselected as the parameter
     * (0 through 4) and removes it from waiting for a question or removes its pair
     * from the models list. Also tells the view to update to no longer show it
     * (and its matching answer if applicable) as selected.
     */
    handleAnswerDeselect(id: number) {
        this.selected_answer = null;
        this.view.answerCardDeselected(id);
    }

    handleSubmitClick() {
        if (this.selected_question === null || this.selected_answer === null) return;

        const q = this.selected_question;
        const a = this.selected_answer;
        this.selected_question = null;
        this.selected_answer = null;

        if (this.minigameModel.questions[q].id === this.minigameModel.answers[a].id) {
            this.minigameModel.addPair(q, a);
            this.correct_questions.add(q);
            this.correct_answers.add(a);
            this.view.questionCardSelected(q, CORRECT_COLOR);
            this.view.answerCardSelected(a, CORRECT_COLOR);
            this.view.lockQuestionCard(q);
            this.view.lockAnswerCard(a);
            if (this.minigameModel.amount_answered === this.minigameModel.NUMBER_OF_QUESTIONS) {
                this.endRound();
            }
        }
        else {
            this.wrong_pair = {q, a};
            this.view.questionCardSelected(q, WRONG_COLOR);
            this.view.answerCardSelected(a, WRONG_COLOR);
        }
    }

    clearWrongPair() {
        if (this.wrong_pair === null) return;
        this.view.questionCardDeselected(this.wrong_pair.q);
        this.view.answerCardDeselected(this.wrong_pair.a);
        this.wrong_pair = null;
    }

    getView(): MinigameView {
        return this.view;
    }
}
