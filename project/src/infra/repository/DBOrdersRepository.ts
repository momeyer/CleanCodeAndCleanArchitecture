import { Order, OrderStatus } from "../../domain/entity/Order";
import { OrdersRepository } from "../../domain/repository/OrdersRepository";
import Connection from "../database/Connection";

export default class DBOrdersRepository implements OrdersRepository {
  constructor(readonly connection: Connection) {}

  async add(order: Order): Promise<boolean> {
    await this.connection.connect();
    await this.connection.query(
      `INSERT INTO orders(id,cpf,total,status,time,items) VALUES('${order.id}','${
        order.cpf.value
      }',${order.calculateTotalPrice()},'${order.status}','${new Date(order.time)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}', '${JSON.stringify(order.items)}')`
    );

    return true;
  }
  async get(orderId: string): Promise<Order | undefined> {
    await this.connection.connect();
    const [output] = await this.connection.query(`select * from orders where id = "${orderId}"`);
    if (!output) {
      return undefined;
    }
    return new Order(output.cpf, output.id, output.discount, output.time);
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<boolean> {
    await this.connection.connect();
    const [order] = await this.connection.query(`select * from orders where id = "${orderId}"`);
    if (!order || order.status == status) {
      return false;
    }
    order.status = status;
    await this.connection.query(`UPDATE orders SET status = '${status}' WHERE id = "${orderId}"`);
    return true;
  }
  async getAll(): Promise<Map<string, Order>> {
    throw new Error("Method not implemented.");
  }
  async clear(): Promise<void> {
    await this.connection.query(`delete from orders`);
  }
}
