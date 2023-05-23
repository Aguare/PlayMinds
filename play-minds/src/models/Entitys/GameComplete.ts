export class GameComplete {
  user: string;
  game: string;
  date: Date;
  score: number;

  constructor(user: string, game: string, date: Date, score: number) {
    this.user = user;
    this.game = game;
    this.date = date;
    this.score = score;
  }
}
