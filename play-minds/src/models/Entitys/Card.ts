import { Imag } from "./Imag";

export class Card {
  idCard?: number;
  name: string;
  description: string;
  correct: boolean;
  image: Imag;

  constructor(
    idCard: number,
    name: string,
    image: Imag,
    description: string,
    correct: boolean
  ) {
    this.idCard = idCard;
    this.name = name;
    this.image = image;
    this.description = description;
    this.correct = correct;
  }
}
