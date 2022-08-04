import StockEntry from "../../domain/entity/StockEntry";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";

export default class NonPersistentStockEntryRepository implements StockEntryRepository {
  entries: StockEntry[] = [];

  async save(stockEntry: StockEntry): Promise<void> {
    this.entries.push(stockEntry);
  }

  async getStockEntries(itemId: number): Promise<StockEntry[]> {
    let items: StockEntry[] = [];
    this.entries.forEach((entry) => {
      if (entry.itemId === itemId) {
        items.push(entry);
      }
    });

    return items;
  }

  async clear(): Promise<void> {
    this.entries.splice(0);
  }
}
