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


insert into accounts 
values(1, 'Ng Chin Ling', 'nchinling', '#a888888', 'Manager');

insert into accounts 
values(2, 'Jackson Huang', 'jhuang', '#a777777', 'Software Engineer');