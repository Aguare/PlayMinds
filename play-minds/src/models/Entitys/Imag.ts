import { Request } from "../../helpers/requests";
export class Imag {
  id?: number;
  path_img: string;
  show: boolean;

  constructor(path_img: string, show: boolean) {
    this.path_img = path_img;
    this.show = show;
    this.path_img = this.path_img.replace(
      "http://localhost:8080",
      Request.SERVER_API
     
    );
    console.log(this.path_img);
  }
}
