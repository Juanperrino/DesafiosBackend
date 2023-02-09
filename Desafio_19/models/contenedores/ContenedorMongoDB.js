import mongoose from 'mongoose';
import logger from './../../helpers/logger.js';

class ContenedorMongoDb {
      constructor(schema) {
            this.schema = schema;
      }
      /*Metodo para Conectarse a la base de datos */
      async connect() {
            try {
                  const URI = process.env.MONGO_URL;
                  await mongoose.connect(URI);
                  logger.info('Conectado a la Base de datos MongoDb');
            } catch (error) {
                  logger.error(`[connect] ContenedorMongoDb, ${error.message}`);
            }
      }
      /*Metodo para obtener todos los Item */
      async getAll() {
            try {
                  const result = await this.schema.find({}, { __v: 0 });

                  return result;
            } catch (error) {
                  logger.error(`[getAll] ContenedorMongoDb, ${error.message}`);
            }
      }
      /*Metodo para obtener Item por id*/
      async getById(id) {
            try {
                  const result = await this.schema.find(
                        { _id: id },
                        { __v: 0 }
                  );
                  return result[0];
            } catch (error) {
                  logger.error(`[getById] ContenedorMongoDb, ${error.message}`);
            }
      }
      /*Metodo para Guardar */
      async postItem(data) {
            try {
                  const user = this.schema(data);
                  const result = await user.save();
                  return result;
            } catch (error) {
                  logger.error(
                        `[postItem] ContenedorMongoDb, ${error.message}`
                  );
            }
      }
      /*Metodo para Modificar */
      async putItem(id, data) {
            try {
                  const result = await this.schema.updateOne(
                        { _id: id },
                        { $set: data }
                  );
            } catch (error) {
                  logger.error(`[putItem] ContenedorMongoDb, ${error.message}`);
            }
      }
      /*Metodo para Eliminar */
      async deleteItem(id) {
            try {
                  const data = await this.getAll();
                  if (data.find((item) => item._id.toString() === id)) {
                        await this.schema.deleteOne({ _id: id });
                        return id;
                  } else {
                        throw new Error(`no se encontro  el id ${id}`);
                  }
            } catch (error) {
                  logger.error(
                        `[deleteItem] ContenedorMongoDb, ${error.message}`
                  );
            }
      }
}
export default ContenedorMongoDb;
