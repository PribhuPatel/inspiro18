/* this is config file for our application */

module.exports = {
    jsonWebTokenKey : 'jsonWebTokenSecreyKey1212##',
    /* this mysql database config 
       you can also opt for env variables  
    */
    mysql : {
        host: 'localhost',
        user : 'root',
        password: '',
        database : 'ieee',
        connectionLimit: 100

    },
    mongoDB : {
        host : 'localhost',
        database : 'express-zero-config'
    },
    nodemailer:{
        service: 'gmail',
        auth: {
            user: 'ieee@adit.ac.in',
            pass: 'Shreejieee'
        }
    },
    /* do not change this salrounds value */
    bycryptSalt : 13
}