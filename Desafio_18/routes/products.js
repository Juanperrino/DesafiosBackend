import { Router } from 'express';
import { generateRandoms, numberCalc } from '../controller/products.js';

const router = Router();

router.get('/productos-test', generateRandoms);

router.get("/random", numberCalc)

export default router;