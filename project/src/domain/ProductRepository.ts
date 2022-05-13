import { Product, ProductId } from "./Product";

export type ProductQuantity = {
    product: Product;
    quantity: number;
};

export interface ProductRepository {
    add(product: Product, quantity: number): boolean;
    find(productId: ProductId): ProductQuantity | undefined;
    isValidProductId(productId: ProductId): boolean;
    remove(productId: ProductId, quantity: number): boolean;
    list(): ProductQuantity[];
}
