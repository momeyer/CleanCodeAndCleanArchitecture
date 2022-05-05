import { Order, OrderStatus } from "./Order";

export type OrderId = {
    value: string
}

export interface PlacedOrders {
    add(order: Order): boolean;
    updateStatus(orderId: OrderId, status: OrderStatus): boolean;
    getAllPlacedOrder(): Map<OrderId, Order>;
    generateNextOrderId(): OrderId;
}

export class NonPersistentPlacedOrder implements PlacedOrders {

    placeOrders: Map<OrderId, Order>;

    constructor() {
        this.placeOrders = new Map<OrderId, Order>();
    }

    add(order: Order): boolean {
        this.placeOrders.set(order.id, order);
        return true;
    };

    updateStatus(orderId: OrderId, status: OrderStatus): boolean {
        let order = this.placeOrders.get(orderId);
        if (!order) {
            return false;
        }
        order.status = status;
        this.placeOrders.set(orderId, order);
        return true;
    }

    getOrder(orderId: OrderId): Order | undefined {
        return this.placeOrders.get(orderId);
    }

    getAllPlacedOrder(): Map<OrderId, Order> {
        return this.placeOrders;
    }

    generateNextOrderId(): OrderId {
        const year = new Date().getFullYear();
        const minDigits = 8;
        let sequencial = (this.placeOrders.size + 1).toString().padStart(minDigits, "0");
        let id = year.toString() + sequencial;
        return { value: id };
    }
}