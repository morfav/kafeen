const express = require('express');
const router = express.Router();
const service = require('./order.service');

router.get('/', async (req, res, next) => {
  res.send(JSON.stringify(await service.findAll()));
});

router.post('/', (req, res, next) => {
  const body = req.body;
  service.placeOrder(body.cafe, body.customer, body.drinks);
});

module.exports = router;
