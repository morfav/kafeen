const express = require('express');
const { sendOrders } = require('../OrdersSocket');
const router = express.Router();

let orders = [];

router.get('/', (req, res, next) => {
  res.send(orders);
});

router.post('/', (req, res, next) => {
  const order = req.body;
  orders = [...orders, order.id];
  sendOrders(JSON.stringify(orders));
});

module.exports = router;
