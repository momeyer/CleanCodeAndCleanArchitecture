#features/bank-account.feature
Feature: generateOrder
    Scenario: Add camera to shopping cart
        Given an empty shopping cart
        When add camera to shopping cart
        Then shopping cart should have one camera