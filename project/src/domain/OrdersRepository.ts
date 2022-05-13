import { Order, OrderStatus } from "./Order";
import { OrderId } from "./OrderIdGenerator";

export interface OrdersRepository {

    add(order: Order): boolean;
    updateStatus(orderId: OrderId, status: OrderStatus): boolean; // all Promise
    getAllPlacedOrder(): Map<OrderId, Order>;
}
