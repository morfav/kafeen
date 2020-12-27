const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DrinkSchema = new Schema(
  {
    name: { type: String, required: true },
    cafe: { type: Schema.Types.ObjectId, ref: 'Cafe' },
  },
);

module.exports = mongoose.model('Drink', DrinkSchema);
