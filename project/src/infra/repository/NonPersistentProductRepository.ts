import { Product } from "../../domain/entity/Product";
import { ProductRepository } from "../../domain/repository/ProductRepository";

export class NonPersistentProductRepository implements ProductRepository {
  private inventory: Map<number, Product>;

  constructor() {
    this.inventory = new Map<number, Product>();
  }
  connect(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async add(product: Product): Promise<boolean> {
    const productInInventory = await this.find(product.id);

    this.inventory.set(product.id, product);
    return true;
  }

  async find(productId: number): Promise<Product | undefined> {
    return this.inventory.get(productId);
  }

  async isValidProduct(productId: number): Promise<boolean> {
    if (productId <= 0) {
      return false;
    }
    return this.inventory.has(productId);
  }

  async remove(productId: number): Promise<boolean> {
    this.inventory.delete(productId);
    return true;
  }

  async updateQuantityBy(productId: number, amount: number): Promise<boolean> {
    return true;
  }

  async list(): Promise<Product[]> {
    let productsList: Product[] = [];

    this.inventory.forEach((product) => {
      productsList.push(product);
    });

    return productsList;
  }

  async nextId(): Promise<number> {
    return this.inventory.size + 1;
  }

  async clear(): Promise<void> {
    this.inventory.clear();
  }
}
