-- Active: 1654849507737@@127.0.0.1@3306@test

CREATE DATABASE test;

USE test;

CREATE TABLE
    discount_codes(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        amount FLOAT,
        code VARCHAR(255),
        expire_date DATETIME
    );

CREATE TABLE
    product(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        description varchar(250),
        height float,
        width float,
        depth float,
        weight float,
        price float
    );

CREATE TABLE
    stock_entries(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        productId INT,
        operation VARCHAR(3),
        quantity int
    );

CREATE TABLE
    orders(
        id VARCHAR(255),
        cpf VARCHAR(255),
        total int,
        status VARCHAR(255),
        time DATETIME,
        items TEXT
    );

SET GLOBAL sql_mode = (SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));
