import type Question from './Question';

export const FALLBACK_HINT =
    'Re-read the question: which amount does the percent apply to, and do you add it or take it away?';

export function getHint(question: Question): string {
    const hint = question.getHint().trim();
    return hint === '' ? FALLBACK_HINT : hint;
}

export function getRevealedAnswer(question: Question): string {
    return `$${question.getAnswer().toFixed(2)}`;
}