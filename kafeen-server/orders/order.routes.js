const express = require('express');
const router = express.Router();
const service = require('./order.service');

router.get('/', async (req, res, next) => {
  res.send(JSON.stringify(await service.findAll()));
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  await service.placeOrder(body.cafe, body.customer, body.drinks);
  res.sendStatus(201);
});

module.exports = router;
