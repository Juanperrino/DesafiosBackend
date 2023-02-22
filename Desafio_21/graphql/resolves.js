import mensajesService from '../services/mensajes.service.js';
import ProductoService from '../services/products.service.js';

export function getProducts() {
      return ProductoService.getAllProducts();
}
export function getProductById({ id }) {
      return ProductoService.getProductosById(id);
}

export function createProduct({ data }) {
      return ProductoService.postProduct(data);
}

export function setProduct({ id, data }) {
      return ProductoService.upDate(id, data);
}

export function deleteProduct(id) {
      return ProductoService.deleteProduct(id);
}
export function getMessage() {
      return mensajesService.getAllMessages();
}

export function createMessage({ data }) {
      return mensajesService.PostMessage(data);
}
