/**
 * Represents a results of one game
 */
export type ResultsData = {
  percent: number;
  wrongAnswers: number;
  hintsUsed: number;
};

/**
 * Represents final letter grade
 */
export type Grade = {
  letter: string;
  min: number;
  title: string;
  message: string;
};

/**
 * The text that appears with each letter grade
 */
const grades: Grade[] = [
  {
    letter: "A",
    min: 90,
    title: "PERCENTAGE EXPERT!",
    message: "Budgeted like a pro, great job! Keep practicing to stay sharp.",
  },
  {
    letter: "B",
    min: 80,
    title: "SAVVY SPENDER!",
    message: "Nice trip! A few slips, but you know your percentages.",
  },
  {
    letter: "C",
    min: 70,
    title: "GETTING THERE!",
    message: "Solid effort. Review the answer key to see where points went.",
  },
  {
    letter: "D",
    min: 60,
    title: "ALMOST THERE!",
    message: "Some tricky ones this time. Try another trip to practice.",
  },
  {
    letter: "F",
    min: 0,
    title: "KEEP PRACTICING!",
    message: "Percentages take practice. Check the answer key and play again!",
  },
];

const placeholderResults: ResultsData = {
  percent: 95,
  wrongAnswers: 7,
  hintsUsed: 15,
};

export class ResultsModel {
  private data: ResultsData;

  constructor(data: ResultsData = placeholderResults) {
    this.data = data;
  }

  getResults(): ResultsData {
    return this.data;
  }

  getGrade(): Grade {
    return (
      grades.find((grade) => this.data.percent >= grade.min) ??
      grades[grades.length - 1]
    );
  }
}