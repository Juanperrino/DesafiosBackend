import { Router } from 'express';
import productoTest from './productoTest.js';
import login from './login.js';
import registro from './registro.js';
import info from './info.js';

const router = Router();

router.use('/', productoTest, login, registro, info);

export default router;
