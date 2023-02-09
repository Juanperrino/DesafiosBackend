import { Router } from 'express';
import passport from 'passport';
import UserController from '../../controllers/user.controller.js';

const router = Router();

router.get('/', (req, res) => {
      UserController.logginUser(req, res);
});

router.post(
      '/sign-in',
      passport.authenticate('sign-in', {
            successRedirect: '/',
            failureRedirect: '/faillogin',
            failureMessage: true,
      })
);

router.get('/faillogin', (req, res) => {
      req.session.messages = [];
      res.render('faillogin');
});

router.post('/logout', (req, res) => {
      UserController.logoutUser(req, res);
});

export default router;
