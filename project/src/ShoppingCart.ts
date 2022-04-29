import { Order } from "./Order";
import { ProductInventory, ProductQuantity } from "./ProductInventory";

export default class ShoppingCart {

    private productsAndQuantities: Map<number, ProductQuantity>;
    private productInventory: ProductInventory;

    constructor(productInventory: ProductInventory) {
        this.productInventory = productInventory;
        this.productsAndQuantities = new Map<number, ProductQuantity>();
    }

    addProduct(productId: number, quantity: number): boolean {
        const productInInventory = this.productInventory.findProduct(productId);
        if (!productInInventory || productInInventory.quantity == 0 || quantity <= 0) {
            return false;
        }

        let product = this.productsAndQuantities.get(productId);
        if (!product) {
            this.productsAndQuantities.set(productId, { ...productInInventory, quantity: quantity });
            return true;
        }
        product.quantity += quantity;
        return true;
    }

    removeProduct(productId: number): boolean {
        return this.productsAndQuantities.delete(productId);
    }

    createOrder(discountCode?: string): Order | undefined {
        if (!this.productsAndQuantities.size) { return undefined; }
        let productsList: ProductQuantity[] = [];
        this.productsAndQuantities.forEach((cur): void => {
            this.productInventory.getProduct(cur.product.id, cur.quantity);
            productsList.push(cur);
        })
        return new Order(productsList!, discountCode);
    }

    getProductQuantity(productId: number): number {
        const product = this.productsAndQuantities.get(productId);
        if (!product) {
            return 0;
        }
        return product!.quantity;
    }
}