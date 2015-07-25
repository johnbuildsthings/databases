CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  messageId MEDIUMINT NOT NULL AUTO_INCREMENT,
  message VARCHAR(160),
  room VARCHAR(20),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (messageId)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  userid MEDIUMINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20),

  PRIMARY KEY (userid)
);

CREATE TABLE users_messages (
  userId MEDIUMINT,
  messageId MEDIUMINT
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

