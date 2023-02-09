import { Router } from 'express';

import random from './random.js';
const router = Router();

router.use('/', random);

export default router;
