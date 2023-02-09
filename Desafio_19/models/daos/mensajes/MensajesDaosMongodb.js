import CarritosModelModel from '../../model/mensajes.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';
let mensajeInstance = null;
class MensajesDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(CarritosModelModel);
      }
      static getInstance() {
            if (!mensajeInstance) {
                  mensajeInstance = new MensajesDaosMongoDb();
            }
            return mensajeInstance;
      }
}
export default MensajesDaosMongoDb;
