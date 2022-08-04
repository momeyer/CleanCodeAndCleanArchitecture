import { Product } from "../entity/Product";

export interface ProductRepository {
  add(product: Product): Promise<boolean>;
  find(productId: number): Promise<Product | undefined>;
  isValidProduct(productId: number): Promise<boolean>;
  remove(productId: number): Promise<boolean>;
  updateQuantityBy(productId: number, amount: number): Promise<boolean>;
  list(): Promise<Product[]>;
  nextId(): Promise<number>;
  clear(): Promise<void>;
  connect(): Promise<void>;
}
