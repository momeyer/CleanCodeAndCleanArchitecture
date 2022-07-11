import { PhysicalAttributes } from "../../domain/entity/PhysicalAttributes";
import { Product } from "../../domain/entity/Product";
import { ProductAndQuantity, ProductRepository } from "../../domain/repository/ProductRepository";
import Connection from "../database/Connection";

export class DBProductRepository implements ProductRepository {
  private inventory: Map<number, ProductAndQuantity>;

  constructor(readonly connection: Connection) {
    this.inventory = new Map<number, ProductAndQuantity>();
  }

  async add(product: Product, quantity: number): Promise<boolean> {
    await this.connection.connect();
    const [productExist] = await this.connection.query(
      `select * from product where description = "${product.description}";`
    );
    if (!productExist) {
      const values = `${product.id}, '${product.description}', ${product.physicalAttributes.height_cm}, ${product.physicalAttributes.width_cm}, ${product.physicalAttributes.depth_cm}, ${product.physicalAttributes.weight_kg}, ${product.price}`;
      await this.connection.query(
        `insert into product (id, description, height, width, depth, weight, price) values (${values});`
      );
    }
    const [productInStock] = await this.connection.query(`select quantity from stock where productID = ${product.id};`);
    if (productInStock) {
      const quantityToAdd: number = productInStock.quantity + quantity;
      await this.connection.query(`UPDATE stock SET quantity = '${quantityToAdd}' WHERE productID = ${product.id};`);
    } else {
      await this.connection.query(`insert into stock (productID, quantity) values (${product.id}, ${quantity});`);
    }
    await this.connection.close();
    return true;
  }

  async find(productId: number): Promise<ProductAndQuantity | undefined> {
    await this.connection.connect();
    const [product] = await this.connection.query(`select * from stock where productID = ${productId};`);
    if (!product) {
      return undefined;
    }
    const [item] = await this.connection.query(`select * from product where id = ${product.productID};`);
    if (!item) {
      return undefined;
    }
    let output = {
      product: new Product(
        item.id,
        item.description,
        new PhysicalAttributes(item.height, item.width, item.depth, item.weight),
        item.price
      ),
      quantity: product.quantity,
    };

    await this.connection.close();
    return output;
  }
  isValidProduct(productId: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async remove(productId: number, quantity: number): Promise<boolean> {
    await this.connection.connect();
    const [item] = await this.connection.query(`select * from stock where productID = ${productId};`);
    if (!item || item.quantity < quantity) {
      await this.connection.close();
      return false;
    }
    await this.connection.query(
      `update stock set quantity = ${item.quantity - quantity} where productID = ${productId};`
    );
    await this.connection.close();
    return true;
  }

  async updateQuantityBy(productId: number, amount: number): Promise<boolean> {
    await this.connection.connect();
    const [productInStock] = await this.connection.query(`select quantity from stock where productID = ${productId}`);
    if (productInStock) {
      const quantityToAdd: number = productInStock.quantity + amount;
      await this.connection.query(`UPDATE stock SET quantity = '${quantityToAdd}' WHERE productID = ${productId}`);
    }
    await this.connection.close();
    return false;
  }

  async list(): Promise<ProductAndQuantity[]> {
    await this.connection.connect();
    const products = await this.connection.query("select * from stock");
    let list: ProductAndQuantity[] = [];
    products.forEach(async (product: any): Promise<void> => {
      const [item] = await this.connection.query(`select * from product where id = ${product.productID};`);
      list.push({
        product: new Product(
          item.id,
          item.description,
          new PhysicalAttributes(item.height, item.width, item.depth, item.weight),
          item.price
        ),
        quantity: product.quantity,
      });
    });

    await this.connection.close();
    return list;
  }

  async nextId(): Promise<number> {
    await this.connection.connect();
    const [nextId] = await this.connection.query(`select count(*) as num_items from product`);
    await this.connection.close();
    return nextId.num_items + 1;
  }

  async clear(): Promise<void> {
    await this.connection.connect();
    await this.connection.query(`delete from stock`);
    await this.connection.query(`delete from product`);
    await this.connection.close();
  }
}
