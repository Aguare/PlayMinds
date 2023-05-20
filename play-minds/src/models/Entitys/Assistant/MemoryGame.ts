import { Game } from "../Game";
import { Image } from "../Imag";

export class MemoryGame {
  game: Game;
  imageList: Image[];

  constructor(game: Game, imageList: Image[]) {
    this.game = game;
    this.imageList = imageList;
  }
}
