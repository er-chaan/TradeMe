var express = require('express');
var router = express.Router();
var dbConn = require('../db');
var request = require('request');

// update inplay
function updateInplay(mobile) {
  dbConn.query('SELECT * FROM inplay where ? AND ? order by id desc', [{mobile:mobile},{status:'open'}], function (error, results, fields) {
    // if(error){
    //   return res.status(400).send({ error:true, message: error.message });
    // }

    results.forEach(element => {
      request('https://money.rediff.com/money1/currentstatus.php?companycode='+element.symbol, function (error, response, body) {
        // if (error) {
        //   return res.status(400).send({ error:true, message: error.message });
        // }
          X = JSON.parse(body);
          LastTradedPrice = X.LastTradedPrice;
          net=0;
          if(element.called == 'buy'){
            net = LastTradedPrice - element.price;
          }
          if(element.called == 'sell'){
            net = element.price - LastTradedPrice;
          }
          dbConn.query("UPDATE inplay SET ? , ? WHERE ? ", [{cmp:LastTradedPrice},{net:net},{id:element.id}], function (error, results, fields) {
          // if(error){
          //   return res.status(400).send({ error:true, message: error.message });
          // }
            // return res.send({ error: false, message: 'buy successfully done' });
            return;
          });
      });
    });
  });

}

// passbook
router.get('/tradebook/:mobile', function (req, res) {
  let mobile = req.params.mobile;
  updateInplay(mobile);
  let status = 'open';
  if (!mobile) {
   return res.status(400).send({ error: true, message: 'provide mobile' });
  }
  dbConn.query('SELECT * FROM inplay where ? AND ? order by id desc', [{mobile:mobile},{status:status}], function (error, results, fields) {
   if(error){
      return res.status(400).send({ error:true, message: error.message });
    }
    if(!results){
      return res.status(400).send({ error:true, message: "no trades" });      
    }
    return res.send({ error: false, data: results, message: 'inplay list.' });
  });
});

// buy 
router.post('/buy', function (req, res) {
  let mobile = req.body.mobile;
  let symbol = req.body.selectedStock;
  let quantity = req.body.quantity;
  let price = req.body.price;
  if (!mobile || !symbol || !quantity || !price) {
    return res.status(400).send({ error:true, message: 'inputs missingggg' });
  }
  if (quantity < 0 || quantity == 0) {
    return res.status(400).send({ error:true, message: 'inputs quantity' });
  }
  dbConn.query('SELECT * FROM users where mobile=?', mobile, function (error, results, fields) {
    if(error){
      return res.status(400).send({ error:true, message: error.message });
    } 
    balance =  results[0].balance;
    if(parseFloat(balance) < parseFloat(price*quantity)){
      return res.status(400).send({ error:true, message: 'insufficiant funds' });
    }
    dbConn.query("INSERT INTO inplay SET ? ", { mobile: mobile, symbol: symbol, called: "buy", price: price,quantity:quantity,status:"open" }, function (error, results, fields) {
      if(error){
        return res.status(400).send({ error:true, message: error.message });
      }
      balance = balance - (price*quantity);
      amount = (price*quantity);
      let description = " BUY "+symbol+" of quantity "+quantity+" at "+price;
      dbConn.query("INSERT INTO accounts SET ? ", { mobile: mobile, description: description, debit: amount, balance: balance, status:"payout" }, function (error, results, fields) {
        if(error){
          return res.status(400).send({ error:true, message: error.message });
        }
        dbConn.query("UPDATE users SET ? WHERE ? ", [{balance:balance},{mobile:mobile}], function (error, results, fields) {
          if(error){
                return res.status(400).send({ error:true, message: error.message });
          }
          return res.send({ error: false, message: 'buy successfully done' });
          });
        });
      });
    });
});

