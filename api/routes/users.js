var express = require('express');
var router = express.Router();
var dbConn = require('../db');
var crypto = require('crypto');

// getBalance
router.get('/getBalance/:mobile', function (req, res) {
  let mobile = req.params.mobile;
  if (!mobile) {
   return res.status(400).send({ error: true, message: 'provide mobile' });
  }
  dbConn.query('SELECT balance FROM users where mobile=?', mobile, function (error, results, fields) {
   if(error){
      return res.status(400).send({ error:true, message: error.message });
    }
    if(!results[0]){
      return res.status(400).send({ error:true, message: "no such user" });      
    }
    return res.send({ error: false, data: results[0], message: 'users list.' });
  });
});

// getSettings
router.get('/getSettings/:mobile', function (req, res) {
  let mobile = req.params.mobile;
  if (!mobile) {
   return res.status(400).send({ error: true, message: 'provide mobile' });
  }
  dbConn.query('SELECT mobile,email FROM users where mobile=?', mobile, function (error, results, fields) {
   if(error){
      return res.status(400).send({ error:true, message: error.message });
    }
    if(!results[0]){
      return res.status(400).send({ error:true, message: "no such user" });      
    }
    return res.send({ error: false, data: results[0], message: 'users list.' });
  });
});

// putSettings
router.put('/putSettings', function (req, res) {
  let mobile = req.body.mobile;
  let email = req.body.email;
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  if (!mobile || !password || !email || !newPassword || !password) {
    return res.status(400).send({ error:true, message: 'provide user details' });
  }
  if(newPassword === password){
    return res.status(400).send({ error:true, message: 'new password is same as old' });
  }
  var mykey = crypto.createCipher('aes-128-cbc', 'myHexKey');
  var pass = mykey.update(newPassword, 'utf8', 'hex')
  pass += mykey.final('hex');
  var mykeyX = crypto.createCipher('aes-128-cbc', 'myHexKey');
  var curPassword = mykeyX.update(password, 'utf8', 'hex')
  curPassword += mykeyX.final('hex');
  dbConn.query("UPDATE users SET ? WHERE ? AND ? AND ?", [{password:pass},{mobile:mobile},{email:email},{password:curPassword}], function (error, results, fields) {
    if(error){
          return res.status(400).send({ error:true, message: error.message });
    }
    if(!results.affectedRows){
      return res.status(400).send({ error:true, message: "settings update failed" });
    }
    return res.send({ error: false, message: 'update success.' });
  });
});

  
module.exports = router;
