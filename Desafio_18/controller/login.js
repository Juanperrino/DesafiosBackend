import { logger } from '../log/logger.js';

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/login")
    }
}

const getHome = (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    const { user } = req;
    const data = { username: user.email };
    res.render("index", data);
}

const getRegister = (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    if (req.isAuthenticated())
        return res.redirect("/");
    res.render("register");
}

const postRegister = (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    res.redirect("/");
}

const getLogin = (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    if (req.isAuthenticated())
        return res.redirect("/");
    res.render("login");
}

const getError = (req, res, next) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    console.log(req.session.messages)
    res.render("error", { message: req.session.messages[req.session.messages.length - 1] })
}

const getLogout = (req, res, next) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    const { user } = req;
    req.logout((error) => {
        if (error) {
            logger.error(error.message)
            return next(error);
        }
        let data = { username: user.email };
        res.render("logout", data);

    })
}

const postLogin = (req, res) => {
    logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
    res.redirect("/");
}

export {
    auth,
    getHome,
    getLogin,
    getRegister,
    postRegister,
    getError,
    getLogout,
    postLogin
}