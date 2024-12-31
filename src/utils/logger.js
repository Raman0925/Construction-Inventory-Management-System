const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
    levels:{
        error:0,
        warn:1,
        info:2,
        http:3,
        verbose: 4,
        debug: 5,
        silly: 6
    
    },
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
  ]
});

module.exports = logger;