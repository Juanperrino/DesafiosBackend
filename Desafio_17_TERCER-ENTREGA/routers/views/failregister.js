import { Router } from 'express';

const router = Router();

router.get('/failregister', (req, res) => {
    res.render('failregister');
});

export default router;
