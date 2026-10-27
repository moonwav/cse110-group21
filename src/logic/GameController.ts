export type QuestionView = {
  number: number;
  total: number;
  score: number;
  scenario: string;
  prompt: string;
};

const currentQuestion: QuestionView = {
  number: 3,
  total: 10,
  score: 95,
  scenario: "Souvenir shop",
  prompt:
    "You set aside $80 for souvenirs. You want to spend 25% of that on a gift. What is the most you can spend?",
};

export function getCurrentQuestion(): QuestionView {
  return currentQuestion;
}
