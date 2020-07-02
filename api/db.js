var mysql = require('mysql');
var crypto = require('crypto');

var mykey = crypto.createDecipher('aes-128-cbc', 'myHexKey');
var pass = mykey.update('00999fc70e918d77fea4fd9634ce9945', 'hex', 'utf8')
pass += mykey.final('utf8');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty@123',
    //password: pass,
    database: 'TradeMe'    
  });
  
dbConn.connect();

module.exports = dbConn;
