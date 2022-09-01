import { OrderIdGenerator } from "../../domain/entity/OrderIdGenerator";
import { OrdersRepository } from "../../domain/repository/OrdersRepository";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../../domain/repository/ShoppingCartRepository";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import { OrderUseCases } from "../../useCases/OrderUseCases";
import Http from "../http/Http";
import Queue from "../queue/Queue";

export default class OrderController {
  constructor(
    readonly http: Http,
    readonly ordersRepository: OrdersRepository,
    readonly productRepository: ProductRepository,
    readonly stockRepository: StockEntryRepository,
    readonly orderIdGenerator: OrderIdGenerator,
    readonly shoppingCartRepository: ShoppingCartRepository,
    readonly queue: Queue
  ) {
    http.on("get", "/order/:orderId", async function (params: any, body: any): Promise<any> {
      const orderUseCases = new OrderUseCases(
        ordersRepository,
        productRepository,
        stockRepository,
        orderIdGenerator,
        shoppingCartRepository,
        queue
      );
      console.log("receiving get request: ", params.orderId);
      const output = await orderUseCases.search(params.orderId);
      if (!output) {
        return { error: "Not Found" };
      }
      return output;
    });

    http.on("post", "/order/place", async function (params: any, body: any): Promise<any> {
      const orderUseCases = new OrderUseCases(
        ordersRepository,
        productRepository,
        stockRepository,
        orderIdGenerator,
        shoppingCartRepository,
        queue
      );

      const output = await orderUseCases.place({ cpf: body.cpf, id: body.shoppingCartId, date: body.date });
      if (!output) {
        return { error: "failed" };
      }
      console.log("receiving post request: ", output.id);
      return output;
    });

    http.on("post", "/internal/order/:orderId", async function (params: any, body: any): Promise<any> {
      const orderUseCases = new OrderUseCases(
        ordersRepository,
        productRepository,
        stockRepository,
        orderIdGenerator,
        shoppingCartRepository,
        queue
      );
      const output = await orderUseCases.updateStatus(params.orderId, body.status);
      if (!output) {
        return { error: "failed" };
      }
      return output;
    });
  }
}
