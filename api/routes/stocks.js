var express = require('express');
var router = express.Router();
var request = require('request');

var dbConn = require('../db');

// http://www.nasdaqtrader.com/trader.aspx?id=symboldirdefs
// ftp://ftp.nasdaqtrader.com/symboldirectory/nasdaqtraded.txt
router.get('/companycode/:companycode', function(req, res, next) {
  // https://api.nasdaq.com/api/quote/watchlist?symbol=BAC|stocks
  request('https://money.rediff.com/money1/currentstatus.php?companycode='+req.params.companycode, function (error, response, body) {
    if (error) {
      res.send(error);
    }else{
      res.send(body);
    }
  });
});

router.get('/updatense', function(req, res, next) {
  // https://api.nasdaq.com/api/marketmovers?assetclass=STOCKS&exchangestatus=currentMarket&limit=5
  request('https://money.rediff.com/updatense', function (error, response, body) {
    if (error) {
      res.send(error);
    }else{
      res.send(body);
    }
  });
});

router.get('/updateticker', function(req, res, next) {
  https://api.nasdaq.com/api/quote/indices?chartFor=IXIC&chartFor=NYA&chartFor=SPX&chartFor=RUT&chartFor=NDX&symbol=IXIC&symbol=NYA&symbol=SPX&symbol=RUT&symbol=NDX
  request('https://money.rediff.com/updateticker', function (error, response, body) {
    if (error) {
      res.send(error);
    }else{
      res.send(body);
    }
  });
});

router.get('/nsechart', function(req, res, next) {
  // https://api.nasdaq.com/api/quote/IXIC/chart?assetclass=index
  // https://api.nasdaq.com/api/quote/IXIC/info?assetclass=index
  request('https://money.rediff.com/money1/chartnseday_v2.php', function (error, response, body) {
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

router.get('/getUpTrend/', function (req, res) {
  dbConn.query('SELECT * FROM stocks order by PercentGain ASC limit 10', function (error, results, fields) {
   if(error){
      return res.status(400).send({ error:true, message: error.message });
    }
    if(!results[0]){
      return res.status(400).send({ error:true, message: "no record found" });      
    }
    return res.send({ error: false, data: results[0], message: 'stock lists' });
  });
});

router.get('/getDownTrend/', function (req, res) {
  dbConn.query('SELECT * FROM stocks order by PercentGain DESC limit 10', function (error, results, fields) {
   if(error){
      return res.status(400).send({ error:true, message: error.message });
    }
    if(!results[0]){
      return res.status(400).send({ error:true, message: "no record found" });      
    }
    return res.send({ error: false, data: results[0], message: 'stock lists' });
  });
});

module.exports = router;
