import { Server } from "socket.io"
import mongoose from "mongoose"
import { Productos, Mensajes } from "./db/db.js"
import { normalizar } from "./utils/normalize.js";

let io;

const initServer = (httpServer) => {
    io = new Server(httpServer);
    setEvents(io)
}

const setEvents = (io) => {

    mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)

    const ProductosDB = new Productos();
    const MensajesDB = new Mensajes();

    io.on("connection", async (socketClient) => {
        console.log("Se ha conectado un nuevo cliente, id: " + socketClient.id);

        if (await ProductosDB.leerProductos().length !== 0) {
            emit("product-history", await ProductosDB.leerProductos())
        }

        if (await MensajesDB.leerMensajes().length !== 0) {
            emit("message-history", normalizar(await MensajesDB.leerMensajes()))
        }

        socketClient.on("disconnection", () => {
            console.log("Se ha desconectado el cliente con la id " + socketClient.id);
        })

        socketClient.on("product", async (data) => {

            try {
                await ProductosDB.agregarProducto(data)
            } catch (error) {
                console.log(error)
            }
            emit("product", await ProductosDB.leerProductos())
        })

        socketClient.on("message", async ({ id, nombre, apellido, edad, alias, avatar, mensaje }) => {

            try {
                await MensajesDB.agregarMensaje({
                    author: {
                        email: id,
                        nombre,
                        apellido,
                        edad,
                        alias,
                        avatar
                    },
                    text: mensaje,
                    created_at: Date.now()
                })
            } catch (error) {
                console.log(error)
            }

            const arrayMensajes = await MensajesDB.leerMensajes()
            emit("message", normalizar(arrayMensajes))
        })
    })

}

const emit = (action, data) => {
    io.emit(action, data)
}

export {
    initServer,
    emit
}