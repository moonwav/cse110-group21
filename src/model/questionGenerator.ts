import type { QuestionTemplate } from "./questionTemplates";
import { questionTemplates } from "./questionTemplates";
import { formulas } from "./formulas";
import Question from "./Question";

const money = (value: number) => Math.round(value * 100) / 100;

function pickedNumbers(template: QuestionTemplate, random: () => number) {
  const numbers: Record<string, number> = {};
  for (const [name, variable] of Object.entries(template.variables)) {
    numbers[name] = variable.values[Math.floor(random() * variable.values.length)];
  }
  return numbers;
}

//Share the number fill-in between prompt and hint
function fillIn(text: string, numbers: Record<string, number>): string {
  let filled = text;
  for (const [name, value] of Object.entries(numbers)) {
    filled = filled.split(`{${name}}`).join(String(money(value)));
  }
  return filled;
}

export function generateQuestion(
  template: QuestionTemplate,
  questionNumber: number,
  random: () => number = Math.random,
): Question {
  const numbers = pickedNumbers(template, random);
  /*
  let prompt = template.prompt;
  for (const [name, value] of Object.entries(numbers)) {
    prompt = prompt.split(`{${name}}`).join(String(money(value)));
  }
  */

  return new Question(
    questionNumber,
    template.scenario,
    fillIn(template.prompt, numbers),
    money(formulas[template.formula](numbers)),
    template.points,
    fillIn(template.hint, numbers),
  );
}

export function generateTrip(random: () => number = Math.random) {
  return questionTemplates.map((template, index) =>
    generateQuestion(template, index + 1, random),
  );
}

/**
 * Pick options to display from the remaining questions
 */
export function pickOptions(
  questions: Question[],
  count: number,
  random: () => number = Math.random,
): Question[] {
  const remaining = questions.slice();  // makes a copy of the array
  const picked: Question[] = [];
  while(picked.length < count && remaining.length > 0) {
    const index = Math.floor(random() * remaining.length);
    picked.push(remaining[index]);
    remaining.splice(index, 1);  // remove one item at index (prevents duplicates)
  }
  return picked;
}
