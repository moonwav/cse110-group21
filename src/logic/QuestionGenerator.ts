import type { QuestionTemplate } from "../data/questionTemplates";
import { questionTemplates } from "../data/questionTemplates";
import { formulas } from "./formulas";
import Question from "./question";

const money = (value: number) => Math.round(value * 100) / 100;

function pickedNumbers(template: QuestionTemplate, random: () => number) {
  const numbers: Record<string, number> = {};
  for (const [name, variable] of Object.entries(template.variables)) {
    numbers[name] = variable.values[Math.floor(random() * variable.values.length)];
  }
  return numbers;
}

export function generateQuestion(
  template: QuestionTemplate,
  questionNumber: number,
  random: () => number = Math.random,
): Question {
  const numbers = pickedNumbers(template, random);
  let prompt = template.prompt;
  for (const [name, value] of Object.entries(numbers)) {
    prompt = prompt.split(`{${name}}`).join(String(money(value)));
  }

  return new Question(
    questionNumber,
    template.scenario,
    prompt,
    money(formulas[template.formula](numbers)),
  );
}

export function generateTrip(random: () => number = Math.random) {
  return questionTemplates.map((template, index) =>
    generateQuestion(template, index + 1, random),
  );
}
