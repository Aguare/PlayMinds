export class Notification {
  id?: number;
  message: string;
  viewed: boolean;
  redirect: string;
  user: string;

  constructor(
    id: number,
    message: string,
    viewed: boolean,
    redirect: string,
    user: string
  ) {
    this.id = id;
    this.message = message;
    this.viewed = viewed;
    this.redirect = redirect;
    this.user = user;
  }
}
