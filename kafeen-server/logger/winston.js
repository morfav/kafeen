const { logger } = require('./stream');

module.exports = function (fileName) {
  return {
    error: function (text) {
      logger.error(fileName + ': ' + text);
    },
    info: function (text) {
      logger.info(fileName + ': ' + text);
    }
  };
};
