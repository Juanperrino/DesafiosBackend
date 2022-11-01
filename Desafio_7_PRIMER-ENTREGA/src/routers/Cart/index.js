import { Router } from "express";
import { CartDao, ProductDao } from "../../Dao/index.js";
import { DATE_UTILS } from "../../utils/index.js";

const router = Router();

// CREAR CARRITO
router.post("/", async (req, res) => {
    const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

    const cart = await CartDao.save(baseCart);

    res.send({ success: true, cartId: cart.id });
});

// AÑADIMOS PRODUCTOS AL CARRITO
router.post("/:cartId/products", async (req, res) => {
    // Obtenemos el id del carrito por params
    const { cartId } = req.params;
    //Obtenemos el id de producto por body
    const { productId } = req.body;

    // Buscamos el carrito por id
    const cart = await CartDao.getById(Number(cartId));

    // el getById nos puede devolver un undefined para eso hacemos:
    if (!cart) return res.send({ error: true, message: "Carrito no encontrado" });

    // Buscamos el producto por el id
    const product = await ProductDao.getById(Number(productId));

    // el getById nos puede devolver un undefined para eso hacemos:
    if (!product) return res.send({ error: true, message: "ID del Producto no existe" });

    //-----------Hasta aca ya tenemos carrito y producto-----------

    // Ahora tenemos que hacer el push (Agregar producto al carrito)
    cart.products.push(product);

    // Ahora actualizamos el carrito
    const updatedCart = await CartDao.updateById(Number(cartId), cart);

    // Devolvemos el carrito actualizado
    res.send({ success: true, cart: updatedCart });


})


//ELIMINAR CARRITO
router.delete('/:cartId', async (req, res) => {
    try {
        const { id } = req.params;

        await CartDao.deleteById(Number(id));

        res.send({ success: true });

    } catch (error) {
        res.send({ error: 'Error inesperado' })
    }
})

// LISTAR PRODUCTOS POR ID EN EL CARRITO
router.get('/:cartId/products', async (req, res) => {
    const { cartId } = req.params;
    const product = await CartDao.getById(Number(cartId));

    res.send(product);
})

// ELIMINAR PRODUCTO DE CARRITO POR ID CARRITO Y ID PRODUCTO
router.delete('/:cartId/products/:id_prod', async (req, res) => {
    try {
        const { cartId } = req.params;
        const { id_prod } = req.params;

        const cart = await CartDao.getById(Number(cartId))
        console.log(cart);
        if (!cart) return res.send({ error: true, message: 'Error en cartId' })

        const product = await ProductDao.getById(Number(id_prod));
        console.log(product);
        if (!product) return res.send({ error: true, message: 'Error en id_produc' })

        const filterElements = cart.products.filter((element) => element.id !== Number(id_prod))
        console.log(filterElements);

        cart.products = filterElements

        // res.send({ success: true, message: `Se elimino del carrito ${cartId} el producto con el ID ${id_prod}` })


        await CartDao.updateById(Number(cartId), cart)
        res.send({ success: true, message: 'product remove' })

    } catch (error) {
        res.send({ error: 'Error en delete cartId y id_prod' })
    }
})


export { router as CartRouter };