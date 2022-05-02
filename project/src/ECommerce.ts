import { Order, OrderStatus } from "./Order";
import { OrderId, PlacedOrders } from "./Orders";
import { ProductId } from "./Product";
import { ProductInventory } from "./ProductInventory";
import ShoppingCart from "./ShoppingCart";

export default class ECommerce {
    placedOrders: PlacedOrders;
    shoppingCart: ShoppingCart;
    productInventory: ProductInventory;
    discountCodes: Map<string, number>

    constructor(placedOrders: PlacedOrders, productInventory: ProductInventory) {
        this.placedOrders = placedOrders;
        this.shoppingCart = new ShoppingCart(productInventory);
        this.productInventory = productInventory;
        this.discountCodes = new Map<string, number>();

        this.discountCodes.set("Get20", 0.20);
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

    createOrderFromShoppingCart(cpf: string): Order | undefined {
        if (this.shoppingCart.isEmpty()) {
            return undefined;
        }

        const orderItems = this.shoppingCart.getAllItems();
        orderItems.forEach((cur): void => {
            this.productInventory.removeProduct(cur.product.id, cur.quantity);
            this.shoppingCart.removeProduct(cur.product.id);
        })

        const order = new Order(cpf, this.placedOrders.generateNextOrderId(), orderItems, this.shoppingCart.discount);
        this.placedOrders.add(order);
        return order;
    }

    applyDiscountCodeToShoppingCart(code: string): boolean {
        const validDiscount = this.discountCodes.get(code);
        if (!validDiscount) { return false; }
        this.shoppingCart.applyDiscountCode(validDiscount);
        return true;
    }

    getProductQuantityFromShoppingCart(productId: ProductId): number {
        return this.shoppingCart.getProductQuantity(productId);
    }

    getAllPalcedOrders(): Map<OrderId, Order> {
        return this.placedOrders.getAllPlacedOrder();
    }
}