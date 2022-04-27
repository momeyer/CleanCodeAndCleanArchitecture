import { Order, OrderStatus } from "./Order";

export default interface PlacedOrders {
    add(order: Order): boolean;
    updateStatus(orderID: number, status: OrderStatus): boolean;
}