import CarritosModelModel from '../../model/carritos.js';
import UserModel from '../../model/users.js';
import ContenedorMongoDb from '../../db/ContenedorMongoDb.js';
import ProductosDaosMongoDb from './../productos/ProductosDaosMongoDb.js';
import enviarMail from '../../utils/EmailSender.js';
import { sendWhatsapp, sendSms } from '../../utils/Twilio.js';
import logger from '../../logs/Loggers.js';

const prodControl = new ProductosDaosMongoDb();
class CarritosDaosMongoDb extends ContenedorMongoDb {
    constructor() {
        super(CarritosModelModel);
    }
    /*Metodo nuevo carrito*/
    async newCart(user) {
        try {
            let cart = {};
            cart['timestamp'] = new Date().toLocaleString();
            cart['productos'] = [];
            cart['user'] = user;
            this.postItem(cart);
            return cart['id'];
        } catch (error) {
            logger.error('[newCart] CarritosDaosMongoDb', error.message);
        }
    }
    /*Metodo para agregar producto en el carrito*/
    async newProductCart(idCart, idProduct) {
        try {
            let productos;
            let product = await prodControl.getById(idProduct);
            let cart = await this.getById(idCart);
            productos = [...cart.productos, product];
            cart.productos = productos;
            await this.putItem(idCart, cart);
        } catch (error) {
            logger.error(
                '[newProductCart] CarritosDaosMongoDb',
                error.message
            );
        }
    }
    /*Metodo para obtener los productos del carrito*/
    async getByIdProduct(id) {
        try {
            const data = await this.getById(id);
            let response = [];
            data.productos.map((item) => {
                response.push(item);
            });
            return response;
        } catch (error) {
            logger.error(
                '[getByIdProduct] CarritosDaosMongoDb',
                error.message
            );
        }
    }
    async getByUser(user) {
        try {
            const data = await this.schema.find(
                { user: user },
                { __v: 0 }
            );
            if (data == '') {
                this.newCart(user);
            }
            return data;
        } catch (error) {
            logger.error(
                '[getByUser] CarritosDaosMongoDb',
                error.message
            );
        }
    }
    /*Metodo para eliminar los productos del carrito*/
    async deleteProductById(idCart, idProduct) {
        try {
            const cart = await this.getById(idCart);
            let result = cart.productos.find(
                (item) => item._id.toString() === idProduct
            );
            if (!result) return;
            cart.productos = cart.productos.filter(
                (item) => item._id.toString() !== idProduct
            );
            await this.putItem(idCart, cart);
        } catch (error) {
            logger.error(
                '[deleteProductById] CarritosDaosMongoDb',
                error.message
            );
        }
    }
    async deleteProductByUser(user, idProduct) {
        try {
            const carrito = await this.getByUser(user),
                cart = carrito[0];

            let result = cart.productos.find(
                (item) => item._id.toString() === idProduct
            );

            if (!result) return;
            cart.productos = cart.productos.filter(
                (item) => item._id.toString() !== idProduct
            );
            await this.putItem(cart._id, cart);
        } catch (error) {
            logger.error(
                '[deleteProductByUser] CarritosDaosMongoDb',
                error.message
            );
        }
    }

    async finalizarCompra(userId) {
        let user = await UserModel.findOne({ email: userId });
        try {
            const carrito = await this.getByUser(user.email),
                cart = carrito[0];
            let lista = [];
            cart.productos.forEach((item) => {
                lista.push(item.nombre);
            });
            let mandarW = await sendWhatsapp(
                `Nuevo pedido de ${user.nombre},${lista}`,
                process.env.TEL_ADMIN
            );
            let mandarS = await sendSms(
                `Tu pedido esta en camino!
                        
                        ${lista}`,
                `+${user.telefono.toString()}`
            );
            let mandarE = await enviarMail(
                `Nuevo pedido de ${user.nombre} `,
                `Los productos son ${lista}`
            );
            cart.productos = [];
            await this.putItem(cart._id, cart);
        } catch (error) {
            logger.error(
                '[finalizarCompra] CarritosDaosMongoDb',
                error.message
            );
        }
    }
}
export default CarritosDaosMongoDb;
