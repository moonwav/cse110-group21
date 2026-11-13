import Question, { parsePlayerAnswer } from "./question";

export type CheckResult = 
    | { status: "correct" }
    | { status: "incorrect" }
    | { status: "invalid"; message: string };

// Compare player's answer w/ question's answer
export function checkAnswer(input: string, question: Question): CheckResult {
    const value = parsePlayerAnswer(input);
    if (value === null) {
        return { status: "invalid", message: "Enter a number."};
    }
    return Math.round(value * 100) === Math.round(question.getAnswer() * 100) ?
        { status: "correct"} : { status: "incorrect" };
}