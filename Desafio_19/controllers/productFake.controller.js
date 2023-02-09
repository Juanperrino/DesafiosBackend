import { productoFaker } from '../services/ProductFake.service.js';

const productoFakerController = async (req, res, next) => {
      await productoFaker(req, res, next);
};

export { productoFakerController };
