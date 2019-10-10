var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'TradeMe'
  });

dbConn.connect(); 

module.exports = dbConn;
