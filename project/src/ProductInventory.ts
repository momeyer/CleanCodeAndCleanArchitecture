import { Product, ProductId } from "./Product";

export type ProductQuantity = {
    product: Product;
    quantity: number;
}
export interface ProductInventory {
    addProduct(product: Product, quantity: number): boolean;
    findProduct(productId: ProductId): ProductQuantity | undefined;
    isValidProductId(productId: ProductId): boolean;
    getProduct(productId: ProductId, quantity: number): ProductQuantity | undefined;
}

export class NonPersistentProductInventory implements ProductInventory {

    private inventory: Map<ProductId, ProductQuantity>;

    constructor() {
        this.inventory = new Map<ProductId, ProductQuantity>();
    }

    addProduct(product: Product, quantity: number): boolean {
        const productInInventory = this.findProduct(product.id);
        const quantityToAdd = productInInventory ? productInInventory.quantity + quantity : quantity;

        this.inventory.set(product.id, { product: product, quantity: quantityToAdd });
        return true;
    };

    findProduct(productId: ProductId): ProductQuantity | undefined {
        return this.inventory.get(productId);
    };

    isValidProductId(productId: ProductId): boolean {
        if (productId.value <= 0) { return false; }
        return this.inventory.has(productId);
    };

    getProduct(productId: ProductId, quantityToGet: number): ProductQuantity | undefined {
        const productInInventory = this.findProduct(productId);
        if (!productInInventory || productInInventory.quantity < quantityToGet) { return undefined; }

        const updatedQuantity = productInInventory.quantity - quantityToGet;
        this.inventory.set(productId, { ...productInInventory, quantity: updatedQuantity });
        return { ...productInInventory, quantity: quantityToGet };
    };
}