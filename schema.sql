-- create database
create database amazonia;
use amazonia;


create table accounts(
account_id VARCHAR(10) NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
username VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(50) NOT NULL,
role VARCHAR(20) NOT NULL
);