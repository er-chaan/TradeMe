var nodemailer = require('nodemailer');
var crypto = require('crypto');

var mykey = crypto.createDecipher('aes-128-cbc', 'myHexKey');
var pass = mykey.update('16f6ee333087cc134afc201236048cd5', 'hex', 'utf8')
pass += mykey.final('utf8');

var mail = nodemailer.createTransport({
    service: 'gmail',
    // host:'smtp.gmail.com',
    // port:465,
    // secure:true,
    auth: {
        user: 'server.trademe@gmail.com',
        pass: pass
    }
});


module.exports = mail;
