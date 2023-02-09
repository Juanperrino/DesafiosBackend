import { Router } from 'express';
import { infoController } from '../../controllers/info.controller.js';

const router = Router();

router.get('/info', (req, res, next) => {
      infoController(req, res, next);
});

export default router;
