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

    constructor(question_number: number, location: string, question: string, answer: number) {
        this.question_number = question_number;
        this.location = location;
        this.question = question;
        this.answer = answer;
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
<<<<<<< HEAD
<<<<<<< HEAD
=======

    matches(answer: number) {
        return Math.round(answer * 100) === Math.round(this.answer * 100);
    }
>>>>>>> e6f8cb43442b60a166c5a042af603d10f4ffaeab
=======
>>>>>>> c92d50012c13dce95df7f9755a397154132c3a4b
}