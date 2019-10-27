var express = require('express');
var router = express.Router();
var dbConn = require('../db');
var crypto = require('crypto');
var mail = require('../mail');

// forgot
router.post('/forgot', function (req, res) {
    let email = req.body.email;
    if (!email) {
     return res.status(400).send({ error: true, message: 'provide email' });
    }
    dbConn.query('SELECT password FROM users where email=?', email, function (error, results, fields) {
     if(error){
        return res.status(400).send({ error:true, message: error.message });
      }
      if(!results[0]){
        return res.status(400).send({ error:true, message: "no such user" });      
      }
      var mykey = crypto.createDecipher('aes-128-cbc', 'myHexKey');
      var pass = mykey.update(results[0].password, 'hex', 'utf8')
      pass += mykey.final('utf8');
      // password emailing utility
      var mailOptions = {
        from: 'server.trademe@gmail.com',
        to: email,
        subject: 'TradeMe | Password',
        text: 'your password : '+pass
      };
      
      mail.sendMail(mailOptions, function(error, info){
        if (error) {
          // console.log(error);
          return res.status(400).send({ error:true, message: error.message });
        } else {
          // console.log('Email sent: ' + info.response);
          return res.send({ error: false, data: results[0], message: 'password sent to your email' });
        }
      }); 
    });
});

// login
router.post('/login', function (req, res) {
  let mobile = req.body.mobile;
  let password = req.body.password;
  if (!mobile || !password) {
    return res.status(400).send({ error:true, message: 'Please provide user' });
  }
  var mykey = crypto.createCipher('aes-128-cbc', 'myHexKey');
  var pass = mykey.update(password, 'utf8', 'hex')
  pass += mykey.final('hex');
  var token = crypto.randomBytes(20).toString('hex');
  dbConn.query("UPDATE users SET ? WHERE ? AND ? AND ?", [{token:token},{mobile:mobile},{password:pass},{status:'active'}], function (error, results, fields) {
    if(error){
          return res.status(400).send({ error:true, message: error.message });
    }
    if(!results.affectedRows){
      return res.status(400).send({ error:true, message: "login failed" });
    }
    return res.send({ error: false, mobile:mobile, token:token, message: 'Login success.' });
  });
});

// registration
router.post('/register', function (req, res) {
  let mobile = req.body.mobile;
  let email = req.body.email;
  let password = req.body.password;
  if (!mobile || !email || !password) {
    return res.status(400).send({ error:true, message: 'inputs missing' });
  }
  var mykey = crypto.createCipher('aes-128-cbc', 'myHexKey');
  var pass = mykey.update(password, 'utf8', 'hex')
  pass += mykey.final('hex');
  var token = crypto.randomBytes(20).toString('hex');
 dbConn.query("INSERT INTO users SET ? ", { mobile: mobile, email: email, password: pass, token:token, status:"active" }, function (error, results, fields) {
  if(error){
    return res.status(400).send({ error:true, message: error.message });
  }
  return res.send({ error: false, mobile:mobile, token:token, message: 'New user has been created successfully.' });
  });
});

  
module.exports = router;
