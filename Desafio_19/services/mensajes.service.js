/* import { Mensaje } from '../models/daos/index.js'; */
import Mensaje from '../models/Mensaje.model.js';
import MensajeRepository from './../models/repositories/Mensaje.repository.js';
import MensajeDto from './../models/dto/Mensaje.dto.js';

const repository = new MensajeRepository();

class MessageService {
      constructor() {}

      async getAllMessages(query) {
            const mensajes = await repository.get(query);
            return mensajes.map((mensaje) => new MensajeDto(mensaje));
      }

      async PostMessage(data) {
            const mensaje = await repository.create(new Mensaje(data));
            return new MensajeDto(mensaje);
      }
}
export default new MessageService();
