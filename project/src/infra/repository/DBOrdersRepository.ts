import { Order, OrderStatus } from "../../domain/entity/Order";
import { OrdersRepository } from "../../domain/repository/OrdersRepository";
import Connection from "../database/Connection";

export default class DBOrdersRepository implements OrdersRepository {
  constructor(readonly connection: Connection) {}

  async add(order: Order): Promise<boolean> {
    await this.connection.query(
      `INSERT INTO orders(id,cpf,total,status,time) VALUES(${order.id},'${
        order.cpf.value
      }',${order.calculateTotalPrice()},'${order.status}','${order.time.toISOString().slice(0, 19).replace("T", " ")}')`
    );
    order.items.forEach(async (item): Promise<void> => {
      await this.connection.query(
        `INSERT INTO order_items(orderID, productID, quantity) VALUES(${order.id},${item.productId},${item.quantity})`
      );
    });
    return true;
  }
  async get(orderId: string): Promise<Order | undefined> {
    throw new Error("Method not implemented.");
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Map<string, Order>> {
    throw new Error("Method not implemented.");
  }
  async clear(): Promise<void> {
    await this.connection.query(`delete from orders`);
    await this.connection.query(`delete from order_items`);
  }
}
