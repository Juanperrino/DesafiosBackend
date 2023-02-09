export default class MensajeDto {
      constructor(mensaje) {
            this.id = mensaje.id;
            this.author = mensaje.author;
            this.text = mensaje.text;
            this.date = mensaje.date;
      }
}
