import ECommerce from "./ECommerce";
import { Order } from "./Order";
import { OrderId } from "./Orders";
import { ProductId } from "./Product";

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

    createOrderFromShoppingCart(): Order | undefined { // should receive CPF
        return this.eCommerce.createOrderFromShoppingCart();
    };

    cancelPlacedOrder(orderId: OrderId): boolean {
        return this.eCommerce.cancelPlacedOrder(orderId);
    };

    getProductQuantityFromShoppingCart(productId: ProductId): number {
        return this.eCommerce.getProductQuantityFromShoppingCart(productId);
    }
    applyDiscountCodeToOrder(code: string): void { };
}