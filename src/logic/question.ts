export function parsePlayerAnswer(text: string): number | null {
    const cleaned = text.trim().replace(/^\$/, "").replace(/,/g, "");
    if (!/^(\d+(\.\d{1,2})?|\.\d{1,2})$/.test(cleaned)) return null;
    return Number(cleaned);
}

export default class Question {
    question_number: number;
    location: string;
    question: string;
    answer: number;
    points: number;
    hint: string;

    constructor(question_number: number, location: string, question: string, answer: number, points: number, hint = "") {
        this.question_number = question_number;
        this.location = location;
        this.question = question;
        this.answer = answer;
        this.points = points;
        this.hint = hint;
    }

    getQuestionNumber() {
        return this.question_number
    }

    getLocation() {
        return this.location;
    }

    getQuestion() {
        return this.question;
    }

    getAnswer() {
        return this.answer;
    }

    getPoints() {
        return this.points;
    }

    getHint() {
        return this.hint;
    }
}