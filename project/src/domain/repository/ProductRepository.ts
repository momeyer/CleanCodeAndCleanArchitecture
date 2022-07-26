import { Product } from "../entity/Product";

export type ProductAndQuantity = {
  product: Product;
  quantity: number;
};

export interface ProductRepository {
  add(product: Product, quantity: number): Promise<boolean>;
  find(productId: number): Promise<ProductAndQuantity | undefined>;
  isValidProduct(productId: number): Promise<boolean>;
  remove(productId: number, quantity: number): Promise<boolean>;
  updateQuantityBy(productId: number, amount: number): Promise<boolean>;
  list(): Promise<ProductAndQuantity[]>;
  nextId(): Promise<number>;
  clear(): Promise<void>;
  connect(): Promise<void>;
}
