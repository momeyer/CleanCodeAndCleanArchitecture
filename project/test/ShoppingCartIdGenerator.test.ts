import { ShoppingCartIdGenerator } from "../src/domain/entity/ShoppingCartIdGenerator";

test("should generate sequencial CartId", () => {
  const generator = new ShoppingCartIdGenerator();
  expect(generator.generate()).toBe("SC1");
  expect(generator.generate()).toBe("SC2");
});
