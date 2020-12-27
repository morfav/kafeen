const express = require('express');
const service = require('./cafes.service');
const router = express.Router();

router.get('/:cafeId', async function (req, res, next) {
  const cafe = await service.findCafe(req.params.cafeId);
  if (cafe) {
    res.send(JSON.stringify(cafe));
  } else {
    res.sendStatus(404);
  }
});

router.get('/', async function (req, res, next) {
  const cafe = await service.findAll();
  if (cafe) {
    res.send(JSON.stringify(cafe));
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
