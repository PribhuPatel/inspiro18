var nodemailer = require('nodemailer');

const config = require('../utils/config');

//Include below line at mailer file
var transporter = nodemailer.createTransport(config.nodemailer);

module.exports = {
    transporter,
    sendMail : async(toMail,subject,bodyHtml)=>
{
    var mailOptions = {
        from: 'markhentony@gmail.com',
        to: toMail,
        subject: subject,
       // text: 'That was easy!',
        html: bodyHtml
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}
}