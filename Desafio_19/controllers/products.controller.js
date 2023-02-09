import productsService from '../services/products.service.js';

class ProductController {
      constructor() {}
      async getAllProducts() {
            return await productsService.getAllProducts();
      }

      async postProduct(data) {
            await productsService.postProduct(data);
            const productos = await productsService.getAllProducts();
            return productos;
      }

      async deleteProduct(id) {
            await productsService.deleteProduct(id);
            const productos = await productsService.getAllProducts();
            return productos;
      }
      async getProductosById(id) {
            const producto = await productsService.getProductosById(id);
            return producto;
      }
      async putProduct(id, data) {
            await productsService.upDate(id, data);
            const productos = await productsService.getAllProducts();
            return productos;
      }
}
export default new ProductController();
