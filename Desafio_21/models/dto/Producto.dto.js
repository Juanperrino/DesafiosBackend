export default class ProductoDto {
      constructor(producto) {
            this.id = producto.id;
            this.nombre = producto.nombre;
            this.codigo = producto.codigo;
            this.imagen = producto.imagen;
            this.precio = producto.precio;
            this.stock = producto.stock;
      }
}
