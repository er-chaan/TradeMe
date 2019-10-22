var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: 'root',
    password: 'root@9004313006#tradeME',
    database: 'TradeMe'
    
  });

  
dbConn.connect();

// dbConn.ping(function(err){
//   console.log("======"+err);
//   return res.status(400).send({ error:true, message: err.message });
// })

module.exports = dbConn;