// sell 
router.post('/sell', function (req, res) {
  let mobile = req.body.mobile;
  let symbol = req.body.selectedStock;
  let quantity = req.body.quantity;
  let price = req.body.price;
  if (!mobile || !symbol || !quantity || !price) {
    return res.status(400).send({ error:true, message: 'inputs missingggg' });
  }
  if (quantity < 0 || quantity == 0) {
    return res.status(400).send({ error:true, message: 'inputs quantity' });
  }
  dbConn.query('SELECT * FROM users where mobile=?', mobile, function (error, results, fields) {
    if(error){
      return res.status(400).send({ error:true, message: error.message });
    } 
    balance =  results[0].balance;
    if(parseFloat(balance) < parseFloat(price*quantity)){
      return res.status(400).send({ error:true, message: 'insufficiant funds' });
    }
    dbConn.query("INSERT INTO inplay SET ? ", { mobile: mobile, symbol: symbol, called: "sell", price: price,quantity:quantity,status:"open" }, function (error, results, fields) {
      if(error){
        return res.status(400).send({ error:true, message: error.message });
      }
      balance = balance - (price*quantity);
      amount = (price*quantity);
      let description = " SELL "+symbol+" of quantity "+quantity+" at "+price;
      dbConn.query("INSERT INTO accounts SET ? ", { mobile: mobile, description: description, debit: amount, balance: balance, status:"payout" }, function (error, results, fields) {
        if(error){
          return res.status(400).send({ error:true, message: error.message });
        }
        dbConn.query("UPDATE users SET ? WHERE ? ", [{balance:balance},{mobile:mobile}], function (error, results, fields) {
          if(error){
                return res.status(400).send({ error:true, message: error.message });
          }
          return res.send({ error: false, message: 'sell successfully done' });
          });
        });
      });
    });
});
  

// exitTrade
router.post('/exitTrade', function (req, res) {
  let id = req.body.id;
  if (!id) {
   return res.status(400).send({ error: true, message: 'provide id' });
  }
  dbConn.query('SELECT * FROM inplay where ? and ?', [{id:id},{status:"open"}], function (error, resultsX) {
   if(error){
      return res.status(400).send({ error:true, message: error.message });
    }
    if(!resultsX[0]){
      return res.status(400).send({ error:true, message: "no trades" });      
    }
    // exitPrice = 0;
    // if(resultsX[0].called == "buy"){
    //   exitPrice = (resultsX[0].cmp)*(resultsX[0].quantity) - (resultsX[0].price)*(resultsX[0].quantity);  
    // }
    // if(resultsX[0].called == "sell"){
    //   exitPrice = (resultsX[0].price)*(resultsX[0].quantity) - (resultsX[0].cmp)*(resultsX[0].quantity);
    // }
    exitPrice = ((resultsX[0].price)*(resultsX[0].quantity)) + ((resultsX[0].net)*(resultsX[0].quantity));
    39.2*10 + (- 0.75*10)
    // if(exitPrice < 0){
    //   console.log(exitPrice);
    //   return res.send({ error: false, message: 'malfunction' });      
    // }
    dbConn.query('update inplay set ? where ?', [{status:"closed"},{id:id}], function (error) {
      if(error){
         return res.status(400).send({ error:true, message: error.message });
       }
       dbConn.query('SELECT * FROM users where ? and ?', [{mobile:(resultsX[0].mobile)},{status:"active"}], function (error, Xresults) {
        if(error){
           return res.status(400).send({ error:true, message: error.message });
         }
         balance = (Xresults[0].balance) + exitPrice;
         description = "EXIT "+resultsX[0].symbol+ " of quantity "+resultsX[0].quantity +" at "+resultsX[0].cmp;
         dbConn.query("INSERT INTO accounts SET ? ", { mobile: resultsX[0].mobile, description: description, debit:0,credit:exitPrice,balance:balance,status:"payin" }, function (error, results, fields) {
          if(error){
             return res.status(400).send({ error:true, message: error.message });
           }
           dbConn.query('update users set ? where ?', [{balance:balance},{mobile:(Xresults[0].mobile)}], function (error) {
            if(error){
               return res.status(400).send({ error:true, message: error.message });
             }
             return res.send({ error: false, message: 'exit done' });      
            });
          });
        });
    });
  });
});

module.exports = router;
