import { Order } from "./domain/Order";
import { OrderId } from "./domain/OrdersRepository";
import { ProductId } from "./domain/Product";
import ECommerce from "./ECommerce";

export default class ShoppingFacade {
    eCommerce: ECommerce;
    constructor(eCommerce: ECommerce) {
        this.eCommerce = eCommerce;
    }

    addProductToShoppingCart(productId: ProductId, quantity: number): boolean {
        return this.eCommerce.addProductToShoppingCart(productId, quantity);
    };
    removeProductToShoppingCart(productId: ProductId): boolean {
        return this.eCommerce.removeProductToShoppingCart(productId);
    };

    updateProductQuantityFromShoppingCart(productId: ProductId, quantity: number): void { };

    createOrderFromShoppingCart(cpf: string): Order | undefined {
        return this.eCommerce.createOrderFromShoppingCart(cpf);
    };

    cancelPlacedOrder(orderId: OrderId): boolean {
        return this.eCommerce.cancelPlacedOrder(orderId);
    };

    getProductQuantityFromShoppingCart(productId: ProductId): number {
        return this.eCommerce.getProductQuantityFromShoppingCart(productId);
    }

    applyDiscountCodeToShoppingCart(code: string, curTime: Date): boolean {
        return this.eCommerce.applyDiscountCodeToShoppingCart(code, curTime);
    };

    // simulate shipping costs
    // get order sumary
}