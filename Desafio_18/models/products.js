import mongoose from "mongoose";
import DB from "../db/db.js";

class Productos extends DB {
    constructor() {
        super(mongoose.model("productos", {
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            url: { type: String, required: true }
        }))
    }

    async agregarProducto(producto) {
        await super.añadirData(producto);
    }

    async leerProductos() {
        return await super.conseguirData()
    }
}

export default Productos