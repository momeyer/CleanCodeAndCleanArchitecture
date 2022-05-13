import { Product, ProductId } from "./domain/Product";
import { ProductQuantity, ProductRepository } from "./domain/ProductRepository";

export class NonPersistentProductRepository implements ProductRepository {

    private inventory: Map<ProductId, ProductQuantity>;

    constructor() {
        this.inventory = new Map<ProductId, ProductQuantity>();
    }

    add(product: Product, quantity: number): boolean {
        const productInInventory = this.find(product.id);
        const quantityToAdd = productInInventory ? productInInventory.quantity + quantity : quantity;

        this.inventory.set(product.id, { product: product, quantity: quantityToAdd });
        return true;
    };

    find(productId: ProductId): ProductQuantity | undefined {
        return this.inventory.get(productId);
    };

    isValidProductId(productId: ProductId): boolean {
        if (productId.value <= 0) { return false; }
        return this.inventory.has(productId);
    };

    remove(productId: ProductId, quantityToGet: number): boolean {
        const productInInventory = this.find(productId);
        if (!productInInventory || productInInventory.quantity < quantityToGet) { return false; }

        const updatedQuantity = productInInventory.quantity - quantityToGet;
        this.inventory.set(productId, { ...productInInventory, quantity: updatedQuantity });
        return true;
    };

    list(): ProductQuantity[] {
        let productsList: ProductQuantity[] = [];

        this.inventory.forEach(product => productsList.push(product));

        return productsList;

    }
}