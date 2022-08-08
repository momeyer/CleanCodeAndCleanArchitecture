import { PhysicalAttributes } from "../../domain/entity/PhysicalAttributes";
import { Product } from "../../domain/entity/Product";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import Connection from "../database/Connection";

export class DBProductRepository implements ProductRepository {
  constructor(readonly connection: Connection) {}
  async connect(): Promise<void> {
    await this.connection.connect();
  }

  private async registerProduct(product: Product): Promise<void> {
    const values = `${product.id}, '${product.description}', ${product.physicalAttributes.height_cm}, ${product.physicalAttributes.width_cm}, ${product.physicalAttributes.depth_cm}, ${product.physicalAttributes.weight_kg}, ${product.price}`;

    await this.connection.query(
      `insert into product (id, description, height, width, depth, weight, price) values (${values});`
    );
  }

  async add(product: Product): Promise<boolean> {
    const isValidProduct = await this.isValidProduct(product.id);
    if (!isValidProduct) {
      await this.registerProduct(product);
    }
    return true;
  }

  async find(productId: number): Promise<Product | undefined> {
    const [item] = await this.connection.query(`select * from product where id = ${productId};`);
    if (!item) {
      return undefined;
    }
    let output = new Product(
      item.id,
      item.description,
      new PhysicalAttributes(item.height, item.width, item.depth, item.weight),
      item.price
    );

    return output;
  }

  async isValidProduct(productId: number): Promise<boolean> {
    const [productExist] = await this.connection.query(`select * from product where id = "${productId}";`);
    if (!productExist) {
      return false;
    } else {
      return true;
    }
  }

  async remove(productId: number): Promise<boolean> {
    await this.connection.query(`delete * from product where id = ${productId};`);
    return true;
  }

  async updateQuantityBy(productId: number, amount: number): Promise<boolean> {
    const [productInStock] = await this.connection.query(`select quantity from stock where productID = ${productId}`);

    if (productInStock) {
      const quantityToAdd: number = productInStock.quantity + amount;
      await this.connection.query(`UPDATE stock SET quantity = '${quantityToAdd}' WHERE productID = ${productId}`);
      return true;
    }
    return false;
  }

  async list(): Promise<Product[]> {
    const products: Array<any> = await this.connection.query("select * from stock_entries group by productId");

    let list: Product[] = [];
    try {
      for (let product of products) {
        const [item] = await this.connection.query(`select * from product where id = ${product.productId};`);
        list.push(
          new Product(
            item.id,
            item.description,
            new PhysicalAttributes(item.height, item.width, item.depth, item.weight),
            item.price
          )
        );
      }
    } catch (error) {}
    return list;
  }

  async nextId(): Promise<number> {
    const [nextId] = await this.connection.query(`select count(*) as num_items from product`);
    return nextId.num_items + 1;
  }

  async clear(): Promise<void> {
    await this.connection.query(`delete from stock_entries`);
    await this.connection.query(`delete from product`);
  }
}
