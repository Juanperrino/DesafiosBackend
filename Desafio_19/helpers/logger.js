import winston, { format } from 'winston';

const logger = winston.createLogger({
      level: 'info',
      format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.json()
      ),
      transports: [
            new winston.transports.Console({ level: 'info' }),
            new winston.transports.File({
                  filename: './logs/warn.log',
                  level: 'warn',
            }),
            new winston.transports.File({
                  filename: './logs/error.log',
                  level: 'error',
            }),
      ],
});

export default logger;
