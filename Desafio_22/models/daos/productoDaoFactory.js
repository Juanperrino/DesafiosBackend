import env from '../../config/env.js';
import ProductosDaosMongoDb from './productos/ProductosDaosMongodb.js';

class ProductoDaosFactory {
      static getProductDao() {
            switch (env.target) {
                  case 'file':
                        return console.log('File no found');
                  case 'mongo':
                        return ProductosDaosMongoDb.getInstance();
            }
      }
}
export default ProductoDaosFactory;
