import MensajeDto from './../dto/Mensaje.dto.js';
import Mensaje from './../Mensaje.model.js';
import MensajeDaosFactory from './../daos/mensajeDaoFactory.js';

export default class MensajeRepository {
      constructor() {
            this.dao = MensajeDaosFactory.getMensajeDao();
      }
      async create(mensaje) {
            const mensajeDto = await this.dao.postItem(new MensajeDto(mensaje));
            return new Mensaje(mensajeDto);
      }

      async get(query) {
            const mensajesDto = await this.dao.getAll(query);

            return mensajesDto.map((mensajeDto) => new Mensaje(mensajeDto));
      }
      async getById(id) {
            const mensajeDto = await this.dao.getById(id);
            return new Mensaje(mensajeDto);
      }
      async upDate(id, dato) {
            await this.dao.putItem(id, dato);
            return;
      }
      async deleteMensaje(id) {
            await this.dao.deleteItem(id);
            return;
      }
}
