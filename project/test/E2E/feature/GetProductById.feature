Feature: GetProductById
    Scenario: Should fail to get non-existing product
        Given an invalid product id
        When search product by id
        Then undefined is returned