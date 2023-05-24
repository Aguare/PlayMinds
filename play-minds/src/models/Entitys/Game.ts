import { Request } from "@/helpers/requests";
import { User } from "./User";

export class Game {
  id_game?: string;
  name_game: string;
  type_game: string;
  description: string;
  value_points: number;
  user: User;

  constructor(
    id_game: string,
    name_game: string,
    type_game: string,
    description: string,
    value_points: number,
    user: User
  ) {
    this.id_game = id_game;
    this.name_game = name_game;
    this.type_game = type_game;
    this.description = description;
    this.value_points = value_points;
    this.user = user;
  }

  getImage() {
    switch (this.type_game) {
      case "CARD":
        return Request.SERVER_IMAGE + "/cardgame.png";
      case "HANGED":
        return Request.SERVER_IMAGE + "/hangedgame.png";
      case "QUIZ":
        return Request.SERVER_IMAGE + "/quizgame.png";
      case "MEMORY":
        return Request.SERVER_IMAGE + "/memorygame.png";
      default:
        return Request.SERVER_IMAGE + "/cardgame.png";
    }
  }
}
