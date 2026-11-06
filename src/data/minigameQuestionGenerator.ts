
export type MinigameQuestion = {question: string, answer: number, answerPercent: boolean};

export type MinigameQuestionNumbers = {percent:number, multiplier: number, product: number};

export function numberGenerator(): MinigameQuestionNumbers {
    let percent =  Math.floor(Math.random()*(99))+1;
    let multiplier = Math.floor(Math.random()*200-3)+4;

    while (percent <= 0 || (percent/100)*multiplier < 1) {
        percent = Math.floor(Math.random()*(99))+1;
        multiplier = Math.floor(Math.random()*200-3)+4;
    }

    let product = (percent/100)*multiplier;
    return {percent, multiplier, product};
}


export function minigameQuestionGenerator(numbers: MinigameQuestionNumbers): MinigameQuestion{
    switch(Math.floor(Math.random()*3)) {
        case 0:
            return{question: `What is ${numbers.percent}% of ${numbers.multiplier}?`, answer: numbers.product, answerPercent: false};

        case 1:
            return {question: `${numbers.product} is ${numbers.percent}% of what?`, answer: numbers.multiplier, answerPercent: false};

        case 2:
            return {question: `${numbers.product} is what percent of ${numbers.multiplier}?`, answer: numbers.percent, answerPercent: true};
        default:
            return {question: `Something went wrong`, answer: 0, answerPercent: false};
    }
}
