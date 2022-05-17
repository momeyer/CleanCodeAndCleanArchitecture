import ShoppingCart from "./entity/ShoppingCart";
import { ShoppingCartId } from "./entity/ShoppingCartIdGenerator";

export interface ShoppingCartRepository {
    add(shoppingCart: ShoppingCart): Promise<void>;
    remove(shoppingCartId: ShoppingCartId): Promise<void>;
    has(shoppingCartId: ShoppingCartId): Promise<boolean>;
    get(shoppingCartId: ShoppingCartId): Promise<ShoppingCart | undefined>;
}
