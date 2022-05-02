import Cpf from "./Cpf";
import { OrderId } from "./Orders";
import PriceCalculator from "./PriceCalculator";
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
    readonly items: OrderItem[];

    status: OrderStatus;
    private priceCalculator: PriceCalculator;

    constructor(cpf: string, orderId: OrderId, orderItems: OrderItem[], disocunt?: number) {
        this.id = orderId;
        this.cpf = new Cpf(cpf);
        this.discount = disocunt;
        this.items = orderItems;

        this.status = OrderStatus.PENDING;
        this.priceCalculator = new PriceCalculator();
    }

    calculateTotalPrice(): number {
        return this.priceCalculator.calculate(this);
    }


}