import Cpf from "./Cpf";
import { OrderId } from "./Orders";
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
    readonly id: OrderId;
    readonly cpf: Cpf;
    status: OrderStatus;
    private orderItems: OrderItem[];

    constructor(cpf: string, orderId: OrderId, orderItems: OrderItem[], discountCode?: string) {
        this.id = orderId;
        this.orderItems = orderItems;
        this.status = OrderStatus.PENDING;
        this.cpf = new Cpf(cpf);
    }

    calculateTotalPrice(): number {
        let total = 0;
        this.orderItems.forEach((cur): void => {
            total += cur.quantity * cur.product.price;
        })
        return total;
    }
}