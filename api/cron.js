
module.exports = function (){
    var mysql = require('mysql');
    var crypto = require('crypto');

    var mykey = crypto.createDecipher('aes-128-cbc', 'myHexKey');
    var pass = mykey.update('00999fc70e918d77fea4fd9634ce9945', 'hex', 'utf8')
    pass += mykey.final('utf8');

    var dbConn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: pass,
        database: 'TradeMe'    
      });
      
    dbConn.connect();

    var request = require('request');

    dbConn.query('SELECT CompanySymbol FROM stocks', function (error, results, fields) {
      if(error){
        console.log(error.message);
      }
      if(!results){
        console.log("no record found");    
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
                let price = parsedBody.LastTradedPrice.replace(',','');
                dbConn.query("UPDATE stocks SET ?,?,?,? WHERE ? ", [{Volume:parsedBody.Volume},{LastTradedTime:parsedBody.LastTradedTime},{PercentGain:parsedBody.ChangePercent},{Price:price},{CompanySymbol:element}], function (error, results, fields) {
                  if(error){
                      console.log(error.message);
                  }
                  if(!results.affectedRows){
                    console.log("update failed ",element);
                  }
                  //console.log("update success ",element);
                });
              } 
            }
          });
        }
        //process.exit(1);

      }

    });
    return true;
}




//   {"LastTradedPrice":"311.00",
//   "Volume":"35,014,841",
//   "PercentageDiff":"1.55",
//   "FiftyTwoWeekHigh":"373.80",
//   "FiftyTwoWeekLow":"244.35",
//   "LastTradedTime":"05 Feb,15:59:57",
//   "ChangePercent":"1.55",
//   "Change":"4.75",
//   "MarketCap":"108,227.37",
//   "High":"313.65",
//   "Low":"304.60",
//   "PrevClose":"306.25",
//   "BonusSplitStatus":"0",
//   "BonusSplitRatio":"0-0"}


// let LastTradedPrice = parsedBody.LastTradedPrice.replace(',','');
// let Volume = parsedBody.Volume.replace(',','');
// let PercentageDiff = parsedBody.PercentageDiff.replace(',','');
// let FiftyTwoWeekHigh = parsedBody.FiftyTwoWeekHigh.replace(',','');
// let FiftyTwoWeekLow = parsedBody.FiftyTwoWeekLow.replace(',','');
// let LastTradedTime = parsedBody.LastTradedTime.replace(',','');
// let ChangePercent = parsedBody.ChangePercent.replace(',','');
// let ChangePrice = parsedBody.ChangePrice.replace(',','');
// let MarketCap = parsedBody.MarketCap.replace(',','');
// let High = parsedBody.High.replace(',','');
// let Low = parsedBody.Low.replace(',','');
// let PrevClose = parsedBody.PrevClose.replace(',','');
// let BonusSplitStatus = parsedBody.BonusSplitStatus;
// let BonusSplitRatio = parsedBody.BonusSplitRatio;





