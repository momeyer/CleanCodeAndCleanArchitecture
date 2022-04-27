import ECommerce from "./ECommerce";

export default class ShoppingFacade {
    eCommerce: ECommerce;
    constructor(eCommerce: ECommerce) {
        this.eCommerce = eCommerce;
    }

    addProductToShoppingCart(productId: number): void { };
    removeProductToShoppingCart(productId: number): void { };
    updateProductQuantityFromShoppingCart(productId: number, quantity: number): void { };

    createOrderFromShoppingCart(): void { };
    cancelPlacedOrder(orderID: number): boolean {
        return this.eCommerce.cancelPlacedOrder(orderID);
    };
    applyDiscountCodeToOrder(code: string): void { };

}