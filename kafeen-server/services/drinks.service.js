const Drink = require('../models/drink');

exports.findAll = async () => {
  return await Drink.find().exec();
};
