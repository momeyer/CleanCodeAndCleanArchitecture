import { Order, OrderStatus } from "./entity/Order";
import { OrderId } from "./entity/OrderIdGenerator";

export interface OrdersRepository {
    add(order: Order): Promise<boolean>;
    updateStatus(orderId: OrderId, status: OrderStatus): Promise<boolean>; // all Promise
    getAllPlacedOrder(): Promise<Map<OrderId, Order>>;
}
