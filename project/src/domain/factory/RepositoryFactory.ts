import { DiscountCodeRepository } from "../repository/DiscountCodeRepository";
import { OrdersRepository } from "../repository/OrdersRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { ShoppingCartRepository } from "../repository/ShoppingCartRepository";

export default interface RepositoryFactory {
  createProductRepository(): ProductRepository;
  createOrdersRepository(): OrdersRepository;
  createDiscountCodeRepository(): DiscountCodeRepository;
  createShoppingCartRepository(): ShoppingCartRepository;
}
