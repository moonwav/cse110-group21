
export type MinigameQuestionAnswer = {question: string, answer: string};

export type MinigameQuestionNumbers = {percent:number, multiplier: number, product: number};

export function numberGenerator(): MinigameQuestionNumbers {
    let percent =  Math.floor(Math.random()*(99))+1;
    let multiplier = Math.floor(Math.random()*200-3)+4;
    let product = (percent/100)*multiplier;

    while (percent <= 0 || product < 1 || (product*100 != Math.floor(product*100))) {
        percent = Math.floor(Math.random()*(99))+1;
        multiplier = Math.floor(Math.random()*200-3)+4;
        product = (percent/100)*multiplier;
    }
    product = Math.floor(product*100)/100;
    return {percent, multiplier, product};
}


export function minigameQuestionGenerator(numbers: MinigameQuestionNumbers): MinigameQuestionAnswer {
    switch(Math.floor(Math.random()*3)) {
        case 0:
            return{question: `What is ${numbers.percent}% of ${numbers.multiplier}?`, answer: `${numbers.product}`};

        case 1:
            return {question: `${numbers.product} is ${numbers.percent}% of what?`, answer: `${numbers.multiplier}`};

        case 2:
            return {question: `${numbers.product} is what percent of ${numbers.multiplier}?`, answer: `${numbers.percent}%`};
        default:
            return {question: `Something went wrong`, answer: 'Something went wrong'};
    }
}
