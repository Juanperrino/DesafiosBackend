export function translateProduct(productoDao) {
      return {
            id: productoDao.id || productoDao._id,
            nombre: productoDao.nombre,
            codigo: productoDao.codigo,
            imagen: productoDao.imagen,
            precio: productoDao.precio,
            stock: productoDao.stock,
      };
}
