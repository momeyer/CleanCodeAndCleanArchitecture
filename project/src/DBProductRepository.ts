import { PhysicalAttributes } from "./domain/entity/PhysicalAttributes";
import { Product } from "./domain/entity/Product";
import { ProductAndQuantity, ProductRepository } from "./domain/repository/ProductRepository";
import Connection from "./infra/database/Connection";

export class DBProductRepository implements ProductRepository {
    private inventory: Map<number, ProductAndQuantity>;

    constructor(readonly connection: Connection) {
        this.inventory = new Map<number, ProductAndQuantity>();
    }
    add(product: Product, quantity: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async find(productId: number): Promise<ProductAndQuantity | undefined> {
        await this.connection.connect();
        const [product] = await this.connection.query(`select * from stock where productID = ${productId}`);
        const [item] = await this.connection.query(`select * from product where id = ${product.productID}`);
        let output = {
            product: new Product(item.id, item.description, new PhysicalAttributes(item.height, item.width, item.depth, item.weight), item.price),
            quantity: product.quantity
        }

        await this.connection.close();
        return output;

    }
    isValidProduct(productId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    remove(productId: number, quantity: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateQuantityBy(productId: number, amount: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async list(): Promise<ProductAndQuantity[]> {
        await this.connection.connect();
        const products = await this.connection.query("select * from stock");
        let list: ProductAndQuantity[] = [];
        products.forEach(
            async (product: any): Promise<void> => {
                const [item] = await this.connection.query(`select * from product where id = ${product.productID}`);
                list.push({
                    product: new Product(item.id, item.description, new PhysicalAttributes(item.height, item.width, item.depth, item.weight), item.price),
                    quantity: product.quantity
                });
            }
        )

        await this.connection.close();
        return list;

    }
    nextId(): Promise<number> {
        throw new Error("Method not implemented.");
    }

}