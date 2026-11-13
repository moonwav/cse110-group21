import { describe, it, test, expect } from "vitest";
import { numberGenerator, minigameQuestionGenerator } from '../../../src/screens/Minigame/minigameQuestionGenerator'

describe("Minigame question number generator", () => {
    const result1 = numberGenerator();
    const result2 = numberGenerator();
    const result3 = numberGenerator();

    it ("should generate percent as an integer greater than or equal to 1 and less than 100", () => {
        expect(result1.percent).toBeLessThanOrEqual(99);
        expect(result1.percent).toBeGreaterThanOrEqual(1);
        expect(result1.percent).toBe(Math.floor(result1.percent));

        expect(result2.percent).toBeLessThanOrEqual(99);
        expect(result2.percent).toBeGreaterThanOrEqual(1);
        expect(result2.percent).toBe(Math.floor(result2.percent));

        expect(result3.percent).toBeLessThanOrEqual(99);
        expect(result3.percent).toBeGreaterThanOrEqual(1);
        expect(result3.percent).toBe(Math.floor(result3.percent));
    })

    it("should generate multiplier as an integer greater than 0 and less than 100 ", () => {
        expect(result1.multiplier).toBeLessThanOrEqual(200);
        expect(result1.multiplier).toBeGreaterThanOrEqual(4);
        expect(result1.multiplier).toBe(Math.floor(result1.multiplier));

        expect(result2.multiplier).toBeLessThanOrEqual(200);
        expect(result2.multiplier).toBeGreaterThanOrEqual(4);
        expect(result2.multiplier).toBe(Math.floor(result2.multiplier));

        expect(result3.multiplier).toBeLessThanOrEqual(200);
        expect(result3.multiplier).toBeGreaterThanOrEqual(4);
        expect(result3.multiplier).toBe(Math.floor(result3.multiplier));
    })

    it ("should generate product such that it is greater than or equal to 1 ", () => {
        expect(result1.product).toBeGreaterThanOrEqual(1);
        expect(result2.product).toBeGreaterThanOrEqual(1);
        expect(result3.product).toBeGreaterThanOrEqual(1);
    })

    it("should generate percent, multiplier, and product such that (percent/100)*mulitplier = product", () => {
        expect(Math.floor(result1.percent*result1.multiplier)/100).toBe(result1.product);
        expect(Math.floor(result2.percent*result2.multiplier)/100).toBe(result2.product);
        expect(Math.floor(result3.percent*result3.multiplier)/100).toBe(result3.product);
    })
})

describe("minigame question generator", () => {

    it("should generate a question in the format of 1 of 3 format options with the correct matching anwser", () => {
        const numbers = numberGenerator();
        const question1 = minigameQuestionGenerator(numbers);
        const question2 = minigameQuestionGenerator(numbers);
        const question3 = minigameQuestionGenerator(numbers);
        const question4 = minigameQuestionGenerator(numbers);
        const question5 = minigameQuestionGenerator(numbers);

        const allowedSet = new Set([
            {question: `What is ${numbers.percent}% of ${numbers.multiplier}?`, 
            answer: `${numbers.product}`},
            {question: `${numbers.product} is ${numbers.percent}% of what?`, 
            answer: `${numbers.multiplier}`},
            {question: `${numbers.product} is what percent of ${numbers.multiplier}?`, 
            answer: `${numbers.percent}%`},
        ]);

        expect(question1).toBeOneOf(allowedSet);
        expect(question2).toBeOneOf(allowedSet);
        expect(question3).toBeOneOf(allowedSet);
        expect(question4).toBeOneOf(allowedSet);
        expect(question5).toBeOneOf(allowedSet);
    })

})



