-- SELECT *

-- FROM stock

--     INNER JOIN product ON stock.productID = product.id #join stock and product

-- SELECT *

-- FROM order_items

--     JOIN orders ON order_items.orderID = orders.id

--     JOIN product ON order_items.productID = product.id # join orders and order items

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
values (1, "Camera", 20, 15, 10, 1, 10)
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
values (2, "Guitar", 100, 30, 10, 3, 20)
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
values (
        3,
        "Rubber_Duck",
        5,
        5,
        5,
        0.05,
        1,
    )
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
values (4, "tshirt", 1, 1, 1, 1, 100)
insert into
    product (
        id,
        description,
        height,
        width,
        depth,
        weight,
        price
    ) -- values (
    --     --         1,
    --     --         "Camera",
    --     --         ${product.physicalAttributes.height_cm},
    --     --         ${product.physicalAttributes.width_cm},
    --     --         ${product.physicalAttributes.depth_cm},
    --     --         ${product.physicalAttributes.weight_kg},
    --     --         ${product.price}
    --     --     );