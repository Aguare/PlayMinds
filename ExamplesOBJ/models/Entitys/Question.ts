export class Question {
  id?: number;
  ask: string;

  constructor(id: number, ask: string) {
    this.id = id;
    this.ask = ask;
  }
}
