import { ShoppingCartIdGenerator } from "../../domain/entity/ShoppingCartIdGenerator";
import { DiscountCodeRepository } from "../../domain/repository/DiscountCodeRepository";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../../domain/repository/ShoppingCartRepository";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import { ShoppingCartUseCases } from "../../useCases/ShoppingCartUseCases";
import Http from "../http/Http";

export default class ShoppingCartController {
  shoppingCartUseCases: ShoppingCartUseCases;

  constructor(
    readonly http: Http,
    readonly productRepository: ProductRepository,
    readonly stockRepository: StockEntryRepository,
    readonly discountRepository: DiscountCodeRepository,
    readonly shoppingCartRepository: ShoppingCartRepository,
    readonly shoppingCartIdGenerator: ShoppingCartIdGenerator
  ) {
    this.shoppingCartUseCases = new ShoppingCartUseCases(
      productRepository,
      stockRepository,
      discountRepository,
      shoppingCartRepository,
      shoppingCartIdGenerator
    );

    http.on("get", "/shoppingCart/:shoppingCartId", async function (params: any, body: any): Promise<any> {
      const shoppingCartUseCases = new ShoppingCartUseCases(
        productRepository,
        stockRepository,
        discountRepository,
        shoppingCartRepository,
        shoppingCartIdGenerator
      );
      try {
        return await shoppingCartUseCases.generateSummary(params.shoppingCartId);
      } catch (error: any) {
        return { errorType: "Not Found" };
      }
    });

    http.on("post", "/shoppingCart/:shoppingCartId", async function (params: any, body: any): Promise<any> {
      const shoppingCartUseCases = new ShoppingCartUseCases(
        productRepository,
        stockRepository,
        discountRepository,
        shoppingCartRepository,
        shoppingCartIdGenerator
      );
      await shoppingCartUseCases.addItem({
        shoppingCartId: params.shoppingCartId,
        productId: body.productId,
        quantity: body.quantity,
      });

      return await shoppingCartUseCases.generateSummary(params.shoppingCartId);
    });

    http.on("post", "/shoppingCart/:shoppingCartId/clear", async function (params: any, body: any): Promise<any> {
      const shoppingCartUseCases = new ShoppingCartUseCases(
        productRepository,
        stockRepository,
        discountRepository,
        shoppingCartRepository,
        shoppingCartIdGenerator
      );
      await shoppingCartUseCases.clear(params.shoppingCartId);
      return await shoppingCartUseCases.generateSummary(params.shoppingCartId);
    });

    http.on("post", "/shoppingCart/:shoppingCartId/discount", async function (params: any, body: any): Promise<any> {
      const shoppingCartUseCases = new ShoppingCartUseCases(
        productRepository,
        stockRepository,
        discountRepository,
        shoppingCartRepository,
        shoppingCartIdGenerator
      );
      const discountApplied = await shoppingCartUseCases.applyDiscountCode(params.shoppingCartId, body.discountCode);
      if (discountApplied) {
        return await shoppingCartUseCases.generateSummary(params.shoppingCartId);
      }
      return { ErrorType: `Failed to apply discount code ${body.discountCode}` };
    });

    http.on("post", "/shoppingCart/:shoppingCartId/remove", async function (params: any, body: any): Promise<any> {
      const shoppingCartUseCases = new ShoppingCartUseCases(
        productRepository,
        stockRepository,
        discountRepository,
        shoppingCartRepository,
        shoppingCartIdGenerator
      );

      const removeItem = await shoppingCartUseCases.removeItem(params.shoppingCartId, body.productId);
    });
  }
}
