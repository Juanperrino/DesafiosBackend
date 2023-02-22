import productsService from '../services/products.service.js';

class ProductController {
      constructor() { }
      async getAllProducts(req, res) {
            const data = await productsService.getAllProducts();
            return res.status(200).json(data);
      }

      async getProductosById(req, res) {
            const { id } = req.params;
            const data = await productsService.getProductosById(id);
            return res.status(200).json(data);
      }
      async postProduct(req, res) {
            const { body } = req;
            const data = await productsService.postProduct(body);

            return res.status(201).json(data);
      }

      async deleteProduct(req, res) {
            const { id } = req.params;
            await productsService.deleteProduct(id);
            const data = await productsService.getAllProducts();
            return res.status(200).json(data);
      }
      async putProduct(req, res) {
            const { body } = req;
            await productsService.upDate(body.id, body);
            const data = await productsService.getAllProducts();
            return res.status(200).json(data);
      }
}
export default new ProductController();
