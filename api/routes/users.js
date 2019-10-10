var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  body = [
    {name: "x", age:'y'}
  ];
  res.json(500,body);
});

module.exports = router;
