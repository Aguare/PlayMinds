export class Phrase {
  id_phrase?: number;
  phrase: string;
  hint: string;

  constructor(id_phrase: number, phrase: string, hint: string) {
    this.id_phrase = id_phrase;
    this.phrase = phrase;
    this.hint = hint;
  }
}
