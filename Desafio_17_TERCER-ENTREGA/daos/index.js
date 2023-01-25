let Carrito;
let Producto;
let User;
switch (process.env.BD_SELECCIONADA) {

    case 'mongodb':
        const { default: UsersDaosMongoDb } = await import(
            './users/UserDaosMongoDb.js'
        );
        User = new UsersDaosMongoDb();
        const { default: CarritosDaosMongoDb } = await import(
            './carritos/CarritosDaosMongoDb.js'
        );
        Carrito = new CarritosDaosMongoDb();
        const { default: ProductosDaosMongoDb } = await import(
            './productos/ProductosDaosMongoDb.js'
        );
        Producto = new ProductosDaosMongoDb();

        break;

    default:
        const { default: CarritosDaosMemoria } = await import(
            './carritos/CarritosDaosMemoria.js'
        );
        Carrito = new CarritosDaosMemoria();
        const { default: ProductosDaosMemoria } = await import(
            './productos/ProductosDaosMemoria.js'
        );
        Producto = new ProductosDaosMemoria();
        break;
}
export { Carrito, Producto, User };
