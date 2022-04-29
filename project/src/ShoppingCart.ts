import { ProductInventory } from "./ProductInventory";

class ProductIdQuantity {

    quantity: number;

    constructor(readonly id: number, quantity: number) {
        this.quantity = quantity;
    }
}

export default class ShoppingCart {

    private products: ProductIdQuantity[];
    private productInventory: ProductInventory;

    constructor(productInventory: ProductInventory) {
        this.products = [];
        this.productInventory = productInventory;
    }

    addProduct(productId: number, quantity: number): boolean {
        if (!this.productInventory.isValidProductId(productId)) {
            return false;
        }
        let product = this.products.find(e => e.id === productId);
        if (product == undefined) {
            this.products.push(new ProductIdQuantity(productId, quantity));
            return true;
        }
        product.quantity = quantity;
        return true;
    }

    removeProduct(productId: number): boolean {
        return (productId >= 1 && productId <= 10);
    }

    // updateProduct()
}