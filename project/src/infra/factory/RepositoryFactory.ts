import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import { DiscountCodeRepository } from "../../domain/repository/DiscountCodeRepository";
import { OrdersRepository } from "../../domain/repository/OrdersRepository";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../../domain/repository/ShoppingCartRepository";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import Connection from "../database/Connection";
import { DBDiscountCodeRepository } from "../repository/DBDiscountCodeRepository";
import DBOrdersRepository from "../repository/DBOrdersRepository";
import { DBProductRepository } from "../repository/DBProductRepository";
import DBStockEntryRepository from "../repository/DBStockEntryRepository";
import { NonPersistentShoppingCartRepository } from "../repository/NonPersistentShoppingCartRepository";

export default class DBRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: Connection) {}
  createStockEntryRepository(): StockEntryRepository {
    return new DBStockEntryRepository(this.connection);
  }

  createProductRepository(): ProductRepository {
    return new DBProductRepository(this.connection);
  }

  createOrdersRepository(): OrdersRepository {
    return new DBOrdersRepository(this.connection);
  }

  createDiscountCodeRepository(): DiscountCodeRepository {
    return new DBDiscountCodeRepository(this.connection);
  }

  createShoppingCartRepository(): ShoppingCartRepository {
    return new NonPersistentShoppingCartRepository();
  }
}
