import { Router } from 'express';
const router = Router();
import { Carrito } from './../../daos/index.js';
const cartController = Carrito;

router.get('/', async (req, res, next) => {
    try {
        if (!req.query.user) {
            let response = await cartController.getAll();
            res.json(response);
        } else {
            let response = await cartController.getByUser(req.query.user);
            res.json(response);
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const carrito = await cartController.newCart();
        res.json(carrito);
    } catch (error) {
        next(error);
    }
});
/*Router para eliminar un carrito*/
router.delete('/:id', async (req, res, next) => {
    try {
        const deleteC = await cartController.deleteItem(req.params.id);
        res.json(req.params.id);
    } catch (error) {
        next(error);
    }
});

router.put('/:userId', async (req, res, next) => {
    try {
        const finalizar = await cartController.finalizarCompra(
            req.params.userId
        );
    } catch (error) {
        next(error);
    }
});
/*Router para traer los productos de un carrito*/
router.get('/:id/productos', async (req, res, next) => {
    try {
        let response = await cartController.getByIdProduct(req.params.id);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.post('/:id/productos', async (req, res, next) => {
    try {
        let prueba = await cartController.getByUser(req.params.id);
        if (prueba) {
            cartController.newProductCart(
                prueba[0]._id,
                req.body.product
            );
        }
    } catch (error) {
        next(error);
    }
});
/*Router para eliminar un  producto a un carrito*/
router.delete('/:id/productos/:id_prod', async (req, res, next) => {
    try {
        await cartController.deleteProductByUser(
            req.params.id,
            req.params.id_prod
        );
        let response = `delete de producto${req.params.id_prod} al carro ${req.params.id}`;
        res.json(response);
    } catch (error) {
        next(error);
    }
});
export default router;
