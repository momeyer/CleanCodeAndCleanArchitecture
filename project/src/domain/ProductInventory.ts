import { Product, ProductId } from "./Product";

export type ProductQuantity = {
    product: Product;
    quantity: number;
};

export interface ProductInventory {
    addProduct(product: Product, quantity: number): boolean;
    findProduct(productId: ProductId): ProductQuantity | undefined;
    isValidProductId(productId: ProductId): boolean;
    removeProduct(productId: ProductId, quantity: number): boolean;
}
