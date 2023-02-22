import { Normalizador } from '../helpers/Normalizer.js';
import MessageService from '../services/mensajes.service.js';

class MessageController {
      constructor() { }

      async getAllMessages() {
            const dataMensajes = await MessageService.getAllMessages();
            const mensajes = await Normalizador(dataMensajes);
            return mensajes;
      }
      async PostMessage(data) {
            const mensaje = await MessageService.PostMessage(data);
            return mensaje;
      }
}

export default new MessageController();
