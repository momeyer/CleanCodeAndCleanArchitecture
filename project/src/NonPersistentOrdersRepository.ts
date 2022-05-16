import { Order, OrderStatus } from "./domain/entity/Order";
import { OrderId } from "./domain/entity/OrderIdGenerator";
import { OrdersRepository } from "./domain/OrdersRepository";

export class NonPersistentOrdersRepository implements OrdersRepository {

    placeOrders: Map<OrderId, Order>;

    constructor() {
        this.placeOrders = new Map<OrderId, Order>();
    }

    async add(order: Order): Promise<boolean> {
        this.placeOrders.set(order.id, order);
        return true;
    };

    async updateStatus(orderId: OrderId, status: OrderStatus): Promise<boolean> {
        let order = this.placeOrders.get(orderId);
        if (!order) {
            return false;
        }
        order.status = status;
        this.placeOrders.set(orderId, order);
        return true;
    }

    async getOrder(orderId: OrderId): Promise<Order | undefined> {
        return this.placeOrders.get(orderId);
    }

    async getAllPlacedOrder(): Promise<Map<OrderId, Order>> {
        return this.placeOrders;
    }
}
