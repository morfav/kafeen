const { Order } = require('../models/order');
const logger = require('../config/winston')(__filename);

exports.placeOrder = (cafeId, customerId, drinks) => {
  const order = new Order({ cafe: cafeId, customer: customerId, drinks });
  Order.create(order).catch(err => logger.error(err));
};

exports.findAll = async () => {
  return await Order.find().exec();
};
