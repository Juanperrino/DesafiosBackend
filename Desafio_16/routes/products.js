import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { logger } from '../log/logger.js';

faker.locale = 'es';
const { commerce, image } = faker;

const router = Router();

router.get('/productos-test', (req, res, next) => {
      try {
            logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
            let data = { productos: [] };

            for (let i = 0; i < 5; i++) {
                  data.productos.push({
                        nombre: commerce.product(),
                        precio: commerce.price(),
                        url: image.technics(),
                  });
            }
            console.log(data);
            res.render("productos", data);
      } catch (error) {
            logger.error(`${error.message}`)
            next(error);
      }
});

router.get("/randoms", (req, res) => {

      logger.info(`Se accedio a la ruta ${req.originalUrl} con el metodo ${req.method}`)
      const { cant = 1000000 } = req.query;
      if (isNaN(Number(cant))) {
            logger.error(`El numero ingresado es un string`)
            res.json({ error: "El numero ingresado es un string" })
      } else {
            console.log(cant)
            const child = fork("calculo.js");

            child.on("message", (result) => {
                  if (result == "ready") {
                        child.send(Number(cant))
                  } else {
                        console.log("llegue aqui")
                        res.json(result)
                  }
            })
      }
});

export default router;