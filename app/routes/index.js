var express = require('express');
var router = express.Router();
var { yahResponse } = require('../utils/responseHandler')
const mysql = require('mysql');
const appService = require('../services/appService');

router.post('/search',async function(req, res, next) {
  console.log(req.body)
  var searchStrings = req.body.searchStrings
  var searchQuery = "SELECT * FROM test_tb WHERE"
  var searchStringsArray = []
  for(let strNum=0;strNum<searchStrings.length;strNum++){
    searchQuery += " first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone_number LIKE ?"
    searchStringsArray = searchStringsArray.concat(Array(4).fill(`%${searchStrings[strNum]}%`));
    if(strNum != searchStrings.length -1){
      searchQuery += " OR"
    }
  }
  searchQuery +=" COLLATE utf8_general_ci"
  const query = mysql.format(searchQuery,searchStringsArray)
  console.log(searchStringsArray)
  console.log(query)
  var searchData =  await appService.runQuery(req.mysqlConn,query);
  console.log(searchData)
  return yahResponse(res, searchData)
});


module.exports = router;
