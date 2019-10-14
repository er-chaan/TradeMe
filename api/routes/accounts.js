var express = require('express');
var router = express.Router();
var dbConn = require('../db');

// passbook
router.get('/passbook/:mobile', function (req, res) {
  let mobile = req.params.mobile;
  if (!mobile) {
   return res.status(400).send({ error: true, message: 'provide mobile' });
  }
  dbConn.query('SELECT * FROM accounts where mobile=? order by id desc', mobile, function (error, results, fields) {
   if(error){
      return res.status(400).send({ error:true, message: error.message });
    }
    if(!results){
      return res.status(400).send({ error:true, message: "no such user" });      
    }
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});

// payin 
router.post('/payin', function (req, res) {
  let mobile = req.body.mobile;
  let amount = req.body.amount;
  let description = "payin "+amount+" processed ";
  if (!mobile || !amount) {
    return res.status(400).send({ error:true, message: 'inputs missing' });
  }
  if (amount < 0) {
    return res.status(400).send({ error:true, message: 'inputs amount' });
  }
  dbConn.query('SELECT balance FROM users where mobile=?', mobile, function (error, results, fields) {
    if(error){
      return res.status(400).send({ error:true, message: error.message });
    } 
    let balance = amount + results[0].balance;
    dbConn.query("INSERT INTO accounts SET ? ", { mobile: mobile, description: description, credit: amount, balance: balance, status:"payin" }, function (error, results, fields) {
      if(error){
        return res.status(400).send({ error:true, message: error.message });
      }
      dbConn.query("UPDATE users SET ? WHERE ? ", [{balance:balance},{mobile:mobile}], function (error, results, fields) {
        if(error){
              return res.status(400).send({ error:true, message: error.message });
        }
        return res.send({ error: false, message: 'cashin successfully done' });
        });
      });
    });
});

router.post('/payout', function (req, res) {
  let mobile = req.body.mobile;
  let amount = req.body.amount;
  let description = "payout "+amount+" processed ";
  if (!mobile || !amount) {
    return res.status(400).send({ error:true, message: 'inputs missing' });
  }
  if (amount < 0) {
    return res.status(400).send({ error:true, message: 'inputs amount' });
  }
  dbConn.query('SELECT balance FROM users where mobile=?', mobile, function (error, results, fields) {
    if(error){
      return res.status(400).send({ error:true, message: error.message });
    } 
    let balance = results[0].balance - amount;
    if (balance < 0) {
      return res.status(400).send({ error:true, message: 'exceed amount' });
    }
    dbConn.query("INSERT INTO accounts SET ? ", { mobile: mobile, description: description, debit: amount, balance: balance, status:"payout" }, function (error, results, fields) {
      if(error){
        return res.status(400).send({ error:true, message: error.message });
      }
      dbConn.query("UPDATE users SET ? WHERE ? ", [{balance:balance},{mobile:mobile}], function (error, results, fields) {
        if(error){
              return res.status(400).send({ error:true, message: error.message });
        }
        return res.send({ error: false, message: 'cashout successfully done' });
        });
      });
    });
});

  
module.exports = router;
