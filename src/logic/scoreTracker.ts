import GameModel, { QuestionRecord } from './model';
import Question from './question';

/**
 * ScoreTracker: every scoring rule lives here.
 *
 * Each question earns its own points (easy 7, medium 10, hard 14; 100 in total).
 * Wrong tries are counted but cost nothing.
 * The score shown during play is 100 minus the points lost so far.
 */

/** A question is finished once it is answered correctly or revealed. */
export function isFinished(record: QuestionRecord): boolean {
    return record.correct || record.revealed;
}

/** Points this question can no longer earn. */
export function pointsLost(question: Question, record: QuestionRecord): number {
    // Nothing costs points yet; hints and reveals are added in #50.
    return 0;
}

/** Points this question has earned (0 until it is answered correctly). */
export function pointsEarned(question: Question, record: QuestionRecord): number {
    if (!record.correct) return 0;
    return question.getPoints() - pointsLost(question, record);
}

/** The score shown during play: 100 minus every point lost so far. */
export function currentScore(model: GameModel): number {
    let lost = 0;
    model.questions.forEach((question, i) => {
        lost += pointsLost(question, model.records[i]);
    });
    return 100 - lost;
}

/** The final score: the sum of points earned on every question. */
export function finalScore(model: GameModel): number {
    let earned = 0;
    model.questions.forEach((question, i) => {
        earned += pointsEarned(question, model.records[i]);
    });
    return earned;
}

export function recordCorrect(model: GameModel) {
    const record = model.getCurrentRecord();
    if (isFinished(record)) return;
    record.correct = true;
}

export function recordWrongTry(model: GameModel) {
    const record = model.getCurrentRecord();
    if (isFinished(record)) return;
    record.wrongTries += 1;
}