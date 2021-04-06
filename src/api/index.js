const express = require('express');

const emojis = require('./emojis');
const detailCovidVn = require('./detail-covid-vn');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/detail-covid', detailCovidVn);

module.exports = router;
