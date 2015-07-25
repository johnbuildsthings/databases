var models = require('../models');
var bluebird = require('bluebird');
var connection = require('../db/index');



module.exports = {
  messages: {
    get: function (req, res) {
      var data = req.body;
      if(data === undefined){

      }
      connection.getFromDB('messages', ['message', 'room'], 'message', '*', function(arg){res.end(arg);});
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // console.log('POST MESSAGE');
      var data = req.body;
      // console.log(data);
      connection.addToDB('messages', ['message', 'room'], [data.message, data.roomname], function(){res.end();});
      // res.end();

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    },
    post: function (req, res) {
      var data = req.body;
      // console.log(data);
      // console.log(data.username);
      connection.addToDB('users', ['name'], [data.username],function(){res.end();});
      // res.end();
    }
  }
};

