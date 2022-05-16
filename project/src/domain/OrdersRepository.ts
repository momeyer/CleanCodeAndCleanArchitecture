import { Order, OrderStatus } from "./entity/Order";
import { OrderId } from "./entity/OrderIdGenerator";

export interface OrdersRepository {

    add(order: Order): boolean;
    updateStatus(orderId: OrderId, status: OrderStatus): boolean; // all Promise
    getAllPlacedOrder(): Map<OrderId, Order>;
}
