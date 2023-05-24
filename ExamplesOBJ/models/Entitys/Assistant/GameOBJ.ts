import { Game } from "../Game";

export class GameOBJ {
  game: Game;
  comments: Comment[];

  constructor(game: Game, comments: Comment[]) {
    this.game = game;
    this.comments = comments;
  }
}
