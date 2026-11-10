import { describe, it, test, expect } from "vitest";
import { MinigameQuestion, MinigameAnswer, MinigameModel } from '../../src/data/minigameModel'

const minigameModel = new MinigameModel();

describe('Minigame Model', () => {
    it('should generate an array of 5 shuffled questions with ids', () => {
        expect(minigameModel.questions).toHaveLength(5);
        expect(minigameModel.answers).toHaveLength(5);
        expect(minigameModel.questions).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    question: expect.any(String),
                    id: expect.any(Number),
                }),
            ])
        );
        expect(minigameModel.answers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    answer: expect.any(String),
                    id: expect.any(Number),
                }),
            ])
        );
    });

    it('should keep track of selected questions/answers', () => {
        expect(minigameModel.waiting_for_second).toBe(false);
        expect(minigameModel.currently_selected).toBe(null);
        expect(minigameModel.player_answers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    q: 5,
                    a: 5,
                }),
            ])
        );
        expect(minigameModel.amount_answered).toBe(0);
        minigameModel.selectQuestion(2);
        expect(minigameModel.waiting_for_second).toBe(true);
        expect(minigameModel.currently_selected).toBe('question');
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 5});
        expect(minigameModel.amount_answered).toBe(0);
        minigameModel.selectAnswer(3);
        expect(minigameModel.waiting_for_second).toBe(false);
        expect(minigameModel.currently_selected).toBe(null);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(1);
        minigameModel.selectQuestion(4);
        expect(minigameModel.waiting_for_second).toBe(true);
        expect(minigameModel.currently_selected).toBe('question');
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 4, a: 5});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(1);
        minigameModel.selectQuestion(3);
        expect(minigameModel.waiting_for_second).toBe(true);
        expect(minigameModel.currently_selected).toBe('question');
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 3, a: 5});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(1);
        minigameModel.selectAnswer(4);
        expect(minigameModel.waiting_for_second).toBe(false);
        expect(minigameModel.currently_selected).toBe(null);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 3, a: 4});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(2);
        minigameModel.selectAnswer(1);
        expect(minigameModel.waiting_for_second).toBe(true);
        expect(minigameModel.currently_selected).toBe('answer');
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 3, a: 4});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 1});
        expect(minigameModel.amount_answered).toBe(2);
        minigameModel.selectAnswer(2);
        expect(minigameModel.waiting_for_second).toBe(true);
        expect(minigameModel.currently_selected).toBe('answer');
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 3, a: 4});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 2});
        expect(minigameModel.amount_answered).toBe(2);
        minigameModel.selectQuestion(0);
        expect(minigameModel.waiting_for_second).toBe(false);
        expect(minigameModel.currently_selected).toBe(null);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 3, a: 4});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 0, a: 2});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(3);
    })

})


