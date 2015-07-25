var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


exports.dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});
// export.dbConnection.connect();
// var tablename = "messages"; // TODO: fill this out

//  Empty the db table before each test so that multiple tests
//  * (or repeated runs of the tests) won't screw each other up: 
// dbConnection.query("truncate " + tablename, done);
