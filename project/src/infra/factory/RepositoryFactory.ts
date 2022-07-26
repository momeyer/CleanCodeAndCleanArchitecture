import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import { DiscountCodeRepository } from "../../domain/repository/DiscountCodeRepository";
import { OrdersRepository } from "../../domain/repository/OrdersRepository";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../../domain/repository/ShoppingCartRepository";
import Connection from "../database/Connection";
import { DBDiscountCodeRepository } from "../repository/DBDiscountCodeRepository";
import DBOrdersRepository from "../repository/DBOrdersRepository";
import { DBProductRepository } from "../repository/DBProductRepository";
import { NonPersistentShoppingCartRepository } from "../repository/NonPersistentShoppingCartRepository";

export default class DBRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: Connection) {}

  createProductRepository(): ProductRepository {
    return new DBProductRepository(this.connection);
  }

  createOrdersRepository(): OrdersRepository {
    return new DBOrdersRepository(this.connection);
  }

  createDiscountCodeRepository(): DiscountCodeRepository {
    return new DBDiscountCodeRepository(this.connection);
  }

  // TODO replace with real DB repos
  createShoppingCartRepository(): ShoppingCartRepository {
    return new NonPersistentShoppingCartRepository();
  }
}
