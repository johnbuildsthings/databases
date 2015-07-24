CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  userId INT(4),
  message VARCHAR(160),
  room VARCHAR(20),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id INT(4),
  name VARCHAR(20)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

