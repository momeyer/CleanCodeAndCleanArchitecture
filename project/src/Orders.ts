import { Order, OrderStatus } from "./Order";

export type OrderId = {
    value: number
}

export interface PlacedOrders {
    add(order: Order): boolean;
    updateStatus(orderId: OrderId, status: OrderStatus): boolean;
    getAllPlacedOrder(): Map<OrderId, Order>;
}

export class NonPersistentPlacedOrder implements PlacedOrders {

    placeOrders: Map<OrderId, Order>;
    Id: OrderId;

    constructor() {
        this.placeOrders = new Map<OrderId, Order>();
        this.Id = { value: 0 };
    }

    add(order: Order): boolean {
        this.placeOrders.set(this.Id, order);
        this.Id.value++;
        return true;
    };

    updateStatus(orderId: OrderId, status: OrderStatus): boolean {
        let order = this.placeOrders.get(orderId);
        if (order) {
            order.status = status;
            return true;
        }
        return false;
    }
    getAllPlacedOrder(): Map<OrderId, Order> {
        return this.placeOrders;
    }
}