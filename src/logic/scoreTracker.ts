import GameModel, { QuestionRecord } from './model';
import Question from './question';

/**
 * ScoreTracker: every scoring rule lives here.
 *
 * Each question earns its own points (easy 7, medium 10, hard 14; 100 in total).
 * Wrong tries are counted but cost nothing.
 * A hint costs 2 points from that question; a reveal (only after a hint) makes it earn 0.
 * The score shown during play is 100 minus the points lost so far.
 */

export const HINT_PENALTY = 2;

/** A question is finished once it is answered correctly or revealed. */
export function isFinished(record: QuestionRecord): boolean {
    return record.correct || record.revealed;
}

/** Points this question can no longer earn. */
export function pointsLost(question: Question, record: QuestionRecord): number {
    if (record.revealed) return question.getPoints();
    if (record.hintUsed) return HINT_PENALTY;
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

export function applyHint(model: GameModel) {
    const record = model.getCurrentRecord();
    if (isFinished(record) || record.hintUsed) return;
    record.hintUsed = true;
}

export function applyReveal(model: GameModel) {
    const record = model.getCurrentRecord();
    if (isFinished(record) || !record.hintUsed) return;
    record.revealed = true;
}

/** Questions where a hint was used. A hint followed by a reveal counts once. */
export function hintsUsed(model: GameModel): number {
    return model.records.filter((record) => record.hintUsed).length;
}