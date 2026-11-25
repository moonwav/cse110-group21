import GameModel, { QuestionRecord } from './model';
import Question from './question';
import { ResultData } from '../data/resultModel';

/**
 * ScoreTracker: every scoring rule lives here.
 *
 * Each question earns its own points (easy 7, medium 10, hard 14; 100 in total).
 * A wrong try costs 1, 2, or 3 of those points. A hint costs 2, 3, or 5.
 * A reveal (only after a hint) makes the question earn 0.
 * The score shown during play is 100 minus the points lost so far.
 */

const PENALTY = {
    7: { wrong: 1, hint: 2 },
    10: { wrong: 2, hint: 3 },
    14: { wrong: 3, hint: 5 },
} as const;

function penaltyFor(question: Question) {
    return PENALTY[question.getPoints() as keyof typeof PENALTY];
}

/** A question is finished once it is answered correctly or revealed. */
export function isFinished(record: QuestionRecord): boolean {
    return record.correct || record.revealed;
}

/** Points this question can no longer earn. */
export function pointsLost(question: Question, record: QuestionRecord): number {
    if (record.revealed) return question.getPoints();
    const cost = penaltyFor(question);
    const hint = record.hintUsed ? cost.hint : 0;
    const wrong = record.wrongTries * cost.wrong;
    return Math.min(question.getPoints(), hint + wrong);
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
/** Everything the results screen shows. */
export function getResults(model: GameModel): ResultData {
    let wrongAnswers = 0;
    model.records.forEach((record) => {
        wrongAnswers += record.wrongTries;
    });
    return {
        percent: finalScore(model),
        wrongAnswers,
        hintsUsed: hintsUsed(model),
    };
}