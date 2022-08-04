import { DiscountCodeRepository } from "../repository/DiscountCodeRepository";
import { OrdersRepository } from "../repository/OrdersRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { ShoppingCartRepository } from "../repository/ShoppingCartRepository";
import StockEntryRepository from "../repository/StockEntryRepository";

export default interface RepositoryFactory {
  createProductRepository(): ProductRepository;
  createOrdersRepository(): OrdersRepository;
  createDiscountCodeRepository(): DiscountCodeRepository;
  createShoppingCartRepository(): ShoppingCartRepository;
  createStockEntryRepository(): StockEntryRepository;
}
