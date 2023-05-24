export class Comment {
  game_id_game: string;
  user_email: string;
  comment: string;
  date: Date;

  constructor(
    game_id_game: string,
    user_email: string,
    comment: string,
    date: Date
  ) {
    this.game_id_game = game_id_game;
    this.user_email = user_email;
    this.comment = comment;
    this.date = date;
  }
}
