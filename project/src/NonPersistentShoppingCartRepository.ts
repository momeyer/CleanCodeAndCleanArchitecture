import ShoppingCart from "./domain/entity/ShoppingCart";
import { ShoppingCartRepository } from "./domain/repository/ShoppingCartRepository";

export class NonPersistentShoppingCartRepository implements ShoppingCartRepository {
  activeCarts: Map<string, ShoppingCart>;

  constructor() {
    this.activeCarts = new Map<string, ShoppingCart>();
  }

  async add(shoppingCart: ShoppingCart): Promise<void> {
    this.activeCarts.set(shoppingCart.id, shoppingCart);
  }

  async remove(shoppingCartId: string): Promise<void> {
    this.activeCarts.delete(shoppingCartId);
  }

  async has(shoppingCartId: string): Promise<boolean> {
    return this.activeCarts.has(shoppingCartId);
  }

  async get(shoppingCartId: string): Promise<ShoppingCart | undefined> {
    return this.activeCarts.get(shoppingCartId);
  }

  async clear(): Promise<void> {
    this.activeCarts.clear();
  }
}
