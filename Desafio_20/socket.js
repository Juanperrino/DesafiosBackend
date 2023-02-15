import { Server } from 'socket.io';
/* import { Producto } from './daos/index.js'; */

import ProductoController from './controllers/products.controller.js';
import MessageController from './controllers/mensajes.controller.js';

import logger from './helpers/logger.js';

/* se define la varible io*/
let io;

/* funcion para iniciar el socket.io*/
function initSocket(httpServer) {
      io = new Server(httpServer);
      setEvents(io);
}
/* funcion para los eventos de  el socket.io*/
async function setEvents(io) {
      /* conencion del cliente*/
      io.on('connect', async (socketClient) => {
            /*  lee los mensajes de la Base de datos*/

            const mensajes = await MessageController.getAllMessages();

            io.emit('history-message', mensajes);

            /*  lee los productos de la Base de datos*/
            await ProductoController.getAllProducts().then((data) => {
                  io.emit('history-products', data);
            });

            logger.info(`Se conecto el cliente con el id ${socketClient.id}`);
            /* se recibe nuevo mensaje*/
            socketClient.on('new-message', async (data) => {
                  /* se guarda el mensaje*/

                  await MessageController.PostMessage(data);

                  /* y se emite al cliente*/

                  io.emit('history-message', mensajes);
                  io.emit('notification-message', data);
            });
            /* se recibe el mail del cliente que escribe*/
            socketClient.on('new-isWriting', (data) => {
                  /* se emite el mail del cliente que escribe*/
                  io.emit('IsWriting', data);
            });

            /* se recibe un nuevo producto*/
            socketClient.on('new-product', async (data) => {
                  /* se guarda el producto en la Base de Datos*/
                  const productos = await ProductoController.postProduct(data);

                  /* y se emite*/

                  io.emit('history-products', data);
            });
            socketClient.on('delete-product', async (data) => {
                  /* se borrar el producto en la Base de Datos*/
                  const productos = await ProductoController.deleteProduct(
                        data
                  );

                  /* se vuelven enviar los productos */
                  io.emit('history-products', productos);
            });
            /* se piden un producto por la id */
            socketClient.on('getId-product', async (data) => {
                  let productId = [];
                  productId = await ProductoController.getProductosById(data);
                  /* se envia todos los datos del producto por id*/
                  io.emit('one-product', productId);
            });
            /* se edita el producto en la Base de Datos*/
            socketClient.on('edit-product', async (data) => {
                  const productos = await ProductoController.putProduct(
                        data.id,
                        data
                  );
                  io.emit('history-products', productos);
            });

            /* se avisa si se desconecto el cliente*/
            socketClient.on('disconnect', () => {
                  logger.info(
                        `Se desconecto el cliente con el id
                        ${socketClient.id}`
                  );
            });
      });
}
/*funcion para emitir*/
function emit(event, data) {
      io.emit(event, data);
}

export { initSocket, emit };
