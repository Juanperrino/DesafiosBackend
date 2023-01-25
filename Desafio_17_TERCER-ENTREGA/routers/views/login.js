import { Router } from 'express';
import logger from '../../logs/Loggers.js';
const router = Router();
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/logout', (req, res) => {
    let usuario = req.user.nombre;
    req.logout((error) => {
        if (!error) {
            let data = { user: usuario };
            res.render('logout', data);
        } else {
            logger.error(
                `Ruta ${req.originalUrl} metodo POST, ${error.message}`
            );
            res.send('Ocurrio un  error', error.message);
        }
    });
});
export default router;
