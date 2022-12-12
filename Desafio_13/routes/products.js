import { Router } from 'express';
import { faker } from '@faker-js/faker';

faker.locale = 'es';
const { commerce, image } = faker;

const router = Router();

router.get('/productos-test', (req, res, next) => {
      try {
            let data = {productos: []};

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
            next(error);
      }
});

export default router;