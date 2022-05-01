import ECommerce from "./ECommerce";
import { Order } from "./Order";
import { Id } from "./Product";

export default class ShoppingFacade {
    eCommerce: ECommerce;
    constructor(eCommerce: ECommerce) {
        this.eCommerce = eCommerce;
    }

    addProductToShoppingCart(productId: Id, quantity: number): boolean {
        return this.eCommerce.addProductToShoppingCart(productId, quantity);
    };
    removeProductToShoppingCart(productId: Id): boolean {
        return this.eCommerce.removeProductToShoppingCart(productId);
    };
    updateProductQuantityFromShoppingCart(productId: Id, quantity: number): void { };

    createOrderFromShoppingCart(): Order | undefined { // should receive CPF
        return this.eCommerce.createOrderFromShoppingCart();
    };

    cancelPlacedOrder(orderId: number): boolean {
        return this.eCommerce.cancelPlacedOrder(orderId);
    };

    getProductQuantityFromShoppingCart(productId: Id): number {
        return this.eCommerce.getProductQuantityFromShoppingCart(productId);
    }
    applyDiscountCodeToOrder(code: string): void { };
}