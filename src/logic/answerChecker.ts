import { cValues } from "konva/lib/BezierFunctions";
import Question from "./question";

export type CheckResult = 
    | { status: "correct" }
    | { status: "incorrect" }
    | { status: "invalid"; message: string };

export class AnswerChecker {
    /** Returns input as a number or null */
    parse(input: string): number | null {
        const trimmedInput = input.trim();
        if (trimmedInput === "") {
            return null;
        }
        const answer = Number(trimmedInput);
        return Number.isNaN(answer) ? null : answer;
    }

    check(input: string, question: Question): CheckResult {
        const value = this.parse(input);
        if (value === null) {
            return { status: "invalid", message: "Please enter a valid number!"};
        }
        if (value === question.getAnswer()) {
            return { status: "correct" };
        }
        return { status: "incorrect" };
    }
}