import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import apiRouters from './routers/api/index.js';
import viewsRouters from './routers/views/index.js';
import session from 'express-session';
import logger from './logs/Loggers.js';
import passport from './middlewares/Passport.js';
import cluster from 'cluster';
import os from 'os';
import ContenedorMongoDb from './db/ContenedorMongoDb.js';
const mongo = new ContenedorMongoDb();
await mongo.connect();
const modoCluster = process.env.MODO_CLUSTER;

if (modoCluster === 'true' && cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        logger.info(
            `worker ${worker.process.pid} | code ${code} | signal ${signal}`
        );
        logger.info('Starting a new worker...');
        cluster.fork();
    });
} else {
    const app = express();

    const PORT = process.env.PORT || 8080;
    const ENV = process.env.NODE_ENV;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(
        session({
            secret: 'sDs$321J',
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: 600000,
            },
            rolling: true,
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(cors());
    app.use('/', express.static(path.join(__dirname, 'public/')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.url}`);
        next();
    });
    app.use('/', viewsRouters);
    app.use('/api', apiRouters);

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use('*', (req, res) => {
        logger.warn(
            `Ruta: ${req.originalUrl} - Metodo: ${req.method} - Ruta inexistente.`
        );
        res.status(404).send(
            `Ruta: ${req.originalUrl} - Metodo: ${req.method} - Ruta inexistente.`
        );
    });
    const server = app.listen(PORT, () => {
        logger.info(
            `Servidor http esta escuchando en el puerto ${server.address().port
            }`
        );
        logger.info(`http://localhost:${server.address().port}`);
        logger.info(`Environment:${ENV}`);
    });

    server.on('error', (error) => logger.error(`Error en servidor ${error}`));
}
