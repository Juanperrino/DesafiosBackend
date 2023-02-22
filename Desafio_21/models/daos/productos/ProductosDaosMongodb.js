import ProductosModelModel from '../../model/productos.js';
import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';
let productoInstance = null;
class ProductosDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(ProductosModelModel);
            this.connect();
      }
      static getInstance() {
            if (!productoInstance) {
                  productoInstance = new ProductosDaosMongoDb();
            }
            return productoInstance;
      }
}
export default ProductosDaosMongoDb;
