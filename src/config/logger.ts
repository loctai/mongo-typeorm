import path from 'path';
import winston, { format } from "winston"

const { combine, timestamp, printf } = format;

const customFormat = printf(({
                               timestamp,
                               level,
                               message
                             }) => `${timestamp} [${level.toUpperCase()}] ${message}`);

const logger = winston.createLogger({
  format: combine(timestamp(), customFormat),
  transports: [
    new winston.transports.File({
      filename: 'server.log',
      level: 'info',
      maxsize: 5242880,
      dirname: process.env.LOG_DIR ?? path.resolve('./') + '/logs',
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.json()
    })
  );
}

export default logger;

