import ShoppingCart from "../entity/ShoppingCart";


export interface ShoppingCartRepository {
    add(shoppingCart: ShoppingCart): Promise<void>;
    remove(shoppingCartId: string): Promise<void>;
    has(shoppingCartId: string): Promise<boolean>;
    get(shoppingCartId: string): Promise<ShoppingCart | undefined>;
    clear(): Promise<void>;
}
