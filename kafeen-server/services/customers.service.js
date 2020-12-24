const Customer = require('../models/customer');

exports.findOne = async () => {
  return await Customer.findOne().exec();
};
