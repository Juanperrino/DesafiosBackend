import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('login');
    } else {
        const { user } = req;
        let data = { user: user.email, nombre: user.nombre };
        res.render('home', data);
    }
});
router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('login');
    } else {
        const { user } = req;

        let data = {
            user: user.email,
            nombre: user.nombre,
            direccion: user.direccion,
            avatar: user.avatar,
            edad: user.edad,
            telefono: user.telefono,
        };

        res.render('profile', data);
    }
});
router.get('/carrito', (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('login');
    } else {
        res.render('carrito');
    }
});

export default router;
