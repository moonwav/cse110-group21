/**
 * Represents result of one game
 */
export type ResultData = {
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

const placeholderResults: ResultData = {
  percent: 0,
  wrongAnswers: 0,
  hintsUsed: 0,
};

export class ResultModel {
  private data: ResultData = placeholderResults;

  setResults(data: ResultData) {
    this.data = data;
  }

  getResults(): ResultData {
    return this.data;
  }

  getGrade(): Grade {
    // highest grade that qualifies is the grade earned
    for (const grade of grades) {
      if (this.data.percent >= grade.min) {
        return grade;
      }
    }
    // fallback returns F for invalid percents
    return grades[grades.length - 1];
  }
}