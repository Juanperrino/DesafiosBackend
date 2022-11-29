import mongoose, {Schema} from "mongoose";

class DB {
    constructor(schema){
        this.schema = schema
    }

    async conseguirData(){
        let data;
        try {
            return await this.schema.find({}, {__v: 0})
        } catch (error) {
            console.log("Hubo un error al conseguir data" + "\n" + error)
            throw Error(error)
        }
    }

    async añadirData(data){
        try {
            const result = await this.schema(data).save()
            return result
        } catch (error) {
            console.log("Hubo un error al añadir data"  + "\n" + error)
            throw Error(error)
        }
    }
}

class Mensajes extends DB {
    constructor(){
        super(mongoose.model("mensajes", new Schema({
            author: {
                email: {type: String, required: true},
                nombre: {type: String, required: true},
                apellido: {type: String, required: true},
                edad: {type: Number, required: true},
                alias: {type: String, required: true},
                avatar: {type: String, required: true}
            },
            text: { type: String, required: true},
            created_at: {type: Date}
        })))
    }

    async agregarMensaje(mensaje){
        await super.añadirData(mensaje);
    }

    async leerMensajes(){
        return await super.conseguirData()
    }
}

class Productos extends DB {
    constructor(){
        super(mongoose.model("productos", new Schema({
            nombre: {type: String, required: true},
            precio: {type: Number, required: true},
            url: {type: String, required: true}
        })))
    }

    async agregarProducto(producto){
        await super.añadirData(producto);
    }

    async leerProductos(){
        return await super.conseguirData()
    }
}

export {
    Productos,
    Mensajes
}