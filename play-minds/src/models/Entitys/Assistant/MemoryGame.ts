import { Game } from "../Game";
import { Imag } from "../Imag";

export class MemoryGame {
  game: Game;
  imageList: Imag[];

  constructor(game: Game, imageList: Imag[]) {
    this.game = game;
    this.imageList = imageList;
  }
}
