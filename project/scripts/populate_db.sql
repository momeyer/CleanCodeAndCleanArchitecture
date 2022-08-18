-- Active: 1654849507737@@127.0.0.1@3306@test
USE test;

insert into
    product (
        id,
        description,
        height,
        width,
        depth,
        weight,
        price
    )
values (1, "Camera", 20, 15, 10, 1, 10), (2, "Guitar", 100, 30, 10, 3, 20), (3, "Rubber_Duck", 5, 5, 5, 0.05, 1), (4, "tshirt", 1, 1, 1, 1, 100);

insert into
    stock_entries (productId, operation, quantity)
values (1, "in", 100), (2, "in", 100), (3, "in", 100), (4, "in", 100);

INSERT INTO
    discount_codes(id, amount, code, expire_date)
VALUES (
        1,
        0.3,
        'get30',
        '2222-07-22 22:22:22'
    ), (
        2,
        1,
        "getExpired",
        '2000-07-25 15:34:50'
    );