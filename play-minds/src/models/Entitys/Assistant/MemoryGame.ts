import { Game } from "../Game";
import { Image } from "../Image";

export class MemoryGame {
  game: Game;
  imageList: Image[];

  constructor(game: Game, imageList: Image[]) {
    this.game = game;
    this.imageList = imageList;
  }
}
