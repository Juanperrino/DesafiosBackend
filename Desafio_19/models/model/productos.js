import mongoosse, { Schema } from 'mongoose';

const producto = new Schema({
      nombre: { type: String, required: true },
      codigo: { type: String, required: true },
      imagen: { type: String, required: true },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true },
});

export default mongoosse.model('Producto', producto);
