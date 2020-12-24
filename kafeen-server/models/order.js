const mongoose = require('mongoose');
const EventEmitter = require('events');

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    cafe: { type: Schema.Types.ObjectId, ref: 'Cafe' },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    drinks: [{ type: Schema.Types.ObjectId, ref: 'Drink' }]
  }
);

class OrdersEmitter extends EventEmitter {}
const ordersEmitter = new OrdersEmitter();

OrderSchema.post('save', (doc, next) => {
  ordersEmitter.emit('ordersChanged');
  next();
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order, ordersEmitter };
