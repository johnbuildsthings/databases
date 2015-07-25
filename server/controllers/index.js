var models = require('../models');
var bluebird = require('bluebird');
var connection = require('../db/index');
var jsescape = require('js-string-escape')



var addToDB = function(table, rowsArray, valuesArray, cb){
  connection.dbConnection.getConnection(function(err, connection){
    if (err){
      connection.release();
      console.log('connection error in addToDB');
      return ;
    }

    var rows = rowsArray.join(', ');
    // var values = "'" + jsescape(valuesArray).join("', '") + "'";
    var values = '';
    console.log(valuesArray);
    valuesArray.forEach(function(element, index) {
      values += ("'"+jsescape(element)+"'");
      if (index < valuesArray.length-1) {
        values += ", ";
      }
    });
    //'" + data.message + ',' + data.roomname +"'
    var sql = "INSERT INTO "+table+" ("+rows+") VALUES ("+values+");"
    console.log(sql);
    connection.query(sql, function(err, result){
      connection.release();
      if(err){
        console.log('error updating users db', err);
      }else{
        console.log('success, ', result);
      }
    });
    cb();
  });

}




module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('POST MESSAGE');
      var data = req.body;
      console.log(data);
      addToDB('messages', ['message', 'room'], [data.message, data.roomname],function(){res.end();});
      // res.end();

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
      addToDB('users', ['name'], [data.username],function(){res.end();});
      // res.end();
    }
  }
};

