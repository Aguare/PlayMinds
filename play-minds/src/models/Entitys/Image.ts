export class Image {
  id?: number;
  path_img: string;
  show: boolean;

  constructor(path_img: string, show: boolean) {
    this.path_img = path_img;
    this.show = show;
  }
}
