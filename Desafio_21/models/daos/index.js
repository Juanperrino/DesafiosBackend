let Mensaje, Producto, User;
switch ('mongodb') {
      case 'mongodb':
            const { default: MensajesDaosMongoDb } = await import(
                  './mensajes/MensajesDaosMongodb.js'
            );
            Mensaje = new MensajesDaosMongoDb();
            const { default: ProductosDaosMongoDb } = await import(
                  './productos/ProductosDaosMongodb.js'
            );
            Producto = new ProductosDaosMongoDb();

            const { default: UsuariosDaosMongoDb } = await import(
                  './usuarios/UsuariosDaosMongodb.js'
            );
            User = new UsuariosDaosMongoDb();

            /* await Mensaje.connect(); */
            break;

      default:
            break;
}
export { Mensaje, Producto, User };
