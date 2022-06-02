import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import { DiscountCodeRepository } from "../../domain/repository/DiscountCodeRepository";
import { OrdersRepository } from "../../domain/repository/OrdersRepository";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../../domain/repository/ShoppingCartRepository";

export default class NonPersistentRepositoryFactory implements RepositoryFactory {
    createItemRepository(): ProductRepository {
        throw new Error("Method not implemented.");
    }
    createOrdersRepository(): OrdersRepository {
        throw new Error("Method not implemented.");
    }
    createDiscountCodeRepository(): DiscountCodeRepository {
        throw new Error("Method not implemented.");
    }
    createShoppingCartRepository(): ShoppingCartRepository {
        throw new Error("Method not implemented.");
    }
}