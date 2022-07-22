import { OrderIdGenerator } from "../../domain/entity/OrderIdGenerator";
import { OrdersRepository } from "../../domain/repository/OrdersRepository";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../../domain/repository/ShoppingCartRepository";
import { OrderUseCases } from "../../useCases/OrderUseCases";
import Http from "../http/Http";

export default class OrderController {
  constructor(
    readonly http: Http,
    readonly ordersRepository: OrdersRepository,
    readonly productRepository: ProductRepository,
    readonly orderIdGenerator: OrderIdGenerator,
    readonly shoppingCartRepository: ShoppingCartRepository
  ) {
    http.on("get", "/order/:orderId", async function (params: any, body: any): Promise<any> {
      const orderUseCases = new OrderUseCases(
        ordersRepository,
        productRepository,
        orderIdGenerator,
        shoppingCartRepository
      );
      const output = await orderUseCases.search(params.orderId);
      if (!output) {
        return { error: "Not Found" };
      }
      return output;
    });

    // http.on("get", "/products/:id", async function (params: any, body: any): Promise<any> {
    //   const productUseCases = new ProductUseCases(productRepository);

    //   const output = await productUseCases.search(Number(params.id));
    //   return output;
    // });
  }
}
