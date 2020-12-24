const Cafe = require('../models/cafe');

exports.findOne = async () => {
  return await Cafe.findOne().exec();
};
