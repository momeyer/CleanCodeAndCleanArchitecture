import { ShoppingCartIdGenerator } from "../../domain/entity/ShoppingCartIdGenerator";
import { DiscountCodeRepository } from "../../domain/repository/DiscountCodeRepository";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../../domain/repository/ShoppingCartRepository";
import { ShoppingCartUseCases } from "../../useCases/ShoppingCartUseCases";
import Http from "../http/Http";

export default class ShoppingCartController {
  constructor(
    readonly http: Http,
    readonly productRepository: ProductRepository,
    readonly discountRepository: DiscountCodeRepository,
    readonly shoppingCartRepository: ShoppingCartRepository,
    readonly shoppingCartIdGenerator: ShoppingCartIdGenerator
  ) {
    http.on("get", "/shoppingCart/:shoppingCartId", async function (params: any, body: any): Promise<any> {
      const shoppingCartUseCases = new ShoppingCartUseCases(
        productRepository,
        discountRepository,
        shoppingCartRepository,
        shoppingCartIdGenerator
      );
      return shoppingCartUseCases.generateSummary(params.shoppingCartId);
    });
  }
}
