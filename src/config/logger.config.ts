import winston, { format } from 'winston';
import { DotEnvConfig, Environment } from './dotenv.config';

const { printf, timestamp, combine, errors, json } = format;

export const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

let transports: (
  | winston.transports.ConsoleTransportInstance
  | winston.transports.FileTransportInstance
)[];

if (DotEnvConfig.NODE_ENV === Environment.DEVELOPMENT) {
  transports = [new winston.transports.Console()];
} else {
  transports = [
    new winston.transports.File({ filename: 'public/logs/log.json' }),
  ];
}

// warn: message.
const logger = winston.createLogger({
  level: DotEnvConfig.LOG_LEVEL,
  format: combine(
    // colorize(),
    timestamp({ format: 'YYYY-mm-dd HH:mm' }),
    errors({ stack: true }),
    json(),
    // myFormat
  ), // text - format.
  transports,
});

export { logger };
