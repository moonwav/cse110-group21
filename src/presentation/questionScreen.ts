export type QuestionView = {
  number: number;
  total: number;
  score: number;
  scenario: string;
  prompt: string;
};

const grades = [
  { letter: "A", label: "90–100", min: 90 },
  { letter: "B", label: "80–89", min: 80 },
  { letter: "C", label: "70–79", min: 70 },
  { letter: "D", label: "60–69", min: 60 },
  { letter: "F", label: "0–59", min: 0 },
];

const sample: QuestionView = {
  number: 3,
  total: 10,
  score: 95,
  scenario: "Souvenir shop",
  prompt:
    "You set aside $80 for souvenirs. You want to spend 25% of that on a gift. What is the most you can spend?",
};

function currentGrade(score: number) {
  return grades.find((grade) => score >= grade.min)?.letter ?? "A";
}

export function showQuestionScreen(
  root: HTMLElement,
  question: QuestionView = sample,
) {
  const grade = currentGrade(question.score);
  root.innerHTML = `
    <form class="question-card">
      <header class="question-header">
        <p class="pixel">Question ${question.number} of ${question.total}</p>
        <p class="pixel">Score ${question.score}<span>%</span></p>
      </header>
      <ul class="grades">
        ${grades
          .map(
            (item) =>
              `<li class="${item.letter === grade ? "current" : ""}">${item.letter} ${item.label}</li>`,
          )
          .join("")}
      </ul>
      <div class="question-body">
        <p class="scenario"></p>
        <p class="prompt"></p>
      </div>
      <label class="answer">
        <span>Your answer</span>
        <span class="answer-input">$<input name="answer" inputmode="decimal" autocomplete="off" /></span>
      </label>
      <div class="question-actions">
        <span class="actions-pad"></span>
        <button class="pixel submit" type="submit">Submit</button>
        <button class="pixel hint" type="button">Hint</button>
      </div>
    </form>
  `;

  const scenario = root.querySelector(".scenario");
  const prompt = root.querySelector(".prompt");
  if (scenario) scenario.textContent = question.scenario;
  if (prompt) prompt.textContent = question.prompt;

  root.querySelector("form")?.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
