import Konva from "konva";

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

function button(
  layer: Konva.Layer,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize: number,
) {
  const group = new Konva.Group({ x, y });
  group.add(
    new Konva.Rect({
      width,
      height,
      fill: "#92a1df",
      cornerRadius: 35,
    }),
  );
  const text = new Konva.Text({
    text: label,
    width,
    fontFamily: "Silkscreen",
    fontStyle: "bold",
    fontSize,
    fill: "#000",
    align: "center",
  });
  text.y((height - text.height()) / 2);
  group.add(text);
  group.on("mouseenter", () => {
    group.getStage()?.container().style.setProperty("cursor", "pointer");
  });
  group.on("mouseleave", () => {
    group.getStage()?.container().style.setProperty("cursor", "default");
  });
  layer.add(group);
}

function draw(
  stage: Konva.Stage,
  layer: Konva.Layer,
  input: HTMLInputElement,
  question: QuestionView,
) {
  const width = stage.width();
  const height = stage.height();
  layer.destroyChildren();

  layer.add(new Konva.Rect({ width, height, fill: "#4a5a9a" }));

  const marginX = Math.min(70, width * 0.05);
  const marginY = Math.min(62, height * 0.06);
  const cardWidth = Math.max(280, Math.min(1300, width - marginX * 2));
  const cardHeight = Math.max(420, Math.min(900, height - marginY * 2));
  const cardX = (width - cardWidth) / 2;
  const cardY = (height - cardHeight) / 2;
  const compact = cardWidth < 860;
  const padX = compact ? 24 : 64;
  const padTop = compact ? 28 : 56;
  const padBottom = compact ? 24 : 48;
  const contentX = cardX + padX;
  const contentWidth = cardWidth - padX * 2;
  const headerSize = compact ? 22 : 36;
  const promptSize = compact ? 28 : 36;

  layer.add(
    new Konva.Rect({
      x: cardX,
      y: cardY,
      width: cardWidth,
      height: cardHeight,
      fill: "#c2cae9",
      cornerRadius: 25,
    }),
  );

  let y = cardY + padTop;
  const progress = new Konva.Text({
    x: contentX,
    y,
    text: `QUESTION ${question.number} OF ${question.total}`,
    fontFamily: "Silkscreen",
    fontStyle: "bold",
    fontSize: headerSize,
    fill: "#000",
  });
  const score = new Konva.Text({
    text: `SCORE ${question.score}`,
    fontFamily: "Silkscreen",
    fontStyle: "bold",
    fontSize: headerSize,
    fill: "#000",
  });
  const percent = new Konva.Text({
    text: "%",
    fontFamily: "Silkscreen",
    fontSize: headerSize,
    fill: "#000",
  });
  const scoreWidth = score.width() + percent.width();
  progress.width(Math.max(40, contentWidth - scoreWidth - 12));
  score.position({ x: contentX + contentWidth - scoreWidth, y });
  percent.position({ x: score.x() + score.width(), y });
  layer.add(progress, score, percent);
  y += Math.max(progress.height(), score.height()) + 24;

  const grade = currentGrade(question.score);
  let pillX = contentX;
  let pillY = y;
  for (const item of grades) {
    const label = new Konva.Text({
      text: `${item.letter} ${item.label}`,
      fontFamily: "Roboto",
      fontSize: 22,
      fill: "#000",
    });
    const pillWidth = label.width() + 40;
    const pillHeight = 46;
    if (pillX > contentX && pillX + pillWidth > contentX + contentWidth) {
      pillX = contentX;
      pillY += pillHeight + 12;
    }
    layer.add(
      new Konva.Rect({
        x: pillX,
        y: pillY,
        width: pillWidth,
        height: pillHeight,
        fill: item.letter === grade ? "#92a1df" : "#fff",
        cornerRadius: pillHeight / 2,
      }),
    );
    label.position({
      x: pillX + 20,
      y: pillY + (pillHeight - label.height()) / 2,
    });
    layer.add(label);
    pillX += pillWidth + 12;
  }
  y = pillY + 46 + 24;

  const scenario = new Konva.Text({
    x: contentX,
    y,
    width: contentWidth,
    text: question.scenario,
    fontFamily: "Roboto",
    fontSize: compact ? 20 : 24,
    fill: "#000",
  });
  layer.add(scenario);
  y += scenario.height() + 12;

  const prompt = new Konva.Text({
    x: contentX,
    y,
    width: contentWidth,
    text: question.prompt,
    fontFamily: "Roboto",
    fontSize: promptSize,
    lineHeight: 1.4,
    fill: "#000",
  });
  layer.add(prompt);
  y += prompt.height() + 28;

  const answerLabel = new Konva.Text({
    x: contentX,
    y,
    text: "Your answer",
    fontFamily: "Roboto",
    fontSize: compact ? 20 : 24,
    fill: "#000",
  });
  layer.add(answerLabel);
  y += answerLabel.height() + 12;

  const boxWidth = Math.min(420, contentWidth);
  const boxHeight = 96;
  layer.add(
    new Konva.Rect({
      x: contentX,
      y,
      width: boxWidth,
      height: boxHeight,
      fill: "#fff",
      cornerRadius: 25,
    }),
  );
  const dollar = new Konva.Text({
    x: contentX + 24,
    text: "$",
    fontFamily: "Roboto",
    fontSize: 40,
    fill: "#000",
  });
  dollar.y(y + (boxHeight - dollar.height()) / 2);
  layer.add(dollar);

  const fieldHeight = 48;
  input.style.left = `${dollar.x() + dollar.width() + 12}px`;
  input.style.top = `${y + (boxHeight - fieldHeight) / 2}px`;
  input.style.width = `${contentX + boxWidth - 24 - (dollar.x() + dollar.width() + 12)}px`;
  input.style.height = `${fieldHeight}px`;
  input.style.fontSize = "40px";

  const submitWidth = compact ? (contentWidth - 12) / 2 : 320;
  const hintWidth = compact ? (contentWidth - 12) / 2 : 240;
  const submitHeight = compact ? 72 : 96;
  const hintHeight = compact ? 72 : 84;
  const buttonFont = compact ? 28 : 48;
  const hintFont = compact ? 28 : 36;
  const actionsY = cardY + cardHeight - padBottom - submitHeight;
  const submitX = compact ? contentX : cardX + (cardWidth - submitWidth) / 2;
  const hintX = compact ? contentX + submitWidth + 12 : contentX + contentWidth - hintWidth;

  button(layer, "SUBMIT", submitX, actionsY, submitWidth, submitHeight, buttonFont);
  button(
    layer,
    "HINT",
    hintX,
    actionsY + (submitHeight - hintHeight) / 2,
    hintWidth,
    hintHeight,
    hintFont,
  );
}

async function loadFonts() {
  await document.fonts.ready;
  await Promise.all([
    document.fonts.load("700 48px Silkscreen"),
    document.fonts.load("400 36px Silkscreen"),
    document.fonts.load("400 40px Roboto"),
    document.fonts.load("400 36px Roboto"),
    document.fonts.load("400 24px Roboto"),
    document.fonts.load("400 22px Roboto"),
  ]);
}

export function showQuestionScreen(
  root: HTMLDivElement,
  question: QuestionView = sample,
) {
  root.replaceChildren();

  const stage = new Konva.Stage({
    container: root,
    width: root.clientWidth,
    height: root.clientHeight,
  });
  const layer = new Konva.Layer();
  stage.add(layer);

  const input = document.createElement("input");
  input.className = "answer-field";
  input.name = "answer";
  input.inputMode = "decimal";
  input.autocomplete = "off";
  input.setAttribute("aria-label", "Your answer");
  root.append(input);

  const render = () => {
    stage.width(root.clientWidth);
    stage.height(root.clientHeight);
    draw(stage, layer, input, question);
  };

  void loadFonts().then(render);
  new ResizeObserver(render).observe(root);
}
