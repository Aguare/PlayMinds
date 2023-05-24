export class Comment {
  id_comment?: number;
  game_id_game: string;
  user_email: string;
  comment: string;
  date_comment: Date;
  constructor(
    id_comment: number,
    game_id_game: string,
    user_email: string,
    comment: string,
    date_comment: Date
  ) {
    this.id_comment = id_comment;
    this.game_id_game = game_id_game;
    this.user_email = user_email;
    this.comment = comment;
    this. date_comment =  date_comment;
  }
}