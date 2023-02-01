import { logger } from "../log/logger.js";
import os from "os";

const getServerInfo = (req, res) => {
    try {
        logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
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
}

const filterMiddleware = (req, res, next) => {
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
}

export {
    filterMiddleware,
    getServerInfo
}