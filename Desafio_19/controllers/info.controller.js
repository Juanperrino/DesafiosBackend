import { info } from '../services/info.service.js';

info;
const infoController = async (req, res, next) => {
      await info(req, res, next);
};
export { infoController };
