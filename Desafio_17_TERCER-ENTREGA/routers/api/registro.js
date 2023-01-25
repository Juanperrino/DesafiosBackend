import { Router } from 'express';
import multer from 'multer';
import passport from 'passport';
const router = Router();
const storage = multer.diskStorage({
    destination: './public/img/avatar',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });
router.get('/failregister', (req, res) => {
    res.render('failregister');
});
router.post(
    '/sign-up',
    upload.single('filename'),
    passport.authenticate('sign-up', {
        successRedirect: '/',
        failureRedirect: '/failregister',
    }),
    (req, res) => {
        const { file, body } = req;
        if (!file) {
            const error = new Error('Archivo no encontrado.');
            error.httpStatusCode = 400;
            return next();
        }
        res.send(file);
    }
);

export default router;
