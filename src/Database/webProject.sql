drop database if exists web;
create database web;
use web;



CREATE TABLE allUsers (
`name` char(100) NOT NULL, 
`password` char(50) NOT NULL,
allusersid int(20) NOT NULL,
PRIMARY KEY (allusersid)

)engine=InnoDB;


/* Διαχειριστής */
CREATE TABLE administrator (
adminName char(100) NOT NULL, 
`password` char(50) NOT NULL,
adminid int(20) NOT NULL,
PRIMARY KEY (adminName),
CONSTRAINT conAdmin FOREIGN KEY (adminid) REFERENCES allUsers(allusersid) ON UPDATE CASCADE ON DELETE CASCADE

)engine=InnoDB;



SELECT * FROM administrator;



/* ΧΡΗΣΤΗΣ */
CREATE TABLE `user` (
username char(100) NOT NULL,
`password` char(50) NOT NULL,
email char(20) NOT NULL,
userid INT(20) NOT NULL,
PRIMARY KEY (username),
CONSTRAINT conUser FOREIGN KEY (userid) REFERENCES allUsers(allusersid) ON UPDATE CASCADE ON DELETE CASCADE
)engine=InnoDB;

CREATE TABLE locationData (
userID INT(20) NOT NULL,
typeMovement CHAR,
verticalAccuracy ENUM('NULL','NOT NULL') NULL,
velocity INT(3),
accuracy INT(3),
timestampMs INT(20),
latitudeE7 INT(20),
longitudeE7 INT(20),
altitude INT(4),
CONSTRAINT conLoc FOREIGN KEY (userID) REFERENCES allUsers(allusersid) ON UPDATE CASCADE ON DELETE CASCADE
)engine=InnoDB;
