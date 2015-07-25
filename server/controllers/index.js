var models = require('../models');
var bluebird = require('bluebird');
var connection = require('../db/index');




var addToDB = function(table, rowsArray, valuesArray){
  connection.dbConnection.connect();
  var rows = rowsArray.join(', ');
  var values = "'" + valuesArray.join("', '") + "'";
  //'" + data.message + ',' + data.roomname +"'
  var sql = "INSERT INTO "+table+" ("+rows+") VALUES ("+values+");"
  console.log(sql);
  connection.dbConnection.query(sql, function(err, result){
    if(err){
      console.log('error updating users db', err);
    }else{
      console.log('success, ', result);
    }
  });
  connection.dbConnection.end();
}




module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('POST MESSAGE');
      var data = req.body;
      console.log(data);
      addToDB('messages', ['message', 'room'], [data.message, data.roomname]);
      res.end();

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    },
    post: function (req, res) {
      var data = req.body;
      console.log(data);
      console.log(data.username);
      addToDB('users', ['name'], [data.username]);
      res.end();
    }
  }
};

