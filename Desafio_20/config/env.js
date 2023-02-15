import { config } from 'dotenv';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: resolve(__dirname, '../../.env') });

export default {
      PORT: process.env.PORT || 8080,
      NODE_ENV: process.env.NODE_ENV || 'development',
      MONGODB_URI: process.env.MONGO_URL || 'mongodb://localhost/express-test',
      target: process.env.DAO_TARGET || 'mongo',
};
