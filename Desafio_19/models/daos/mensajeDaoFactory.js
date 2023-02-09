import env from '../../config/env.js';
import MensajesDaosMongoDb from './mensajes/MensajesDaosMongodb.js';

class MensajeDaosFactory {
      static getMensajeDao() {
            switch (env.target) {
                  case 'file':
                        return console.log('File no found');
                  case 'mongo':
                        return MensajesDaosMongoDb.getInstance();
            }
      }
}
export default MensajeDaosFactory;
