import { Order } from "./Order";
import { Id } from "./Product";
import { ProductInventory, ProductQuantity } from "./ProductInventory";

export default class ShoppingCart {

    private productsAndQuantities: Map<Id, ProductQuantity>;
    private productInventory: ProductInventory;

    constructor(productInventory: ProductInventory) {
        this.productInventory = productInventory;
        this.productsAndQuantities = new Map<Id, ProductQuantity>();
    }

    addProduct(productId: Id, quantity: number): boolean {
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

    removeProduct(productId: Id): boolean {
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

    getProductQuantity(productId: Id): number {
        const product = this.productsAndQuantities.get(productId);
        if (!product) {
            return 0;
        }
        return product!.quantity;
    }
}