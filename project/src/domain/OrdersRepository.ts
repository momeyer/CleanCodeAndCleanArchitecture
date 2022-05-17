import { Order, OrderStatus } from "./entity/Order";

export interface OrdersRepository {
    add(order: Order): Promise<boolean>;
    updateStatus(orderId: string, status: OrderStatus): Promise<boolean>; // all Promise
    getAllPlacedOrder(): Promise<Map<string, Order>>;
}
