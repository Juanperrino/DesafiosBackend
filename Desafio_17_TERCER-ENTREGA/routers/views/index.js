import { Router } from 'express';
import login from './login.js';
import registro from './registro.js';
import failregister from './failregister.js';
import faillogin from './faillogin.js';
import home from './home.js';
const router = Router();

router.use('/', login, registro, failregister, faillogin, home);

export default router;
