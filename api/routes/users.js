var express = require('express');
var router = express.Router();
var dbConn = require('../db');

router.get('/', function(req, res, next) {
  dbConn.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
      res.json({ error: false, data: results, message: 'users list.' });
  });
});

router.get('/:id', function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
   return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
   if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'users list.' });
  });
});

// Add a new user  
router.post('/', function (req, res) {
  let mobile = req.body.mobile;
  let email = req.body.email;
  let password = req.body.password;
  if (!mobile) {
    return res.status(400).send({ error:true, message: 'Please provide user' });
  }
 dbConn.query("INSERT INTO users SET ? ", { mobile: mobile, email: email, password: password, token:"xxx", status:"active" }, function (error, results, fields) {
  if(error){
    return res.status(400).send({ error:true, message: error.message });
  }
  return res.send({ error: false, data: req.body, message: 'New user has been created successfully.' });
  });
});

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

module.exports = router;
