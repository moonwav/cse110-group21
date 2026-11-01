import type { Formula } from "../data/questionTemplates";

export type Numbers = Record<string, number>;

const percent = (amount: number, rate: number) => (amount * rate) / 100;

export const formulas: Record<Formula, (n: Numbers) => number> = {
  percentOf: (n: Numbers) => percent(n.budget, n.percent),
  discount: (n: Numbers) => n.price - percent(n.price, n.percent),
  tip: (n: Numbers) => n.price + percent(n.price, n.percent),
  tax: (n: Numbers) => n.price + percent(n.price, n.percent),
  reverseTax: (n: Numbers) => n.price / (1 + n.percent / 100),
  compare: (n: Numbers) =>
    Math.min(
      n.priceA - percent(n.priceA, n.percentA),
      n.priceB - percent(n.priceB, n.percentB),
    ),
  discountThenTax: (n: Numbers) => {
    const sale = n.price - percent(n.price, n.discount);
    return sale + percent(sale, n.tax);
  },
};
