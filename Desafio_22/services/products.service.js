import ProdutoRepository from './../models/repositories/Producto.repository.js';
import Productos from './../models/Producto.model.js';
import ProductoDto from './../models/dto/Producto.dto.js';
const repository = new ProdutoRepository();
class ProductoService {
      constructor() { }

      async getAllProducts(query) {
            const products = await repository.get(query);
            return products.map((product) => new ProductoDto(product));
      }

      async postProduct(data) {
            const product = await repository.create(new Productos(data));
            return new ProductoDto(product);
      }

      async deleteProduct(id) {
            const data = await repository.deleteProduct(id);
            return data;
      }
      async getProductosById(id) {
            const producto = await repository.getById(id);
            return new ProductoDto(producto);
      }
      async upDate(id, data) {
            const dato = await repository.upDate(id, data);
            return dato
      }
}
export default new ProductoService();
