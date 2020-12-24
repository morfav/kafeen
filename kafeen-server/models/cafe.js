const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CafeSchema = new Schema(
  {
    name: { type: String, required: true },
    drinks: [{ type: Schema.Types.ObjectId, ref: 'Drink' }]
  }
);

module.exports = mongoose.model('Cafe', CafeSchema);
