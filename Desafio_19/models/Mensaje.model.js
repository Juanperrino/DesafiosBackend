export default class Mensaje {
      #id;
      #author;
      #text;
      #date;

      constructor(MensajeDto) {
            this.id = MensajeDto.id;
            this.author = MensajeDto.author;
            this.text = MensajeDto.text;
            this.date = MensajeDto.date;
      }
      set id(value) {
            this.#id = value;
      }
      get id() {
            return this.#id;
      }
      set author(value) {
            this.#author = value;
      }
      get author() {
            return this.#author;
      }

      set text(value) {
            this.#text = value;
      }
      get text() {
            return this.#text;
      }
      set date(value) {
            this.#date = value;
      }
      get date() {
            return this.#date;
      }
}
