var express = require('express');
var router = express.Router();
var mysql = require('../middlewares/mysql');
var db = mysql.connection;
var transporte = require('../services/sendmail.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/form',function(req, res, next) {
  res.render('form', { title: 'Express' });
});

router.post('/mail',function(req, res, next) {
    var toMail = req.body.toMail;
    var html = req.body.sendHtml;
    var subject  =req.body.subject;
    transporte.sendMail(toMail,subject,html);
  res.send("Heelo");
});

router.post('/form',async function(req, res, next) {
  var data = {
    username:req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobile_number:req.body.mobile_number,
    department:req.body.department,
    sem:req.body.sem,
    usertype:req.body.usertype
}
  await db.query("INSERT INTO profile SET ?",[data],function(err,res,fields){
    if(err==null){
    console.log(res);
    }
    else{
        console.log(err);
    }
});
  res.redirect("/");
});


module.exports = router;
