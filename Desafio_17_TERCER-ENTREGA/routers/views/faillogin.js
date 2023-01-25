import { Router } from 'express';

const router = Router();

router.get('/faillogin', (req, res) => {
    res.render('faillogin');
});
export default router;
