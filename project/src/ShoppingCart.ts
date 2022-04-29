import { Order } from "./Order";
import { ProductInventory, ProductQuantity } from "./ProductInventory";

export default class ShoppingCart {

    private productsAndQuantities: ProductQuantity[];
    private productInventory: ProductInventory;

    constructor(productInventory: ProductInventory) {
        this.productsAndQuantities = [];
        this.productInventory = productInventory;
    }

    addProduct(productId: number, quantity: number): boolean {
        const productInInventory = this.productInventory.findProduct(productId);
        if (!productInInventory || productInInventory.quantity == 0 || quantity <= 0) {
            return false;
        }

        let product = this.productsAndQuantities.find(e => e.product.id === productId);
        if (product == undefined) {
            this.productsAndQuantities.push({ ...productInInventory, quantity: quantity });
            return true;
        }
        product.quantity += quantity;
        return true;
    }

    removeProduct(productId: number): boolean {
        let product = this.productsAndQuantities.find(e => e.product.id === productId);
        if (!product) { return false; }
        this.productsAndQuantities.splice(this.productsAndQuantities.indexOf(product), 1);
        return true;

    }

    createOrder(discountCode?: string): Order | undefined {
        if (!this.productsAndQuantities.length) { return undefined; }
        this.productsAndQuantities.forEach((cur): void => {
            this.productInventory.getProduct(cur.product.id, cur.quantity);
        })
        return new Order(this.productsAndQuantities, discountCode);
    }
}