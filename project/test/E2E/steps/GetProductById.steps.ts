import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("test/E2E/feature/GetProductById.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    // example
  });

  test("Should fail to get non-existing product", ({ given, when, then }) => {
    given("an invalid product id", () => {
      // example
    });

    when("search product by id", () => {
      // example
    });

    then("undefined is returned", () => {
      // example
    });
  });
});
