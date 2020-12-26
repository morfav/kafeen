const logger = require('../logger/winston')(__filename);
const { Order } = require('./order.model');

const prepareNextCoffee = async () => {
  const nextOrder = await Order.findOne()
    .sort({ created_at: 1 })
    .exec().catch(err => {
      logger.error(err);
      logger.error('Barista could not fetch next order');
    });

  if (nextOrder) {
    await Order.deleteOne({ _id: nextOrder._id }).exec();
    logger.info('Order served: ' + nextOrder);
  }
};

const launchBarista = () => {
  setInterval(prepareNextCoffee, 15000);
  logger.info('Barista launched');
};

module.exports = launchBarista;
