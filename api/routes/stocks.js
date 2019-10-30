var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/companycode/:companycode', function(req, res, next) {
  request('https://money.rediff.com/money1/currentstatus.php?companycode='+req.params.companycode, function (error, response, body) {
    if (error) {
      res.send(error);
    }else{
      res.send(body);
    }
  });
});

router.get('/updatebse', function(req, res, next) {
  request('https://money.rediff.com/updatebse', function (error, response, body) {
    if (error) {
      res.send(error);
    }else{
      res.send(body);
    }
  });
});

router.get('/updateticker', function(req, res, next) {
  request('https://money.rediff.com/updateticker', function (error, response, body) {
    if (error) {
      res.send(error);
    }else{
      res.send(body);
    }
  });
});

router.get('/bsechart', function(req, res, next) {
  request('https://money.rediff.com/money1/chartbseday_v2.php', function (error, response, body) {
    if (error) {
      res.send(error);
    }else{
      body = body.split("\n");
      var arr=[];
      for (let index = 0; index < body.length; index++) {
        arr.push((body[index]).split(","));
      }
      res.json(arr);
    }
  });
});

module.exports = router;
