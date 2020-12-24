const express = require('express');
const router = express.Router();
const service = require('../services/drinks.service');

router.get('/', async (req, res, next) => {
  res.send(JSON.stringify(await service.findAll()));
});

module.exports = router;
