var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  body = [
    {name: "x", age:'y'}
  ];
  res.json(500,body);
});

// Retrieve all users 
router.get('/users', function (req, res) {
  dbConn.query('SELECT * FROM users', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
  });
});

module.exports = router;
