const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { handle404Error, handleDevErrors } = require('./app/middlewares/errorHandlers');
const { getConnection } = require('./app/middlewares/mysql');

const index = require('./app/routes/index');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//var path = require('path');



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://ieeeaditsb.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

/* http server */
const server = http.createServer(app);


app.use('/', getConnection, index);


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
// const port = process.env.PORT || 5000;
const port = 5000;


/* running application server on port 3000 */
server.listen(port, () => {
  console.log(`Hey! I'm running on ${server.address().port}`);
});
module.exports = app;
