const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const cors = require('cors');
const { handle404Error, handleDevErrors } = require('./app/middlewares/errorHandlers');
const { getConnection } = require('./app/middlewares/mysql');

const { verifyToken } = require('./app/middlewares/verifyToken');
//const { connectMongoDb } = require('./app/middlewares/mongodb');
const compression = require('compression');
const nodemailer = require('nodemailer');

const index = require('./app/routes/index');
const app = express();
const fs = require('fs');
// cors being added for more information refer https://www.npmjs.com/package/cors
app.use(cors());
// refer this https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
app.use(compression())

// view engine setup
//app.set('views', path.join(__dirname, './app/views'));
//app.set('view engine', 'pug');


app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//var path = require('path');



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://ieeeaditsb.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
/* connecting MongoDB */
//app.use(connectMongoDb);

/* http server */
const server2 = http.createServer(app);

/*
var privateKey = fs.readFileSync( './ieeeaditsb.key' );
var certificate = fs.readFileSync( './ieeeaditsb_com.crt' );

const server =https.createServer({
    key: privateKey,
    cert: certificate
}, app);
*/

var https_options = {
    key: fs.readFileSync("./ieeeaditsb.key"),
    cert: fs.readFileSync("./ieeeaditsb_com.crt"),
    ca: [
        fs.readFileSync('./COMODORSADomainValidationSecureServerCA.crt'),
        fs.readFileSync('./COMODORSAAddTrustCA.crt')
    ]

};
const server =https.createServer(https_options, app);
// viewed at http://localhost:8080
/*
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
*/

//app.use('/', index);

/* serving auth files to route */
/* index.js file will be called by default if you don't mention any file name explicitly
  ...auth/index or .../auth  both represents same thing  */
app.use('/api/auth', getConnection, require('./app/controllers/auth'));
app.use('/api/registration', getConnection,verifyToken, require('./app/controllers/registration'));
//app.use('/getPosts', verifyToken, require('./app/controllers/posts/getPosts').getPosts);
//app.use('/api',require('./app/controllers/api'));


/* these are set of mongodb examples */
//app.use('/mongo', require('./app/controllers/mongoDB'));

/* query all the errors */
app.use('/getErrorsList', async ( req, res ) =>{
  const haha =  await require('./app/logger').queryErrors(new Date('2018-2-11'), new Date());
  res.json(haha)
});

// catch 404 and forward to error handler
app.use(handle404Error);

// error handler
app.use(handleDevErrors);

/* will be assinging env port if it's available  else port will be 3000 */
//const port = process.env.PORT || 5000;
const port = 5000;


/* running application server on port 3000 */
server.listen(port, () => {
  console.log(`Hey! I'm running on ${server.address().port}`);
});
/*
const port2 = 80;
server2.listen(port2, () => {
    console.log(`Hey! I'm running on ${server2.address().port2}`);
});*/
module.exports = app;
