import ECommerce from "./ECommerce";

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

    createOrderFromShoppingCart(): void { };
    cancelPlacedOrder(orderId: number): boolean {
        return this.eCommerce.cancelPlacedOrder(orderId);
    };
    applyDiscountCodeToOrder(code: string): void { };
    // placeOrder(): boolean { };

}