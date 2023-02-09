import { Router } from 'express';
import { productoFakerController } from '../../controllers/productFake.controller.js';

const router = Router();

router.get('/producto-test/', (req, res, next) => {
      productoFakerController(req, res, next);
});

export default router;
