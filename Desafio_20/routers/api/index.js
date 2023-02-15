import { Router } from 'express';

import productos from './productos.js';
const router = Router();

router.use('/', productos);

export default router;
