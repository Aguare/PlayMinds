import { Image } from "./Image";

export class Card {
  idCard?: number;
  name: string;
  description: string;
  correct: boolean;
  image: Image;

  constructor(
    idCard: number,
    name: string,
    image: Image,
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
