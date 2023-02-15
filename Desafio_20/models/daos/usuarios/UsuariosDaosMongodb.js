import UsuairosModel from '../../model/user.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';

class UsuariosDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(UsuairosModel);
      }
      async getUserByEmail(email) {
            try {
                  const result = await this.schema.find(
                        { email: email },
                        { __v: 0 }
                  );
                  return result[0];
            } catch (error) {
                  logger.error(
                        `[getUserByEmail] UsuariosDaosMongodb ,${error.message}`
                  );
            }
      }
}
export default UsuariosDaosMongoDb;
