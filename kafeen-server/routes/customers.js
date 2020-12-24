const express = require('express');
const service = require('../services/customers.service');
const router = express.Router();

router.get('/', async function (req, res, next) {
  const customer = await service.findOne();
  if (customer) {
    res.send(JSON.stringify(customer));
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
