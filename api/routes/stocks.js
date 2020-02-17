var express = require('express');
var router = express.Router();
var request = require('request');

var dbConn = require('../db');
var cron = require('../cron');
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
/////////////////////////////////////////////////
let price = 50;
let volume = 0;
let limit = 20;
let companyKeyword = '';
let filter = '(select CompanySymbol FROM stocks WHERE Volume > '+volume+' AND ShortCompanyName LIKE "%'+companyKeyword+'%")';
router.get('/getUpTrend', function (req, res) {
  // new cron();
  dbConn.query('SELECT * FROM stocks WHERE CompanySymbol IN '+filter+' AND LastTradedPrice > '+price+' AND ChangePercent > 0 order by ChangePercent DESC limit '+limit+'', function (error, results, fields) {
   if(error){
      return res.status(400).send({ error:true, message: error.message });
    }
    if(!results[0]){
      return res.status(400).send({ error:true, message: "no record found" });      
    }
    return res.send({ error: false, data: results, message: 'stock lists' });
  });
});

router.get('/getDownTrend', function (req, res) {
  // new cron();
  dbConn.query('SELECT * FROM stocks WHERE   CompanySymbol IN '+filter+' AND LastTradedPrice > '+price+' AND ChangePercent < 0 order by ChangePercent ASC limit '+limit+'', function (error, results, fields) {
   if(error){
      return res.status(400).send({ error:true, message: error.message });
    }
    if(!results[0]){
      return res.status(400).send({ error:true, message: "no record found" });      
    }
    return res.send({ error: false, data: results, message: 'stock lists' });
  });
});

router.get('/refreshAnalytics', function (req, res) {
    dbConn.query('SELECT CompanySymbol FROM stocks', function (error, results, fields) {
      if(error){        
        return res.status(400).send({ error:true, message: error.message });
      }
      if(!results){
        return res.status(400).send({ error:true, message: "no record found" });      
      }

      if(results){
        for (let index = 0; index < results.length; index++) {
          const element = results[index].CompanySymbol;
          request('https://money.rediff.com/money1/currentstatus.php?companycode='+element, function (error, response, body) {
            if (error) {
              console.log(error);
            }else{
              const parsedBody = JSON.parse(body); 
              if(parsedBody){
                let LastTradedPrice = parsedBody.LastTradedPrice.replace(',','');
                let Volume = parsedBody.Volume.replace(',','');
                let PercentageDiff = parsedBody.PercentageDiff.replace(',','');
                let FiftyTwoWeekHigh = parsedBody.FiftyTwoWeekHigh.replace(',','');
                let FiftyTwoWeekLow = parsedBody.FiftyTwoWeekLow.replace(',','');
                let LastTradedTime = parsedBody.LastTradedTime.replace(',','');
                let ChangePercent = parsedBody.ChangePercent.replace(',','');
                let ChangePrice = parsedBody.Change.replace(',','');
                let MarketCap = parsedBody.MarketCap.replace(',','');
                let High = parsedBody.High.replace(',','');
                let Low = parsedBody.Low.replace(',','');
                let PrevClose = parsedBody.PrevClose.replace(',','');
                let BonusSplitStatus = parsedBody.BonusSplitStatus;
                let BonusSplitRatio = parsedBody.BonusSplitRatio;
                dbConn.query("UPDATE stocks SET ?,?,?,?,?,?,?,?,?,?,?,?,?,? WHERE ? ", 
                          [{LastTradedPrice:LastTradedPrice},
                            {Volume:Volume},
                            {PercentageDiff:PercentageDiff},
                            {FiftyTwoWeekHigh:FiftyTwoWeekHigh},
                            {FiftyTwoWeekLow:FiftyTwoWeekLow},
                            {LastTradedTime:LastTradedTime},
                            {ChangePercent:ChangePercent},
                            {ChangePrice:ChangePrice},
                            {MarketCap:MarketCap},
                            {High:High},
                            {Low:Low},
                            {PrevClose:PrevClose},
                            {BonusSplitStatus:BonusSplitStatus},
                            {BonusSplitRatio:BonusSplitRatio},
                            
                            
                            {CompanySymbol:element}], function (error, results, fields) {
                  if(error){
                      console.log(error.message);
                  }
                  if(!results.affectedRows){
                    console.log("update failed ",element);
                  }
                  // console.log("update success ",element);
                });
              } 
            }
          });
        }
      }
    });
    // if(index < results.length){
      return res.send({ error: false, data: "ok", message: 'stock lists' });
    // }
});

module.exports = router;
