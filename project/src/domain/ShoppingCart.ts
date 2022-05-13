import { OrderItem } from "./Order";
import { ProductId } from "./Product";
import { ProductRepository } from "./ProductRepository";

export default class ShoppingCart {

    private orderItems: Map<ProductId, OrderItem>;
    private productInventory: ProductRepository;
    discount?: number;

    constructor(productInventory: ProductRepository) {
        this.productInventory = productInventory;
        this.orderItems = new Map<ProductId, OrderItem>();
    }

    addItem(productId: ProductId, quantity: number): boolean {
        const productInInventory = this.productInventory.find(productId);
        if (!productInInventory || productInInventory.quantity == 0 || quantity <= 0) {
            return false;
        }

        const product = this.orderItems.get(productId);
        if (!product) {
            const orderItem: OrderItem = {
                productId: productInInventory.product.id,
                productDetails: productInInventory.product.dimensionsAndWeight,
                quantity: quantity,
                price: productInInventory.product.price
            }
            this.orderItems.set(productId, orderItem);
            return true;
        }
        product.quantity += quantity;
        return true;
    }

    removeItem(productId: ProductId): boolean {
        return this.orderItems.delete(productId);
    }

    getAllItems(): OrderItem[] {
        let listOfItems: OrderItem[] = [];
        this.orderItems.forEach((cur): number =>
            listOfItems.push(cur));
        return listOfItems;
    }

    clear(): void {
        this.orderItems.clear();
    }

    getItemQuantity(productId: ProductId): number {
        const product = this.orderItems.get(productId);
        if (!product) {
            return 0;
        }
        return product!.quantity;
    }

    isEmpty(): boolean {
        return this.orderItems.size == 0;
    }

    applyDiscountCode(discount: number): void {
        this.discount = discount;
    }
}