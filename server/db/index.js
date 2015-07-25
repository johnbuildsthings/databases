/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users', {
  username: Sequelize.STRING
});

var Message = sequelize.define('messages', {
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  room: Sequelize.STRING
});

Message.sync();
User.sync();
var tables = {
  user: User,
  messages: Message
};

var buildObj = function(keysArray, valuesArray){
  var obj = {};
  for(var i=0;i<keysArray.length;i++){
    obj[keysArray[i]] = valuesArray[i];
  }
  return JSON.parse(JSON.stringify(obj));
}

exports.addToDB = function(table, rowsArray, valuesArray, cb){
  var tableName = tables[table];
  // console.log('++++++++++++++++++++++++++ ' + tableName);
  tableName.sync().then(function(){
    var info = buildObj(rowsArray, valuesArray);
    info = tableName.build(info);
    info.save().then(function(){
      console.log('error');
      tableName.findAll({where: info}).then(function(usrs){

      })
    });
  })
  .catch(function(err){
    console.log('error', err/*, 'tableName', tableName*/);
  })
  cb();
}

exports.getFromDB = function(table, returnColumn, searchColumn, value, cb){
  var tableName = tables[table];
  // console.log(tableName);
  tableName.sync().then(function() {
    var info = buildObj(searchColumn, value);
    tableName.findAll().then(function(data){
      // Return the info we've found here.
      // for (var i = 0; i < data.length; i++) {
      //   console.log(data[i] + " exists");
      // }
      // plain: true;
      console.log('data values: ', data.get({plain:true}));
      return data.dataValues;
    })
  });
  cb();
}

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
// Message.sync();
// User.sync().then(function() {
//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
//   var newUser = User.build({username: "Jean Valjean"});
//   console.log('error');
//   newUser.save().then(function() {

//      This callback function is called once saving succeeds. 
//     // Retrieve objects from the database:
//     User.findAll({ where: {username: "Jean Valjean"} }).then(function(usrs) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < usrs.length; i++) {
//         console.log(usrs[i].username + " exists");
//       }
//     });
//   });
// });
