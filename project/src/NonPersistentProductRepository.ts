import { Product } from "./domain/entity/Product";
import { ProductAndQuantity, ProductRepository } from "./domain/repository/ProductRepository";

export class NonPersistentProductRepository implements ProductRepository {

    private inventory: Map<number, ProductAndQuantity>;

    constructor() {
        this.inventory = new Map<number, ProductAndQuantity>();
    }

    async add(product: Product, quantity: number): Promise<boolean> {
        const productInInventory = await this.find(product.id);
        const quantityToAdd = productInInventory ? productInInventory.quantity + quantity : quantity;

        this.inventory.set(product.id, { product: product, quantity: quantityToAdd });
        return true;
    };

    async find(productId: number): Promise<ProductAndQuantity | undefined> {
        return this.inventory.get(productId);
    };

    async isValidProduct(productId: number): Promise<boolean> {
        if (productId <= 0) { return false; }
        return this.inventory.has(productId);
    };

    async remove(productId: number, quantity: number): Promise<boolean> {
        const productInInventory = await this.find(productId);
        if (!productInInventory || productInInventory.quantity < quantity) { return false; }

        const updatedQuantity = productInInventory.quantity - quantity;
        this.inventory.set(productId, { ...productInInventory, quantity: updatedQuantity });
        return true;
    };

    async list(): Promise<ProductAndQuantity[]> {
        let productsList: ProductAndQuantity[] = [];

        this.inventory.forEach(product => {
            productsList.push(product);
        });

        return productsList;

    }

    async nextId(): Promise<number> {
        return this.inventory.size + 1;
    }
}