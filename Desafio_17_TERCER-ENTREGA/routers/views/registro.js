import { Router } from 'express';
const router = Router();
router.get('/registro', (req, res) => {
    res.render('registro');
});

export default router;
