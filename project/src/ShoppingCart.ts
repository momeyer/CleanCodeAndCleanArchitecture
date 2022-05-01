import { Order, OrderItem } from "./Order";
import { Id } from "./Product";
import { ProductInventory } from "./ProductInventory";

export default class ShoppingCart {

    private orderItems: Map<Id, OrderItem>;
    private productInventory: ProductInventory;

    constructor(productInventory: ProductInventory) {
        this.productInventory = productInventory;
        this.orderItems = new Map<Id, OrderItem>();
    }

    addProduct(productId: Id, quantity: number): boolean {
        const productInInventory = this.productInventory.findProduct(productId);
        if (!productInInventory || productInInventory.quantity == 0 || quantity <= 0) {
            return false;
        }

        let product = this.orderItems.get(productId);
        if (!product) {
            this.orderItems.set(productId, { ...productInInventory, quantity: quantity });
            return true;
        }
        product.quantity += quantity;
        return true;
    }

    removeProduct(productId: Id): boolean {
        return this.orderItems.delete(productId);
    }

    createOrder(discountCode?: string): Order | undefined {
        if (!this.orderItems.size) { return undefined; }
        let productsList: OrderItem[] = [];
        this.orderItems.forEach((cur): void => {
            this.productInventory.getProduct(cur.product.id, cur.quantity);
            productsList.push(cur);
        })
        return new Order(productsList!, discountCode);
    }

    getProductQuantity(productId: Id): number {
        const product = this.orderItems.get(productId);
        if (!product) {
            return 0;
        }
        return product!.quantity;
    }
}