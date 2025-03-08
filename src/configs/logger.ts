import winston, { LoggerOptions, createLogger, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { timestamp, printf, combine } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const transportConsole = new winston.transports.Console({
  level: 'debug'
});

const transportFileDefault = new DailyRotateFile({
  level: 'info',
  filename: './logs/application-%DATE%.log',
  zippedArchive: true,
  datePattern: 'YYYY-MM-DD',
  maxSize: '150m',
  maxFiles: '14d',
  silent: false
});
const defaultOptions: LoggerOptions = {
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [transportConsole, transportFileDefault]
};
const logger = createLogger(defaultOptions);


export {
  logger
};

