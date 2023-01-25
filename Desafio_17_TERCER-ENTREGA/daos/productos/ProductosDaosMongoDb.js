import ProductosModel from '../../model/productos.js';
import ContenedorMongoDb from '../../db/ContenedorMongoDb.js';
import logger from '../../logs/Loggers.js';

class ProductosDaosMongoDb extends ContenedorMongoDb {
    constructor() {
        super(ProductosModel);
    }
    /*Metodo para Crear un nuevo Producto */
    async newProduct(product) {
        try {
            product['timestamp'] = new Date().toLocaleString();
            await this.postItem(product);
        } catch (error) {
            logger.error(
                '[newProduct] ProductosDaosMongoDb',
                error.message
            );
        }
    }
    async getByCepa(cepa) {
        try {
            const result = await this.schema.find(
                { varietal: cepa },
                { __v: 0 }
            );
            return result;
        } catch (error) {
            logger.error('[getById ContenedorMongoDb]', error.message);
        }
    }
}
export default ProductosDaosMongoDb;
