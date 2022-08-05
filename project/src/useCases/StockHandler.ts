import StockEntry from "../domain/entity/StockEntry";
import OrderCanceled from "../domain/event/OrderCanceled";
import OrderPlaced from "../domain/event/OrderPlaced";
import StockEntryRepository from "../domain/repository/StockEntryRepository";

export default class StockHandler {
  constructor(readonly stockRepository: StockEntryRepository) {}
  async handle(orderEvent: OrderPlaced | OrderCanceled) {
    if (orderEvent.name === "orderPlaced") {
      for (const item of orderEvent.order.items) {
        await this.stockRepository.save(new StockEntry(item.productId, "out", item.quantity));
      }
    }
    if (orderEvent.name === "orderCanceled") {
      for (const item of orderEvent.order.items) {
        await this.stockRepository.save(new StockEntry(item.productId, "in", item.quantity));
      }
    }
  }
}
