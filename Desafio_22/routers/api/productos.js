import Router from 'koa-router';

import ProductController from '../../controllers/products.controller.js';
const router = new Router({
    prefix: '/productos',
});
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductosById);
router.post('/', ProductController.postProduct);
router.put('/', ProductController.putProduct);
router.delete('/:id', ProductController.deleteProduct);
export default router;
