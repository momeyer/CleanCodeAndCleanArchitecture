import { OrderStatus } from "./Order";
import PlacedOrders from "./Orders";

export default class ECommerce {
    placedOrders: PlacedOrders;

    constructor(placedOrders: PlacedOrders) {
        this.placedOrders = placedOrders;
    }

    cancelPlacedOrder(orderID: number): boolean {

        return this.placedOrders.updateStatus(orderID, OrderStatus.CANCELLED);
    };
}