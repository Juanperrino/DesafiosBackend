import express from 'express';
import cors from 'cors';
import session from 'express-session';
import hbs from 'hbs';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import { initSocket } from './socket.js';
import viewsRouters from './routers/views/index.js';
import apiRouters from './routers/api/index.js';
import passport from './middlewares/passport.js';

import logger from './helpers/logger.js';
const PORT = process.env.PORT || 3000;

const ENV = process.env.ENV;

const app = express();
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
app.use('/', viewsRouters);
app.use('/api', apiRouters);

app.use('*', (req, res) => {
  logger.warn(
    `Ruta: ${req.originalUrl} - Metodo: ${req.method} - Ruta inexistente.`
  );
  res.status(404).send(
    `Ruta: ${req.originalUrl} - Metodo: ${req.method} - Ruta inexistente.`
  );
});

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  logger.info(`Servidor Http en el puerto ${server.address().port}`);
  logger.info(`http://localhost:${server.address().port}`);
  logger.info(`evironment:${ENV}`);
});

server.on('error', (err) => logger.error(`error en el servidor ${err}`));
