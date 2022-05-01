import { OrderItem } from "./Order";
import { ProductId } from "./Product";
import { ProductInventory } from "./ProductInventory";

export default class ShoppingCart {

    private orderItems: Map<ProductId, OrderItem>;
    private productInventory: ProductInventory;
    discount: number | undefined;

    constructor(productInventory: ProductInventory) {
        this.productInventory = productInventory;
        this.orderItems = new Map<ProductId, OrderItem>();
    }

    addProduct(productId: ProductId, quantity: number): boolean {
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

    removeProduct(productId: ProductId): boolean {
        return this.orderItems.delete(productId);
    }

    getAllItems(): OrderItem[] {
        let listOfItems: OrderItem[] = [];
        this.orderItems.forEach((cur): number =>
            listOfItems.push(cur));
        return listOfItems;
    }

    getProductQuantity(productId: ProductId): number {
        const product = this.orderItems.get(productId);
        if (!product) {
            return 0;
        }
        return product!.quantity;
    }

    isEmpty(): boolean {
        return !this.orderItems.size;
    }
    applyDiscountCode(code: number): void {
        this.discount = code;
    }
}