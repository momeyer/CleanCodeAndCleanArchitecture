import StockCalculator from "../domain/entity/StockCalculator";
import StockEntryRepository from "../domain/repository/StockEntryRepository";

export default class GetStock {
  constructor(readonly stockEntryRepository: StockEntryRepository) {}

  async execute(idItem: number): Promise<Output> {
    const stockEntries = await this.stockEntryRepository.getStockEntries(idItem);
    const total = StockCalculator.calculate(stockEntries);
    return {
      total,
    };
  }
}

type Output = {
  total: number;
};
