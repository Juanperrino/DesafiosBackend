import { faker } from '@faker-js/faker';
import logger from './../helpers/logger.js';

faker.locale = 'es';
const { commerce, image } = faker;
const productoFaker = async (req, res, next) => {
      try {
            let data = { data: [] };

            for (let i = 0; i < 5; i++) {
                  data.data.push({
                        nombre: commerce.product(),
                        precio: commerce.price(),
                        imagen: image.technics(),
                  });
            }
            res.render('./test/producto-test', data);
      } catch (error) {
            logger.error(`Ocurrio un error: ${error.message}`);
            next(error);
      }
};
export { productoFaker };
