import ShoppingCart from "./domain/entity/ShoppingCart";
import { ShoppingCartId } from "./domain/entity/ShoppingCartIdGenerator";
import { ShoppingCartRepository } from "./domain/ShoppingCartRepository";

export class NonPersistentShoppingCartRepository implements ShoppingCartRepository {
    activeCarts: Map<ShoppingCartId, ShoppingCart>;

    constructor() {
        this.activeCarts = new Map<ShoppingCartId, ShoppingCart>();
    }

    async add(shoppingCart: ShoppingCart): Promise<void> {
        this.activeCarts.set(shoppingCart.id, shoppingCart);
    }

    async remove(shoppingCartId: ShoppingCartId): Promise<void> {
        this.activeCarts.delete(shoppingCartId);
    }

    async has(shoppingCartId: ShoppingCartId): Promise<boolean> {
        return this.activeCarts.has(shoppingCartId);
    }

    async get(shoppingCartId: ShoppingCartId): Promise<ShoppingCart | undefined> {
        return this.activeCarts.get(shoppingCartId);
    }
}
