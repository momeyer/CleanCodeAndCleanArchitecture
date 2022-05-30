import { Order, OrderStatus } from "../entity/Order";

export interface OrdersRepository {
    add(order: Order): Promise<boolean>;
    get(orderId: string): Promise<Order | undefined>;
    updateStatus(orderId: string, status: OrderStatus): Promise<boolean>;
    getAll(): Promise<Map<string, Order>>;
}
