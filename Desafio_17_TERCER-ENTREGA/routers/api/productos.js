import { Router } from 'express';

import controlUser from '../../controllers/UserController.js';

import { Producto } from './../../daos/index.js';

const prodControl = Producto;
const router = Router();

router.get('/', async (req, res, next) => {
    try {
        if (!req.query.cepa) {
            let products = await prodControl.getAll();
            res.json(products);
        } else {
            const product = await prodControl.getByCepa(req.query.cepa);
            res.json(product);
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const response = await controlUser(
            req.query.admin,
            req.originalUrl,
            req.method
        );
        if (response.codigo === 401) {
            res.json(response);
        } else {
            let response = await prodControl.newProduct(req.body);
            res.json(response);
        }
    } catch (error) {
        next(error);
    }
});
/*Router para modificar un producto */
router.put('/:id', async (req, res, next) => {
    try {
        const response = await controlUser(
            req.query.admin,
            req.originalUrl,
            req.method
        );
        if (response.codigo === 401) {
            res.json(response);
        } else {
            let response = await prodControl.putItem(
                req.params.id,
                req.body
            );

            res.json(response);
        }
    } catch (error) {
        next(error);
    }
});
/*Router para eliminar un producto */
router.delete('/:id', async (req, res, next) => {
    try {
        const response = await controlUser(
            req.query.admin,
            req.originalUrl,
            req.method
        );
        if (response.codigo === 401) {
            res.json(response);
        } else {
            let response = await prodControl.deleteItem(req.params.id);
            res.json(response);
        }
    } catch (error) {
        next(error);
    }
});
export default router;
