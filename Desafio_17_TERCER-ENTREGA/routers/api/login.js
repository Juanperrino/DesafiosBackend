import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/home', (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('login');
    } else {
        const { user } = req;
        let data = { user: user.email };
        res.render('home', data);
    }
});
router.post(
    '/sign-in',
    passport.authenticate('sign-in', {
        successRedirect: '/',
        failureRedirect: '/faillogin',
    })
);
export default router;
