import { Product } from "./Product";

export type OrderItem = {
    product: Product;
    quantity: number;
}

export enum OrderStatus {
    PENDING,
    CANCELLED,
    CONFIRMED
}

export class Order {

    status: OrderStatus;
    private orderItems: OrderItem[];

    constructor(orderItems: OrderItem[], discountCode?: string) {
        this.orderItems = orderItems;
        this.status = OrderStatus.PENDING;
    }

    calculateTotalPrice(): number {
        let total = 0;
        this.orderItems.forEach((cur): void => {
            total += cur.quantity * cur.product.price;
        })
        return total;
    }
}