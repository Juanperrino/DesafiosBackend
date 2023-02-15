import { Router } from 'express';
import ProductController from '../../controllers/products.controller.js';
const router = Router();
router.get('/productos', ProductController.getAllProducts);
router.get('/productos/:id', ProductController.getProductosById);
router.post('/productos', ProductController.postProduct);
router.put('/productos', ProductController.putProduct);
router.delete('/productos/:id', ProductController.deleteProduct);

export default router;
