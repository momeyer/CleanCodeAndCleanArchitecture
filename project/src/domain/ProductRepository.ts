import { Product } from "./Product";

export type ProductQuantity = {
    product: Product;
    quantity: number;
};

export interface ProductRepository {
    add(product: Product, quantity: number): Promise<boolean>;
    find(productId: number): Promise<ProductQuantity | undefined>;
    isValidProductId(productId: number): Promise<boolean>;
    remove(productId: number, quantity: number): Promise<boolean>;
    list(): Promise<ProductQuantity[]>;
}
