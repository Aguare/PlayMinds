import { Answer } from "../Answer";
import { Question } from "../Question";

export class QuestionOBJ {
  question: Question;
  answers: Answer[];

  constructor(question: Question, answers: Answer[]) {
    this.question = question;
    this.answers = answers;
  }
}
