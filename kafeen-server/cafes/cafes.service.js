const Cafe = require('./cafe.model');

exports.findCafe = async (cafeId) => {
  return await Cafe.findById(cafeId).exec();
};

exports.findAll = async () => {
  return await Cafe.find().exec();
};
