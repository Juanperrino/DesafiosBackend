import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

class DB {
    constructor(schema) {
        this.schema = schema
    }

    async conseguirData() {
        try {
            return await this.schema.find({})
        } catch (error) {
            console.log("Hubo un error al conseguir la data de la tabla " + this.schema + "\n" + error)
            throw Error("error")
        }
    }

    async añadirData(data) {
        try {
            const result = await this.schema(data).save()
            return result
        } catch (error) {
            console.log("Hubo un error al añadir la data de la coleccion " + this.schema + "\n" + error)
            throw Error("error")
        }
    }
}

export default DB;