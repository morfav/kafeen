const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const QueueSchema = new Schema(
  {
    cafe: { type: Schema.Types.ObjectId, ref: 'Cafe' },
    queue: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
  }
);

module.exports = mongoose.model('Queue', QueueSchema);
