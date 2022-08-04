import StockEntry from "../src/domain/entity/StockEntry";

test("Should add item to stock", () => {
  const stockEntry = new StockEntry(1, "in", 10);
  expect(stockEntry.itemId).toBe(1);
  expect(stockEntry.operation).toBe("in");
  expect(stockEntry.quantity).toBe(10);
});
