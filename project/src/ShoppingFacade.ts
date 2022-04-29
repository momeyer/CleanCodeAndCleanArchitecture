import ECommerce from "./ECommerce";
import { Order } from "./Order";

export default class ShoppingFacade {
    eCommerce: ECommerce;
    constructor(eCommerce: ECommerce) {
        this.eCommerce = eCommerce;
    }

    addProductToShoppingCart(productId: number, quantity: number): boolean {
        return this.eCommerce.addProductToShoppingCart(productId, quantity);
    };
    removeProductToShoppingCart(productId: number): boolean {
        return this.eCommerce.removeProductToShoppingCart(productId);
    };
    updateProductQuantityFromShoppingCart(productId: number, quantity: number): void { };

    createOrderFromShoppingCart(): Order | undefined { // should receive CPF
        return this.eCommerce.createOrderFromShoppingCart();
    };

    cancelPlacedOrder(orderId: number): boolean {
        return this.eCommerce.cancelPlacedOrder(orderId);
    };

    applyDiscountCodeToOrder(code: string): void { };
}