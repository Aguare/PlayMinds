import { Game } from "../Game";
import { QuestionOBJ } from "./QuestionOBJ";

export class QuizGame {
  game: Game;
  questions: QuestionOBJ[];

  constructor(game: Game, questions: QuestionOBJ[]) {
    this.game = game;
    this.questions = questions;
  }
}
