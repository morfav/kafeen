const { Order } = require('./order.model');
const logger = require('../logger/winston')(__filename);

exports.placeOrder = async (cafeId, customerId, drinks) => {
  const order = new Order({ cafe: cafeId, customer: customerId, drinks });
  await Order.create(order).catch(err => logger.error(err));
};

exports.findAll = async () => {
  return await Order.find().exec();
};
