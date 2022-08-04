import StockEntry from "../src/domain/entity/StockEntry";
import MySqlPromiseConnectionAdapter from "../src/infra/database/MySqlPromiseConnectionAdapter";
import DBStockEntryRepository from "../src/infra/repository/DBStockEntryRepository";
import { GetStock } from "../src/useCases/Stock";

test("Should get number of items in stock", async () => {
  const connection = new MySqlPromiseConnectionAdapter();
  const stockEntryRepository = new DBStockEntryRepository(connection);
  const getStock = new GetStock(stockEntryRepository);
  await stockEntryRepository.connection.connect();
  await stockEntryRepository.clear();
  await stockEntryRepository.save(new StockEntry(1, "in", 10));
  await stockEntryRepository.save(new StockEntry(1, "in", 10));
  await stockEntryRepository.save(new StockEntry(1, "out", 5));
  await stockEntryRepository.save(new StockEntry(1, "out", 5));
  const output = await getStock.execute(1);
  expect(output.total).toBe(10);

  await stockEntryRepository.connection.close();
});
