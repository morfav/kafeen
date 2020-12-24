const express = require('express');
const service = require('../services/cafe.service');
const router = express.Router();

router.get('/', async function (req, res, next) {
  const cafe = await service.findOne();
  if (cafe) {
    res.send(JSON.stringify(cafe));
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
