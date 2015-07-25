var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


exports.dbConnection = mysql.createPool({
  connectionLimit: 100,
  user: "root",
  password: "",
  database: "chat",
  debug: false
});
// export.dbConnection.connect();
// var tablename = "messages"; // TODO: fill this out

//  Empty the db table before each test so that multiple tests
//  * (or repeated runs of the tests) won't screw each other up: 
// dbConnection.query("truncate " + tablename, done);

exports.addToDB = function(table, rowsArray, valuesArray, cb){
  exports.dbConnection.getConnection(function(err, connection){
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

exports.getFromDB = function(table, returnColumn, searchColumn, value, cb){
  exports.dbConnection.getConnection(function(err, connection){
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