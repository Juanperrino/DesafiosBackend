import mongoosse, { Schema } from 'mongoose';

const carrito = new Schema({
    timestamp: { type: String, required: true },
    productos: { type: Array, required: true },
    user: { type: String, required: true },
});

export default mongoosse.model('Carrito', carrito);
