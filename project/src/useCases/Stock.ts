import StockCalculator from "../domain/entity/StockCalculator";
import StockEntry from "../domain/entity/StockEntry";
import StockEntryRepository from "../domain/repository/StockEntryRepository";

export class GetStock {
  constructor(readonly stockEntryRepository: StockEntryRepository) {}

  async execute(itemId: number): Promise<Output> {
    const stockEntries = await this.stockEntryRepository.getStockEntries(itemId);
    const total = StockCalculator.calculate(stockEntries);
    return {
      total,
    };
  }
}

export class AddToStock {
  constructor(readonly stockEntryRepository: StockEntryRepository) {}

  async execute(itemId: number, quantity: number): Promise<void> {
    await this.stockEntryRepository.save(new StockEntry(itemId, "in", quantity));
  }
}

type Output = {
  total: number;
};
