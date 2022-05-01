import { Id, Product } from "./Product";

export class ProductQuantity {

    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}
export interface ProductInventory {
    addProduct(product: Product, quantity: number): boolean;
    findProduct(productId: Id): ProductQuantity | undefined;
    isValidProductId(productId: Id): boolean;
    getProduct(productId: Id, quantity: number): ProductQuantity | undefined;
}

export class NonPersistentProductInventory implements ProductInventory {

    private inventory: Map<Id, ProductQuantity>;

    constructor() {
        this.inventory = new Map<Id, ProductQuantity>();
    }

    addProduct(product: Product, quantity: number): boolean {
        const productInInventory = this.findProduct(product.id);
        const quantityToAdd = productInInventory ? productInInventory.quantity + quantity : quantity;

        this.inventory.set(product.id, new ProductQuantity(product, quantityToAdd));
        return true;
    };

    findProduct(productId: Id): ProductQuantity | undefined {
        return this.inventory.get(productId);
    };

    isValidProductId(productId: Id): boolean {
        if (productId.value <= 0) { return false; }
        return this.inventory.has(productId);
    };

    getProduct(productId: Id, quantityToGet: number): ProductQuantity | undefined {
        const productInInventory = this.findProduct(productId);
        if (!productInInventory || productInInventory.quantity < quantityToGet) { return undefined; }

        const updatedQuantity = productInInventory.quantity - quantityToGet;
        this.inventory.set(productId, { ...productInInventory, quantity: updatedQuantity });
        return { ...productInInventory, quantity: quantityToGet };
    };
}