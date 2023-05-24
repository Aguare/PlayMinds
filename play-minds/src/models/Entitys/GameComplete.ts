export class GameComplete {
  id?: number;
  user: string;
  game: string;
  date: Date;
  score: number;

  constructor(id: number, user: string, game: string, date: Date, score: number) {
    this.id = id;
    this.user = user;
    this.game = game;
    this.date = date;
    this.score = score;
  }
}
