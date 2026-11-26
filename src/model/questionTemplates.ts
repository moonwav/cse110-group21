export type Difficulty = "easy" | "medium" | "hard";

export type Category = "food" | "activities" | "shopping";

export type Formula =
  | "percentOf"
  | "discount"
  | "tip"
  | "tax"
  | "reverseTax"
  | "compare"
  | "discountThenTax";

export type QuestionTemplate = {
  id: string;
  difficulty: Difficulty;
  category: Category;
  scenario: string;
  prompt: string;
  variables: Record<string, { values: number[] }>;
  formula: Formula;
  points: number;
  hint: string;
  picture: string;
};

const easyPrices = [10, 20, 40, 60, 80, 100];
const easyPercents = [10, 25, 50];
const mediumPrices = [20, 40, 60, 80, 100];
const mediumPercents = [5, 15, 20, 30, 75];

export const questionTemplates: QuestionTemplate[] = [
  {
    id: "souvenir-budget",
    difficulty: "easy",
    category: "shopping",
    scenario: "Souvenir shop",
    prompt:
      "You set aside ${budget} for souvenirs. You want to spend {percent}% of that on a gift. What is the most you can spend?",
    variables: {
      budget: { values: easyPrices },
      percent: { values: easyPercents },
    },
    formula: "percentOf",
    points: 7,
    hint: "Multiply ${budget} by {percent}, then divide by 100.",
    picture: "/shopping.png"
  },
  {
    id: "snack-budget",
    difficulty: "easy",
    category: "food",
    scenario: "Snack stand",
    prompt:
      "You have ${budget} for snacks. You spend {percent}% of it. How much do you spend?",
    variables: {
      budget: { values: easyPrices },
      percent: { values: easyPercents },
    },
    formula: "percentOf",
    points: 7,
    hint: "Multiply ${budget} by {percent}, then divide by 100.",
    picture: "/lemonade_shop.png"
  },
  {
    id: "arcade-tickets",
    difficulty: "easy",
    category: "activities",
    scenario: "Arcade",
    prompt:
      "You brought ${budget} for games. You use {percent}% of it on tickets. How much is that?",
    variables: {
      budget: { values: easyPrices },
      percent: { values: easyPercents },
    },
    formula: "percentOf",
    points: 7,
    hint: "Multiply ${budget} by {percent}, then divide by 100.",
    picture: "/arcade.png"
  },
  {
    id: "lunch-drink",
    difficulty: "easy",
    category: "food",
    scenario: "Restaurant",
    prompt:
      "Your meal money is ${budget}. You spend {percent}% of it on a drink. What does the drink cost?",
    variables: {
      budget: { values: easyPrices },
      percent: { values: easyPercents },
    },
    formula: "percentOf",
    points: 7,
    hint: "Multiply ${budget} by {percent}, then divide by 100.",
    picture: "/restaurant.png"
  },
  {
    id: "jacket-discount",
    difficulty: "medium",
    category: "shopping",
    scenario: "Clothing shop",
    prompt: "A jacket costs ${price}. It is {percent}% off. What do you pay?",
    variables: {
      price: { values: mediumPrices },
      percent: { values: mediumPercents },
    },
    formula: "discount",
    points: 10,
    hint: "Find {percent}% of ${price}, then subtract it from ${price}.",
    picture: "/shopping_sale.png"
  },
  {
    id: "meal-tip",
    difficulty: "medium",
    category: "food",
    scenario: "Food court",
    prompt:
      "Your meal is ${price}. You leave a {percent}% tip. What is the total?",
    variables: {
      price: { values: mediumPrices },
      percent: { values: mediumPercents },
    },
    formula: "tip",
    points: 10,
    hint: "Find {percent}% of ${price}, then add it to ${price}.",
    picture: "/food_court.png"
  },
  {
    id: "ticket-tax",
    difficulty: "medium",
    category: "activities",
    scenario: "Park",
    prompt:
      "Tickets cost ${price}. Tax is {percent}%. What do you pay in total?",
    variables: {
      price: { values: mediumPrices },
      percent: { values: mediumPercents },
    },
    formula: "tax",
    points: 10,
    hint: "Find {percent}% of ${price}, then add it to ${price}.",
    picture: "/park.png"
  },
  {
    id: "sticker-before-tax",
    difficulty: "hard",
    category: "shopping",
    scenario: "Sticker shop",
    prompt:
      "A sticker costs ${price} after {percent}% tax. What was the price before tax?",
    variables: {
      price: { values: [10.8, 21.6, 32.4, 43.2, 54] },
      percent: { values: [8] },
    },
    formula: "reverseTax",
    points: 14,
    hint: "Divide ${price} by 1 plus {percent}% written as a decimal.",
    picture: "/stickers.png"
  },
  {
    id: "cheaper-ride",
    difficulty: "hard",
    category: "activities",
    scenario: "Go on a ride",
    prompt:
      "Ride A is ${priceA} with {percentA}% off. Ride B is ${priceB} with {percentB}% off. What is the lower price?",
    variables: {
      priceA: { values: [12.5, 18.75, 25, 30] },
      percentA: { values: [8, 12] },
      priceB: { values: [12.5, 18.75, 25, 30] },
      percentB: { values: [8, 12] },
    },
    formula: "compare",
    points: 14,
    hint: "Take {percentA}% off ${priceA} and {percentB}% off ${priceB}, then pick the lower price.",
    picture: "/rollercoaster.png"
  },
  {
    id: "hoodie-sale-tax",
    difficulty: "hard",
    category: "food",
    scenario: "Snack shop",
    prompt:
      "A snack pack costs ${price}. It is {discount}% off, then you pay {tax}% tax on the sale price. What do you pay?",
    variables: {
      price: { values: [12.5, 18.75, 25, 50] },
      discount: { values: [8, 12] },
      tax: { values: [8, 12] },
    },
    formula: "discountThenTax",
    points: 14,
    hint: "Take {discount}% off ${price}, then add {tax}% tax to what is left.",
    picture: "/sale.png"
  },
];
