import { Product } from "../../domain/entity/Product";
import { ProductAndQuantity, ProductRepository } from "../../domain/repository/ProductRepository";
import Connection from "../database/Connection";

export default class ProductRepositoryDatabase implements ProductRepository {
    constructor(readonly connection: Connection) {
    }

    nextId(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async add(product: Product, quantity: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async find(productId: number): Promise<ProductAndQuantity | undefined> {
        throw new Error("Method not implemented.");
    }
    async isValidProduct(productId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async remove(productId: number, quantity: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async updateQuantityBy(productId: number, amount: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async list(): Promise<ProductAndQuantity[]> {
        // const productsData = await this.connection.query("select * from project", []);
        // const products: ProductAndQuantity[] = [];
        // for (const itemData of itemsData) {
        //     items.push({new Product() , parseFloat(itemData.price)});
        // }
        return [] as ProductAndQuantity[];
    }
}