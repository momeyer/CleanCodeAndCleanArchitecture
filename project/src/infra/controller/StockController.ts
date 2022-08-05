import OrderCanceled from "../../domain/event/OrderCanceled";
import OrderPlaced from "../../domain/event/OrderPlaced";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import StockHandler from "../../useCases/StockHandler";
import Queue from "../queue/Queue";

export default class StockController {
  constructor(readonly queue: Queue, readonly stockRepository: StockEntryRepository) {
    queue.consume("orderPlaced", async function (orderPlaced: OrderPlaced) {
      const stockHandler = new StockHandler(stockRepository);
      stockHandler.handle(orderPlaced);
    });

    queue.consume("orderCanceled", async function (orderCanceled: OrderCanceled) {
      const stockHandler = new StockHandler(stockRepository);
      stockHandler.handle(orderCanceled);
    });
  }
}
