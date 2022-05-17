import { Order, OrderStatus } from "./entity/Order";

export interface OrdersRepository {
    add(order: Order): Promise<boolean>;
    updateStatus(orderId: string, status: OrderStatus): Promise<boolean>;
    getAllPlacedOrder(): Promise<Map<string, Order>>; //TODO maybe rename to getAll
}
