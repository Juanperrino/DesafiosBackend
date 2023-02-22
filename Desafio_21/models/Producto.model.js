export default class Producto {
      #id;
      #nombre;
      #codigo;
      #imagen;
      #precio;
      #stock;
      constructor(ProductoDto) {
            this.id = ProductoDto.id;
            this.nombre = ProductoDto.nombre;
            this.codigo = ProductoDto.codigo;
            this.imagen = ProductoDto.imagen;
            this.precio = ProductoDto.precio;
            this.stock = ProductoDto.stock;
      }
      set id(value) {
            this.#id = value;
      }
      get id() {
            return this.#id;
      }
      set nombre(value) {
            this.#nombre = value;
      }
      get nombre() {
            return this.#nombre;
      }

      set codigo(value) {
            this.#codigo = value;
      }
      get codigo() {
            return this.#codigo;
      }
      set imagen(value) {
            this.#imagen = value;
      }
      get imagen() {
            return this.#imagen;
      }
      set precio(value) {
            this.#precio = value;
      }
      get precio() {
            return this.#precio;
      }
      set stock(value) {
            this.#stock = value;
      }
      get stock() {
            return this.#stock;
      }
}
