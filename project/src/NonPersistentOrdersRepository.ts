import { Order, OrderStatus } from "./domain/entity/Order";
import { OrdersRepository } from "./domain/OrdersRepository";

export class NonPersistentOrdersRepository implements OrdersRepository {

    placeOrders: Map<string, Order>;

    constructor() {
        this.placeOrders = new Map<string, Order>();
    }

    async add(order: Order): Promise<boolean> {
        this.placeOrders.set(order.id, order);
        return true;
    };

    async updateStatus(orderId: string, status: OrderStatus): Promise<boolean> {
        const order = this.placeOrders.get(orderId);
        if (!order) {
            return false;
        }
        order.status = status;
        this.placeOrders.set(orderId, order);
        return true;
    }

    async getOrder(orderId: string): Promise<Order | undefined> {
        return this.placeOrders.get(orderId);
    }

    async getAllPlacedOrder(): Promise<Map<string, Order>> {
        return this.placeOrders;
    }
}
