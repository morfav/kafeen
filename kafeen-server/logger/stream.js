const winston = require('winston');

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: true,
    format: winston.format.json(),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
  ],
  exitOnError: false // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    format: winston.format.prettyPrint(),
  }));
}

const stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = { stream, logger };
