import type { QuestionTemplate } from "../data/questionTemplates";
import { questionTemplates } from "../data/questionTemplates";
import { formulas } from "./formulas";

export type GeneratedQuestion = {
  id: string;
  scenario: string;
  prompt: string;
  answer: number;
  points: number;
  hint: string;
};

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
  random: () => number = Math.random,
): GeneratedQuestion {
  const numbers = pickedNumbers(template, random);
  let prompt = template.prompt;
  for (const [name, value] of Object.entries(numbers)) {
    prompt = prompt.split(`{${name}}`).join(String(money(value)));
  }

  return {
    id: template.id,
    scenario: template.scenario,
    prompt,
    answer: money(formulas[template.formula](numbers)),
    points: template.points,
    hint: template.hint,
  };
}

export function generateTrip(random: () => number = Math.random) {
  return questionTemplates.map((template) => generateQuestion(template, random));
}
