var express = require('express');
var router = express.Router();
var dbConn = require('../db');

// passbook
router.get('/tradebook/:mobile', function (req, res) {
  let mobile = req.params.mobile;
  if (!mobile) {
   return res.status(400).send({ error: true, message: 'provide mobile' });
  }
  dbConn.query('SELECT * FROM inplay where mobile=? order by id desc', mobile, function (error, results, fields) {
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

  console.log(req.body);
  if (!mobile || !symbol || !quantity || !price) {
    return res.status(400).send({ error:true, message: 'inputs missingggg' });
  }
  if (quantity < 0 || quantity == 0) {
    return res.status(400).send({ error:true, message: 'inputs quantity' });
  }
  dbConn.query('SELECT balance FROM users where mobile=?', mobile, function (error, results, fields) {
    if(error){
      return res.status(400).send({ error:true, message: error.message });
    } 
    let balance =  results[0].balance;
    if(balance < (price*quantity)){
      return res.status(400).send({ error:true, message: 'insufficiant funds' });
    }
    dbConn.query("INSERT INTO inplay SET ? ", { mobile: mobile, symbol: symbol, called: "buy", price: price,quantity:quantity,status:"open" }, function (error, results, fields) {
      if(error){
        return res.status(400).send({ error:true, message: error.message });
      }
      let balance = balance - (price*quantity);
      let amount = (price*quantity);
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

// router.post('/payout', function (req, res) {
//   let mobile = req.body.mobile;
//   let amount = req.body.amount;
//   let description = "payout "+amount+" processed ";
//   if (!mobile || !amount) {
//     return res.status(400).send({ error:true, message: 'inputs missing' });
//   }
//   if (amount < 0) {
//     return res.status(400).send({ error:true, message: 'inputs amount' });
//   }
//   dbConn.query('SELECT balance FROM users where mobile=?', mobile, function (error, results, fields) {
//     if(error){
//       return res.status(400).send({ error:true, message: error.message });
//     } 
//     let balance = results[0].balance - amount;
//     if (balance < 0) {
//       return res.status(400).send({ error:true, message: 'exceed amount' });
//     }
//     dbConn.query("INSERT INTO accounts SET ? ", { mobile: mobile, description: description, debit: amount, balance: balance, status:"payout" }, function (error, results, fields) {
//       if(error){
//         return res.status(400).send({ error:true, message: error.message });
//       }
//       dbConn.query("UPDATE users SET ? WHERE ? ", [{balance:balance},{mobile:mobile}], function (error, results, fields) {
//         if(error){
//               return res.status(400).send({ error:true, message: error.message });
//         }
//         return res.send({ error: false, message: 'cashout successfully done' });
//         });
//       });
//     });
// });

  
module.exports = router;
