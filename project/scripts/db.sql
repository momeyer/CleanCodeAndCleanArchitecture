CREATE DATABASE test;

USE test;

CREATE TABLE
    discount_code(
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
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        cpf VARCHAR(255),
        total int,
        status VARCHAR(255),
        time DATETIME,
        items mediumtext(16777215)
    );

SELECT *
FROM
    discount_code -- insert into
    --     product (
    --         id,
    --         description,
    --         height,
    --         width,
    --         depth,
    --         weight,
    --         price
    --     )
    -- values (1, "Camera", 20, 15, 10, 1, 10), (2, "Guitar", 100, 30, 10, 3, 20), (3, "Rubber_Duck", 5, 5, 5, 0.05, 1), (4, "tshirt", 1, 1, 1, 1, 100) -- insert into
    -- insert into
    --     stock_entries (productId, operation, quantity)
    -- values (1, "in", 100), (2, "in", 100), (3, "in", 100), (4, "in", 100)