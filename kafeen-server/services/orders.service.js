const { Order } = require('../models/order');

exports.placeOrder = (cafeId, customerId, drinks) => {
  const order = new Order({cafe: cafeId, customer: customerId, drinks});
  Order.create(order).catch(err => console.log(err));
};

exports.findAll = async () => {
  return await Order.find().exec();
};
