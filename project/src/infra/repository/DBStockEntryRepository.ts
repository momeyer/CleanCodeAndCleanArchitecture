import StockEntry from "../../domain/entity/StockEntry";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import Connection from "../database/Connection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {
  constructor(readonly connection: Connection) {}

  async save(stockEntry: StockEntry): Promise<void> {
    await this.connection.query(
      `insert into stock_entries (productId, operation, quantity) values (${stockEntry.itemId}, "${stockEntry.operation}", ${stockEntry.quantity})`
    );
  }

  async getStockEntries(itemId: number): Promise<StockEntry[]> {
    const stockEntriesData = await this.connection.query(`select * from stock_entries where productId = ${itemId}`);
    const stockEntries = [];
    for (const stockEntryData of stockEntriesData) {
      const stockEntry = new StockEntry(stockEntryData.id_item, stockEntryData.operation, stockEntryData.quantity);
      stockEntries.push(stockEntry);
    }
    return stockEntries;
  }

  async clear(): Promise<void> {
    await this.connection.query("delete from stock_entries");
  }
}
