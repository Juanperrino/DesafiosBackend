import mongoosse, { Schema } from 'mongoose';

const producto = new Schema({
    nombre: { type: String, required: true },
    bodega: { type: String, required: true },
    stock: { type: Number, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true },
    descripcion: { type: String, required: true },
    timestamp: { type: String, required: false },
});

export default mongoosse.model('Producto', producto);
