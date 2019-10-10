var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json(200,'api');
  // res.json({ error: true, message: 'api' })
});

module.exports = router;
