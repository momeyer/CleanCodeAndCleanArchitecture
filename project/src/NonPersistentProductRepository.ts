import { Product } from "./domain/Product";
import { ProductQuantity, ProductRepository } from "./domain/ProductRepository";

export class NonPersistentProductRepository implements ProductRepository {

    private inventory: Map<number, ProductQuantity>;

    constructor() {
        this.inventory = new Map<number, ProductQuantity>();
    }

    async add(product: Product, quantity: number): Promise<boolean> {
        const productInInventory = await this.find(product.id);
        const quantityToAdd = productInInventory ? productInInventory.quantity + quantity : quantity;

        this.inventory.set(product.id, { product: product, quantity: quantityToAdd });
        return true;
    };

    async find(productId: number): Promise<ProductQuantity | undefined> {
        return this.inventory.get(productId);
    };

    async isValidProductId(productId: number): Promise<boolean> {
        if (productId <= 0) { return false; }
        return this.inventory.has(productId);
    };

    async remove(productId: number, quantityToGet: number): Promise<boolean> {
        const productInInventory = await this.find(productId);
        if (!productInInventory || productInInventory.quantity < quantityToGet) { return false; }

        const updatedQuantity = productInInventory.quantity - quantityToGet;
        this.inventory.set(productId, { ...productInInventory, quantity: updatedQuantity });
        return true;
    };

    async list(): Promise<ProductQuantity[]> {
        let productsList: ProductQuantity[] = [];

        this.inventory.forEach(product => {
            productsList.push(product);
        });

        return productsList;

    }
}