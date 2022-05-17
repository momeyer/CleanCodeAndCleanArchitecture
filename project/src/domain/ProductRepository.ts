import { Product } from "./entity/Product";

//TODO I think makes more sense ProductAndQuantity
export type ProductQuantity = {
    product: Product;
    quantity: number;
};

export interface ProductRepository {
    add(product: Product, quantity: number): Promise<boolean>;
    find(productId: number): Promise<ProductQuantity | undefined>;
    isValidProductId(productId: number): Promise<boolean>; //TODO rename to isValidProduct 
    remove(productId: number, quantity: number): Promise<boolean>;
    list(): Promise<ProductQuantity[]>;
    nextId(): Promise<number>;
}
