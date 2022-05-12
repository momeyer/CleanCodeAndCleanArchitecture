import { Order, OrderStatus } from "./domain/Order";

export type OrderId = {
    value: string
}


export interface OrdersRepository {
    add(order: Order): boolean;
    updateStatus(orderId: OrderId, status: OrderStatus): boolean; // all Promise
    getAllPlacedOrder(): Map<OrderId, Order>;
    generateNextOrderId(): OrderId;
}
