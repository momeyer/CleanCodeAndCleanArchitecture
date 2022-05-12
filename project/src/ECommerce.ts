import { DiscountCodeRepository } from "./DiscountCodeRepository";
import { DiscountCode } from "./domain/DiscountCode";
import { Order, OrderStatus } from "./domain/Order";
import { OrderId, OrdersRepository } from "./OrdersRepository";
import { ProductId } from "./domain/Product";
import { ProductInventory } from "./ProductInventory";
import ShoppingCart from "./domain/ShoppingCart";

export default class ECommerce {
    placedOrders: OrdersRepository;
    shoppingCart: ShoppingCart;
    productInventory: ProductInventory;
    discountCodes: DiscountCodeRepository;

    constructor(placedOrders: OrdersRepository, productInventory: ProductInventory) {
        this.placedOrders = placedOrders;
        this.shoppingCart = new ShoppingCart(productInventory);
        this.productInventory = productInventory;
        this.discountCodes = new DiscountCodeRepository();
    }

    cancelPlacedOrder(orderID: OrderId): boolean {
        return this.placedOrders.updateStatus(orderID, OrderStatus.CANCELLED);
    };

    addProductToShoppingCart(productId: ProductId, quantity: number): boolean {
        return this.shoppingCart.addProduct(productId, quantity);
    }

    removeProductToShoppingCart(productId: ProductId): boolean {
        return this.shoppingCart.removeItem(productId);
    }

    createOrderFromShoppingCart(cpf: string): Order | undefined {
        if (this.shoppingCart.isEmpty()) {
            return undefined;
        }

        const orderItems = this.shoppingCart.getAllItems();
        orderItems.forEach((cur): void => {
            this.productInventory.removeProduct(cur.product.id, cur.quantity);
        })

        this.shoppingCart.clear();

        const order = new Order(cpf, this.placedOrders.generateNextOrderId(), orderItems, this.shoppingCart.discount);
        this.placedOrders.add(order);
        return order;
    }
    addDiscountCode(discountCode: DiscountCode): void {
        this.discountCodes.addDiscountCode(discountCode);
    }

    applyDiscountCodeToShoppingCart(code: string, curTime: Date): boolean {
        const validDiscount = this.discountCodes.getDiscount(code, curTime);
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