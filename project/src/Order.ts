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
    readonly discount: number | undefined;
    status: OrderStatus;
    private orderItems: OrderItem[];

    constructor(cpf: string, orderId: OrderId, orderItems: OrderItem[], disocunt?: number | undefined) {
        this.id = orderId;
        this.status = OrderStatus.PENDING;
        this.cpf = new Cpf(cpf);
        this.discount = disocunt;
        this.orderItems = orderItems;
    }

    calculateTotalPrice(): number {
        let total = 0;
        this.orderItems.forEach((cur): void => {
            total += cur.quantity * cur.product.price;
        })

        return this.applyDiscount(total);
    }

    private applyDiscount(price: number): number {
        return this.discount ? price * (1.0 - this.discount) : price;
    }
}