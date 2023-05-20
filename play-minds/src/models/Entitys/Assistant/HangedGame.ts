import { Game } from "../Game";
import { Phrase } from "../Phrase";
export class HangedGame {
  game: Game;
  phrases: Phrase[];

  constructor(game: Game, phrases: Phrase[]) {
    this.game = game;
    this.phrases = phrases;
  }
}
