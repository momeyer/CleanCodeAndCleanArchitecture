import { Order, OrderStatus } from "./domain/entity/Order";
import { OrderId } from "./domain/entity/OrderIdGenerator";
import { OrdersRepository } from "./domain/OrdersRepository";

export class NonPersistentOrdersRepository implements OrdersRepository {

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
}
