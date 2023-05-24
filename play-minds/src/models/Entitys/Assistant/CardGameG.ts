import { Card } from "../Card";
import { Game } from "../Game";

export class CardGameG {
  game: Game;
  cards: Card[];

  constructor(game: Game, cards: Card[]) {
    this.game = game;
    this.cards = cards;
  }
}
