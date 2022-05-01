import { Order, OrderStatus } from "./Order";
import { OrderId, PlacedOrders } from "./Orders";
import { ProductId } from "./Product";
import { ProductInventory } from "./ProductInventory";
import ShoppingCart from "./ShoppingCart";

export default class ECommerce {
    placedOrders: PlacedOrders;
    shoppingCart: ShoppingCart;
    productInventory: ProductInventory;

    constructor(placedOrders: PlacedOrders, productInventory: ProductInventory) {
        this.placedOrders = placedOrders;
        this.shoppingCart = new ShoppingCart(productInventory);
        this.productInventory = productInventory;
    }

    cancelPlacedOrder(orderID: OrderId): boolean {
        return this.placedOrders.updateStatus(orderID, OrderStatus.CANCELLED);
    };

    addProductToShoppingCart(productId: ProductId, quantity: number): boolean {
        return this.shoppingCart.addProduct(productId, quantity);
    }

    removeProductToShoppingCart(productId: ProductId): boolean {
        return this.shoppingCart.removeProduct(productId);
    }

    createOrderFromShoppingCart(discountCode?: string): Order | undefined {
        const orderItems = this.shoppingCart.getAllItems();

        if (!orderItems.length) { return undefined; }
        orderItems.forEach((cur): void => {
            this.productInventory.getProduct(cur.product.id, cur.quantity);
        })

        const order = new Order(this.placedOrders.generateNextOrderId(), orderItems, discountCode);
        this.placedOrders.add(order);
        return order;
    }

    getProductQuantityFromShoppingCart(productId: ProductId): number {
        return this.shoppingCart.getProductQuantity(productId);
    }

    getAllPalcedOrders(): Map<OrderId, Order> {
        return this.placedOrders.getAllPlacedOrder();
    }
}