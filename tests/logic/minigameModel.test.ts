import { describe, it, test, expect } from "vitest";
import { MinigameQuestion, MinigameAnswer, MinigameModel } from '../../src/data/minigameModel'


describe('Minigame Model', () => {
    const minigameModel = new MinigameModel();
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

    it('should add new question/answer pairs to its list', () => {
        expect(minigameModel.player_answers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    q: 5,
                    a: 5,
                }),
            ])
        );
        expect(minigameModel.amount_answered).toBe(0);

        expect(minigameModel.addPair(1, 3)).toBe(0);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 1, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(1);
        expect(minigameModel.player_answers.length).toBe(5);

        expect(minigameModel.addPair(4, 2)).toBe(0);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 1, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 4, a: 2});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(2);
        expect(minigameModel.player_answers.length).toBe(5);

        expect(minigameModel.addPair(2, 0)).toBe(0);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 1, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 4, a: 2});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 2, a: 0});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(3);
        expect(minigameModel.player_answers.length).toBe(5);

        expect(minigameModel.addPair(0, 4)).toBe(0);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 1, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 4, a: 2});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 2, a: 0});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 0, a: 4});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(4);
        expect(minigameModel.player_answers.length).toBe(5);

        expect(minigameModel.addPair(3, 1)).toBe(0);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 1, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 4, a: 2});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 2, a: 0});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 0, a: 4});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 3, a: 1});
        expect(minigameModel.amount_answered).toBe(5);
        expect(minigameModel.player_answers.length).toBe(5);
    })

    it('should remove question/answer pairs', () => {
        expect(minigameModel.removePairQ(3)).toBe(1);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 1, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 4, a: 2});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 2, a: 0});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 0, a: 4});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(4);
        expect(minigameModel.player_answers.length).toBe(5);

        expect(minigameModel.removePairA(2)).toBe(4);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 1, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 2, a: 0});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 0, a: 4});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(3);
        expect(minigameModel.player_answers.length).toBe(5);

        expect(minigameModel.removePairA(3)).toBe(1);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 0});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 0, a: 4});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(2);
        expect(minigameModel.player_answers.length).toBe(5);

        expect(minigameModel.removePairQ(0)).toBe(4);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 0});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(1);
        expect(minigameModel.player_answers.length).toBe(5);

        expect(minigameModel.removePairQ(2)).toBe(0);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(0);
        expect(minigameModel.player_answers.length).toBe(5);
    })

    describe('should check solutions', () => {
        const minigame_model = new MinigameModel();
        const solns = minigame_model.getSolutions();
        it('and returns true when they are all correct', ()=> {
            for(let i: number = 0; i<minigame_model.NUMBER_OF_QUESTIONS; i++){
                minigame_model.addPair(solns[i].q, solns[i].a);
            }
            expect(minigame_model.checkAnswers()).toBe(true);
        })

        it('and returns false if one or more are incorrect', () =>{
            expect(minigame_model.removePairQ(solns[1].q)).toBe(solns[1].a);
            expect(minigame_model.removePairQ(solns[3].q)).toBe(solns[3].a);

            minigame_model.addPair(solns[1].q, solns[3].a);
            minigame_model.addPair(solns[3].q, solns[1].a);

            expect(minigame_model.checkAnswers()).toBe(false);
            
        });
        
    })
})



