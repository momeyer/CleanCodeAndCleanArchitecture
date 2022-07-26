import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import { DiscountCodeRepository } from "../../domain/repository/DiscountCodeRepository";
import { OrdersRepository } from "../../domain/repository/OrdersRepository";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../../domain/repository/ShoppingCartRepository";
import { NonPersistenDiscountCodeRepository } from "../../NonPersistentDiscountCodeRepository";
import { NonPersistentOrdersRepository } from "../../NonPersistentOrdersRepository";
import { NonPersistentProductRepository } from "../../NonPersistentProductRepository";
import { NonPersistentShoppingCartRepository } from "../../NonPersistentShoppingCartRepository";

export default class NonPersistentRepositoryFactory implements RepositoryFactory {
  createProductRepository(): ProductRepository {
    return new NonPersistentProductRepository();
  }
  createOrdersRepository(): OrdersRepository {
    return new NonPersistentOrdersRepository();
  }
  createDiscountCodeRepository(): DiscountCodeRepository {
    return new NonPersistenDiscountCodeRepository();
  }
  createShoppingCartRepository(): ShoppingCartRepository {
    return new NonPersistentShoppingCartRepository();
  }
  async closeConnection(): Promise<void> {}
  async connect(): Promise<void> {}
}
