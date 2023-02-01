import mongoose from "mongoose";
import DB from "../db/db.js";

class Mensajes extends DB {
    constructor() {
        super(mongoose.model("mensajes", {
            message: { type: String, required: true },
            email: { type: String, required: true }
        }))
    }

    async agregarMensaje(mensaje) {
        await super.añadirData(mensaje);
    }

    async leerMensajes() {
        return await super.conseguirData()
    }
}

export default Mensajes