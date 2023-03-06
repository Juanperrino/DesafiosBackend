import mongoose from 'mongoose';
class ContenedorMongoDb {
      constructor(schema) {
            this.schema = schema;
            mongoose.set('strictQuery', false)
      }
      /*Metodo para Conectarse a la base de datos */
      connect() {
            try {
                  const URI = 'mongodb+srv://jap90:OWMCIMhyZvbu1BZh@cluster0.x25rj5v.mongodb.net/koa';
                  mongoose.connect(URI);
                  console.log('Conectado a la Base de datos MongoDb');
            } catch (error) {
                  console.log(`[connect] ContenedorMongoDb, ${error.message}`);
            }
      }
      /*Metodo para obtener todos los Item */
      async getAll() {
            try {
                  const result = await this.schema.find({}, { __v: 0 });

                  return result;
            } catch (error) {
                  console.log(`[getAll] ContenedorMongoDb, ${error.message}`);
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
                  console.log(`[getById] ContenedorMongoDb, ${error.message}`);
            }
      }
      /*Metodo para Guardar */
      async postItem(data) {
            try {
                  const user = this.schema(data);
                  const result = await user.save();
                  return result;
            } catch (error) {
                  console.log(
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
                  console.log(`[putItem] ContenedorMongoDb, ${error.message}`);
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
                  console.log(
                        `[deleteItem] ContenedorMongoDb, ${error.message}`
                  );
                  return false;
            }
      }
}
export default ContenedorMongoDb;
