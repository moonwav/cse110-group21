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

        minigameModel.selectQuestion(1);
        minigameModel.selectAnswer(1);
        expect(minigameModel.waiting_for_second).toBe(false);
        expect(minigameModel.currently_selected).toBe(null);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 3, a: 4});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 0, a: 2});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 1, a: 1});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 5});
        expect(minigameModel.amount_answered).toBe(4);

        minigameModel.selectAnswer(0);
        expect(minigameModel.waiting_for_second).toBe(true);
        expect(minigameModel.currently_selected).toBe('answer');
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 3, a: 4});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 0, a: 2});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 1, a: 1});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 5, a: 0});
        expect(minigameModel.amount_answered).toBe(4);

        minigameModel.selectQuestion(4);
        expect(minigameModel.waiting_for_second).toBe(false);
        expect(minigameModel.currently_selected).toBe(null);
        expect(minigameModel.player_answers[0]).toStrictEqual({q: 2, a: 3});
        expect(minigameModel.player_answers[1]).toStrictEqual({q: 3, a: 4});
        expect(minigameModel.player_answers[2]).toStrictEqual({q: 0, a: 2});
        expect(minigameModel.player_answers[3]).toStrictEqual({q: 1, a: 1});
        expect(minigameModel.player_answers[4]).toStrictEqual({q: 4, a: 0});
        expect(minigameModel.amount_answered).toBe(5);

    })
})
    describe('deselect questions/answers', () => {
        const minigameModel2 = new MinigameModel();

        minigameModel2.selectQuestion(2);
        minigameModel2.selectAnswer(3);

        it('should remove the currently selected option', () =>{
            minigameModel2.selectQuestion(4);
            minigameModel2.deselectQuestion(4);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.player_answers).toStrictEqual([{q: 2, a: 3}, {q: 5, a: 5} , {q: 5, a: 5}, {q: 5, a: 5}, {q: 5, a: 5}]);
            expect(minigameModel2.amount_answered).toBe(1);

            minigameModel2.selectAnswer(1);
            minigameModel2.deselectAnswer(1);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.player_answers).toStrictEqual([{q: 2, a: 3}, {q: 5, a: 5} , {q: 5, a: 5}, {q: 5, a: 5}, {q: 5, a: 5}]);
            expect(minigameModel2.amount_answered).toBe(1);
        })

        it('should remove an option pair from the end with no option currently selected', ()=> {
            minigameModel2.selectQuestion(3);
            minigameModel2.selectAnswer(4);
            minigameModel2.selectQuestion(0);
            minigameModel2.selectAnswer(2);
            minigameModel2.deselectAnswer(2);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 2, a: 3});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 3, a: 4});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.amount_answered).toBe(2);

            minigameModel2.selectQuestion(0);
            expect(minigameModel2.currently_selected).toBe('question');
            expect(minigameModel2.waiting_for_second).toBe(true);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 2, a: 3});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 3, a: 4});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 0, a: 5});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            

            minigameModel2.selectAnswer(2);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 2, a: 3});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 3, a: 4});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 0, a: 2});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});

            minigameModel2.deselectQuestion(0);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.player_answers).toStrictEqual([{q: 2, a: 3}, {q: 3, a: 4}, {q: 5, a: 5}, {q: 5, a: 5}, {q: 5, a: 5}]);
            expect(minigameModel2.amount_answered).toBe(2);

        })

        it('should remove the option pair right before the currently selected', ()=> {
            minigameModel2.selectQuestion(0);
            minigameModel2.selectAnswer(2);
            minigameModel2.selectQuestion(1);
            minigameModel2.selectAnswer(0);
            minigameModel2.selectQuestion(4);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 2, a: 3});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 3, a: 4});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 0, a: 2});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 1, a: 0});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 4, a: 5});

            minigameModel2.deselectQuestion(1);
            expect(minigameModel2.currently_selected).toBe('question');
            expect(minigameModel2.waiting_for_second).toBe(true);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 2, a: 3});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 3, a: 4});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 0, a: 2});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 4, a: 5});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.amount_answered).toBe(3);

            minigameModel2.selectQuestion(1);
            minigameModel2.selectAnswer(0);
            minigameModel2.selectQuestion(4);

            minigameModel2.deselectAnswer(0);
            expect(minigameModel2.currently_selected).toBe('question');
            expect(minigameModel2.waiting_for_second).toBe(true);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 2, a: 3});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 3, a: 4});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 0, a: 2});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 4, a: 5});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.amount_answered).toBe(3);
        })
        
        it('should remove the option pair from the end and beginning and then remove all', ()=> {
            minigameModel2.selectQuestion(1);
            minigameModel2.selectAnswer(0);
            minigameModel2.selectQuestion(4);
            minigameModel2.selectAnswer(1);

            minigameModel2.deselectAnswer(1);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.waiting_for_second).toBe(false);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 2, a: 3});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 3, a: 4});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 0, a: 2});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 1, a: 0});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.amount_answered).toBe(4);

            minigameModel2.selectQuestion(4);
            minigameModel2.selectAnswer(1);

            minigameModel2.deselectQuestion(4);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.waiting_for_second).toBe(false);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 2, a: 3});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 3, a: 4});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 0, a: 2});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 1, a: 0});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.amount_answered).toBe(4);

            minigameModel2.deselectQuestion(2);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.waiting_for_second).toBe(false);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 3, a: 4});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 0, a: 2});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 1, a: 0});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.amount_answered).toBe(3);

            minigameModel2.deselectAnswer(4);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.waiting_for_second).toBe(false);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 0, a: 2});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 1, a: 0});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.amount_answered).toBe(2);

            minigameModel2.deselectAnswer(0);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.waiting_for_second).toBe(false);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 0, a: 2});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.amount_answered).toBe(1);

            minigameModel2.deselectQuestion(0);
            expect(minigameModel2.currently_selected).toBe(null);
            expect(minigameModel2.waiting_for_second).toBe(false);
            expect(minigameModel2.player_answers[0]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[1]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[2]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[3]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.player_answers[4]).toStrictEqual({q: 5, a: 5});
            expect(minigameModel2.amount_answered).toBe(0);
        })
    
    })



