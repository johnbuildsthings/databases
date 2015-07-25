var models = require('../models');
var bluebird = require('bluebird');
var connection = require('../db/index');
var jsescape = require('js-string-escape');
var mysql = require('mysql');



var addToDB = function(table, rowsArray, valuesArray, cb){
  connection.dbConnection.getConnection(function(err, connection){
    if (err){
      connection.release();
      console.log('connection error in addToDB');
      return ;
    }

    var sql = "INSERT INTO ?? (??) VALUES (?);"
    var inserts = [table, rowsArray, valuesArray];
    sql = mysql.format(sql, inserts);
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

var getFromDB = function(table, returnColumn, searchColumn, value, cb){
  connection.dbConnection.getConnection(function(err, connection){
    if(err){
      connection.release();
      console.log('connection error in getFromDB');
      return;
    }
    var sql = "SELECT * FROM messages;" // WHERE ?? = (?);"
    var inserts = [returnColumn, table, searchColumn, value];
    // sql = mysql.format(sql, inserts);
    connection.query(sql, function(err, result){
      connection.release();
      if(err){
        console.log('error updating users db', err);
      }else{
        console.log('success, ', result);
        cb(JSON.stringify(result));
        return result;
      }
    });
  });
}


module.exports = {
  messages: {
    get: function (req, res) {
      var data = req.body;
      console.log(data);
      if(data === undefined){

      }
      getFromDB('messages', ['message', 'room'], 'message', '*', function(arg){res.end(arg);});
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('POST MESSAGE');
      var data = req.body;
      console.log(data);
      addToDB('messages', ['message', 'room'], [data.message, data.roomname], function(){res.end();});
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

