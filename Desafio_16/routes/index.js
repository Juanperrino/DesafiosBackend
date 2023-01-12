import { Router } from "express";
import routerLogin from "./login.js";
import routerProducts from "./products.js";
import os from "os";
import { logger } from "../log/logger.js";
import compression from "compression";

const router = Router();

router.use(compression());

router.use("/", routerLogin);
router.use("/api", routerProducts);

router.get("/info", (req, res) => {
    try {
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
        // console.log({
        //     cpus: os.cpus().length,
        //     argv: process.argv.slice(2),
        //     platform: process.platform,
        //     version: process.version,
        //     rss: process.memoryUsage(),
        //     cwd: process.cwd(),
        //     pe: process.execPath,
        //     pid: process.pid,
        // });

        res.json({
            cpus: os.cpus().length,
            argv: process.argv.slice(2),
            platform: process.platform,
            version: process.version,
            rss: process.memoryUsage(),
            cwd: process.cwd(),
            pe: process.execPath,
            pid: process.pid,
        })
    } catch (error) {
        logger.error(`${error.message}`)
        next(error)
    }
});

router.get("*", (req, res, next) => {
    try {
        if (
            req.originalUrl == "/css/main.css" ||
            req.originalUrl == "/js/script.js" ||
            req.originalUrl == "/favicon.ico"
        ) {
            next();

        } else {
            logger.warn(
                `Ruta: ${req.originalUrl} - Metodo: ${req.method} - Ruta inexistente.`
            );
        }
        res.redirect("/");
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

export default router;