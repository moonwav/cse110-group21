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
=======

    matches(answer: number) {
        return Math.round(answer * 100) === Math.round(this.answer * 100);
    }
>>>>>>> e6f8cb43442b60a166c5a042af603d10f4ffaeab
}