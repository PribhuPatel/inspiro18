
const sendmail = require('./sendmail.js');
/* centalizing all the manual queries at one place */
module.exports = {
    runQuery : async (connection, query) =>{
        return new Promise((resolve, reject) =>{
            connection.query(query,(err,result)=>{
                (err ? reject(err) : resolve(result))
            })
        })
    },
    sendMail : async (transporter, mailOptions) =>{
        return new Promise((resolve, reject) =>{
            transporter.sendMail(mailOptions,(err,info)=>{
                (err ? reject(err) : resolve(info))
            })
        })
    }
}