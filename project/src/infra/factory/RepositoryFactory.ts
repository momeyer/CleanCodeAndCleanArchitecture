import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import { DiscountCodeRepository } from "../../domain/repository/DiscountCodeRepository";
import { OrdersRepository } from "../../domain/repository/OrdersRepository";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../../domain/repository/ShoppingCartRepository";
import { NonPersistenDiscountCodeRepository } from "../../NonPersistentDiscountCodeRepository";
import { NonPersistentOrdersRepository } from "../../NonPersistentOrdersRepository";
import { NonPersistentShoppingCartRepository } from "../../NonPersistentShoppingCartRepository";
import Connection from "../database/Connection";
import { DBProductRepository } from "../repository/DBProductRepository";

export default class NonPersistentRepositoryFactory implements RepositoryFactory {
    constructor(readonly connection: Connection) { }

    createProductRepository(): ProductRepository {
        return new DBProductRepository(this.connection);
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
}