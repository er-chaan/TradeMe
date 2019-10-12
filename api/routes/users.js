var express = require('express');
var router = express.Router();
var dbConn = require('../db');
var crypto = require('crypto');

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
  console.log(req.body);
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
  var mykey = crypto.createCipher('aes-128-cbc', newPassword);
  var pass = mykey.update('abc', 'utf8', 'hex')
  pass += mykey.final('hex');
  var mykeyX = crypto.createCipher('aes-128-cbc', password);
  var curPassword = mykeyX.update('abc', 'utf8', 'hex')
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

// login
router.post('/login', function (req, res) {
  let mobile = req.body.mobile;
  let password = req.body.password;
  if (!mobile || !password) {
    return res.status(400).send({ error:true, message: 'Please provide user' });
  }
  var mykey = crypto.createCipher('aes-128-cbc', password);
  var pass = mykey.update('abc', 'utf8', 'hex')
  pass += mykey.final('hex');
  var token = crypto.randomBytes(20).toString('hex');
  // var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
  // var pass = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')
  // pass += mykey.final('utf8');
  dbConn.query("UPDATE users SET ? WHERE ? AND ?", [{token:token},{mobile:mobile},{password:pass}], function (error, results, fields) {
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
  var mykey = crypto.createCipher('aes-128-cbc', password);
  var pass = mykey.update('abc', 'utf8', 'hex')
  pass += mykey.final('hex');
  var token = crypto.randomBytes(20).toString('hex');
  // var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
  // var pass = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')
  // pass += mykey.final('utf8');
 dbConn.query("INSERT INTO users SET ? ", { mobile: mobile, email: email, password: pass, token:token, status:"active" }, function (error, results, fields) {
  if(error){
    return res.status(400).send({ error:true, message: error.message });
  }
  return res.send({ error: false, mobile:mobile, token:token, message: 'New user has been created successfully.' });
  });
});

//////////////////////////////
//  Update user with id
router.put('/user', function (req, res) {
  let user_id = req.body.user_id;
  let user = req.body.user;
  if (!user_id || !user) {
    return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
  }
  dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
   });
  });
  //  Delete user
 router.delete('/user', function (req, res) {
  let user_id = req.body.user_id;
  if (!user_id) {
      return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
  });
  }); 
  router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
      if (error) throw error;
        res.json({ error: false, data: results, message: 'users list.' });
    });
  });
  
module.exports = router;
