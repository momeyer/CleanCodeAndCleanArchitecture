import { Order, OrderStatus } from "./Order";
import PlacedOrders from "./Orders";
import { ProductInventory } from "./ProductInventory";
import ShoppingCart from "./ShoppingCart";

export default class ECommerce {
    placedOrders: PlacedOrders;
    shoppingCart: ShoppingCart;

    constructor(placedOrders: PlacedOrders, productInventory: ProductInventory) {
        this.placedOrders = placedOrders;
        this.shoppingCart = new ShoppingCart(productInventory);
    }

    cancelPlacedOrder(orderID: number): boolean {
        return this.placedOrders.updateStatus(orderID, OrderStatus.CANCELLED);
    };

    addProductToShoppingCart(productId: number, quantity: number): boolean {
        return this.shoppingCart.addProduct(productId, quantity);
    }

    removeProductToShoppingCart(productId: number): boolean {
        return this.shoppingCart.removeProduct(productId);
    }

    createOrderFromShoppingCart(discountCode?: string): Order | undefined {
        return this.shoppingCart.createOrder(discountCode);
    }
    getProductQuantityFromShoppingCart(productId: number): number {
        return this.shoppingCart.getProductQuantity(productId);
    }
}