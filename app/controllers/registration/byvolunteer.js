
/* centralizing all the responses */

// @ts-check

/* for handling success or failed responses */
const tokenHelper = require('../../utils/tokenHelper');
const services = require('../../services/auth/auth');
const bcrypter = require('../../utils/bcrypter');
const mysql = require('mysql');
const appService = require('../../services/appService.js');
const {transporter} = require('../../services/sendmail.js');

/* we will be using awesome Async await JS feature for our code
for more information please refer to
https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9
*/


module.exports = {
    register: async (req, res) => {
        var name = req.body.name;
        var college = req.body.college;
        //var dep = req.body.department;
        var email = req.body.email;
        var mobile = req.body.mobile;
        var member_id = req.body.memID;
        var member_type = req.body.memType;
        var food_res = req.body.foodRes;
        var pay_opt = req.body.payOpt;
        var total_payment = req.body.totalPayment;
        var registerBy = req.body.registerBy;

        var data = {
            name : name,
            college : college,
            email : email,
            mobile : mobile,
            member_id : member_id,
            member_type : member_type,
            food_restrictions: food_res,
            payment_option : pay_opt,
            total_payment : total_payment,
            register_by : registerBy,
            payment_verify : 1
        }
        console.log(data);
        const query = mysql.format("insert into participants set ? ",[data]);
        var h = await appService.runQuery(req.mysqlConn,query);

        var bodyHtml = "<h1>You are registered</h1>";
        var mailOptions = {
            from: 'markhentony@gmail.com',
            to: email,
            subject: "Email Registration",
            // text: 'That was easy!',
            html: bodyHtml
        };
        //await sendmail.sendMail(email,"Event Registration",sendHtml);
        appService.sendMail(transporter,mailOptions)

        var userId = h.insertId;
        data.userId = userId;
        res.json({ status: true, data: data });
    },
};
